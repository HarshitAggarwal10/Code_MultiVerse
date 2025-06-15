import React from "react";
import { Link } from "react-router-dom";
import back1 from "../images/back1.jpg";
import { blogPosts } from "../data/blogData";

const Blog = () => {
    const categories = [
        "Web Development",
        "Web Design",
        "Frontend Web",
        "JavaScript",
    ];

    return (
        <div className="bg-gray-50 font-sans">
            {/* Hero Section */}
            <section
                className="w-full h-[75vh] bg-cover bg-center flex flex-col justify-center items-center text-center pt-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(25, 0, 60, 0.6), rgba(0, 0, 70, 0.7)), url(${back1})`,
                }}
            >
                <h2 className="text-white text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-xl">
                    Explore CodeMultiverse
                </h2>
                <p className="text-indigo-200 mt-4 text-lg max-w-[700px] px-4">
                    Empower your coding journey with expert blogs on Web, React, ML & more.
                </p>
            </section>

            {/* Blog Content */}
            <section className="flex flex-col lg:flex-row justify-between items-start px-6 sm:px-10 py-16 gap-10">
                {/* Blog Posts */}
                <div className="w-full lg:w-[65%] space-y-12">
                    {blogPosts.map((post, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4"
                        >
                            <div className="w-[95%] mx-auto">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-[500px] object-cover rounded-xl mb-5"
                                />
                                <h3 className="text-2xl md:text-3xl font-bold text-indigo-950 mb-3">
                                    {post.title}
                                </h3>
                                <p className="text-gray-700 text-base md:text-lg font-serif leading-relaxed mb-4">
                                    {post.desc}
                                </p>
                                <Link
                                    to={`/blog/${post.id}`}
                                    className="inline-block text-sm font-semibold px-5 py-2 bg-indigo-900 text-white rounded-md hover:bg-indigo-800 transition"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar Categories */}
                <div className="w-full lg:w-[30%] bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-indigo-900">Categories</h2>
                    <div className="space-y-5">
                        {categories.map((cat, idx) => (
                            <div key={idx}>
                                <a
                                    href="#"
                                    className="block text-[#444] text-base font-medium hover:text-indigo-800 transition"
                                >
                                    {cat}
                                </a>
                                <hr className="mt-2 border-gray-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
