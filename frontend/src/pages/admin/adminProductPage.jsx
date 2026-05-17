import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function AdminProductPage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + "/api/products")
            .then((response) => {
                setProducts(response.data);
            });
    }, []);

    console.log(products);

    return (
        <div className="w-full min-h-full p-6">

            {/* Top Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

                {/* Title */}
                <div>
                    <h1 className="text-4xl font-black text-secondary">
                        Products
                    </h1>

                    <p className="text-secondary/70 mt-1">
                        Manage all products in your Gift Wave store
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">

                    {/* Search */}
                    <div className="relative">
                        <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-secondary/60 text-lg" />

                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-[260px] h-[45px] pl-11 pr-4 rounded-xl bg-white/70 border border-white/40 outline-none focus:border-accent focus:bg-white transition-all duration-300 text-secondary placeholder:text-secondary/50 shadow-md"
                        />
                    </div>

                    {/* Add Product */}
                    <Link to="/admin/add-product" className="h-[45px] px-5 rounded-xl bg-accent text-white font-semibold flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-pink-500/40">
                        <IoAdd className="text-xl" />
                        Add Product
                    </Link>

                </div>
            </div>

            {/* Table Container */}
            <div className="w-full bg-white/30 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-xl overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        {/* Table Head */}
                        <thead className="bg-accent text-white">

                            <tr className="h-[65px] text-left">

                                <th className="px-6 font-semibold">Image</th>
                                <th className="px-6 font-semibold">Product ID</th>
                                <th className="px-6 font-semibold">Product Name</th>
                                <th className="px-6 font-semibold">Price</th>
                                <th className="px-6 font-semibold">Labelled Price</th>
                                <th className="px-6 font-semibold">Category</th>
                                <th className="px-6 font-semibold text-center">Action</th>

                            </tr>

                        </thead>

                        {/* Table Body */}
                        <tbody>

                            {
                                products.map((item, index) => {
                                    return (

                                        <tr
                                            key={item.productID}
                                            className="border-b border-white/20 hover:bg-white/40 transition-all duration-300"
                                        >

                                            {/* Image */}
                                            <td className="px-6 py-4">
                                                <img
                                                    src={item.images[0]}
                                                    alt={item.name}
                                                    className="w-16 h-16 rounded-2xl object-cover shadow-md border border-white/30"
                                                />
                                            </td>

                                            {/* Product ID */}
                                            <td className="px-6 py-4 font-medium text-secondary">
                                                {item.productID}
                                            </td>

                                            {/* Name */}
                                            <td className="px-6 py-4 font-semibold text-secondary">
                                                {item.name}
                                            </td>

                                            {/* Price */}
                                            <td className="px-6 py-4 text-secondary font-medium">
                                                Rs. {item.price}
                                            </td>

                                            {/* Labelled Price */}
                                            <td className="px-6 py-4">
                                                <span className="line-through text-secondary/60">
                                                    Rs. {item.labelledPrice}
                                                </span>
                                            </td>

                                            {/* Category */}
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold">
                                                    {item.category}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">

                                                <div className="flex justify-center items-center gap-3">

                                                    {/* Delete */}
                                                    <button className="w-10 h-10 rounded-xl bg-red-100 text-red-500 flex justify-center items-center hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm">
                                                        <FaRegTrashCan />
                                                    </button>

                                                    {/* Edit */}
                                                    <button className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex justify-center items-center hover:bg-accent hover:text-white transition-all duration-300 shadow-sm">
                                                        <FaRegEdit />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    );
                                })
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}