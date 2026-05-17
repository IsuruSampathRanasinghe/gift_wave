import { Link, Route, Routes } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/adminAddNewProduct";

export default function AdminPage() {
    return (
        <div className="w-full h-screen bg-primary flex p-3 gap-3">

            {/* Sidebar */}
            <div className="w-[300px] h-full bg-white/20 backdrop-blur-2xl rounded-2xl border border-white/30 shadow-xl flex flex-col items-center py-6 gap-6">

                {/* Logo Section */}
                <div className="w-[90%] h-[110px] bg-accent rounded-2xl flex items-center gap-3 px-4 shadow-lg">
                    <img
                        src="/logo.png"
                        alt="Gift Wave"
                        className="h-[70px] w-auto drop-shadow-lg"
                    />
                    <div className="text-white">
                        <h1 className="text-lg font-bold">Admin Panel</h1>
                        <p className="text-xs text-white/80">Gift Wave</p>
                    </div>
                </div>

                {/* Links */}
                <nav className="w-full flex flex-col items-center gap-2 px-3">

                    <Link
                        to="/admin"
                        className="w-[90%] flex items-center gap-3 p-3 rounded-xl text-secondary hover:bg-accent hover:text-white transition-all duration-300"
                    >
                        <FaChartLine className="text-xl" />
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/orders"
                        className="w-[90%] flex items-center gap-3 p-3 rounded-xl text-secondary hover:bg-accent hover:text-white transition-all duration-300"
                    >
                        <IoCartOutline className="text-xl" />
                        Orders
                    </Link>

                    <Link
                        to="/admin/products"
                        className="w-[90%] flex items-center gap-3 p-3 rounded-xl text-secondary hover:bg-accent hover:text-white transition-all duration-300"
                    >
                        <FiGift className="text-xl" />
                        Products
                    </Link>

                    <Link
                        to="/admin/users"
                        className="w-[90%] flex items-center gap-3 p-3 rounded-xl text-secondary hover:bg-accent hover:text-white transition-all duration-300"
                    >
                        <HiOutlineUsers className="text-xl" />
                        Users
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 h-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-xl overflow-hidden">

                <div className="h-full w-full overflow-y-auto p-6">

                    <Routes path="/">
                        <Route
                            path="/"
                            element={
                                <div className="text-3xl font-bold text-secondary">
                                    Welcome to Admin Dashboard
                                </div>
                            }
                        />
                        <Route path="/products" element={<AdminProductPage />} />
                        <Route
                            path="/orders"
                            element={<h1 className="text-secondary text-2xl font-semibold">Orders</h1>}
                        />
                        <Route
                            path="/users"
                            element={<h1 className="text-secondary text-2xl font-semibold">Users</h1>}
                        />
                        <Route
                            path="/add-product"
                            element={<AddProductPage />}
                        />
                    </Routes>

                </div>
            </div>

        </div>
    );
}