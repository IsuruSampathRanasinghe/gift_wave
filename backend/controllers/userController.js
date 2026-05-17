import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* -------------------------
   CREATE USER (REGISTER)
--------------------------*/
export function createUser(req, res) {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        const user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword
        });

        user.save()
            .then(() => {
                return res.status(201).json({
                    message: "User created successfully"
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    message: "Failed to create user",
                    error: err.message
                });
            });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

/* -------------------------
   LOGIN USER
--------------------------*/
export function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // 1. Check input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // 2. Find user
        User.findOne({ email })
            .then((user) => {

                // 3. User not found
                if (!user) {
                    return res.status(404).json({
                        message: "User not found"
                    });
                }

                // 4. Check password exists in DB
                if (!user.password) {
                    return res.status(500).json({
                        message: "User password missing in database"
                    });
                }

                // 5. Compare password
                const isPasswordMatching = bcrypt.compareSync(password, user.password);

                if (!isPasswordMatching) {
                    return res.status(401).json({
                        message: "Invalid password"
                    });
                }

                // 6. Generate token
                const token = jwt.sign(
                    {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        isEmailVerified: user.isEmailVerified
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "7d" }
                );

                // 7. Success response
                return res.status(200).json({
                    message: "Login successful",
                    token: token,
                    user: {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        isEmailVerified: user.isEmailVerified,
                    }
                });

            })
            .catch((err) => {
                return res.status(500).json({
                    message: "Server error",
                    error: err.message
                });
            });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

/* -------------------------
   ADMIN CHECK
--------------------------*/
export function isAdmin(req) {
    if (!req.user) return false;
    return req.user.role === "admin";
}