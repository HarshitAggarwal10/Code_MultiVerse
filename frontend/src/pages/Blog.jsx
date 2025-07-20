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
                className="relative w-full h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden"
            >
                {/* Universe Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#090019] via-[#120730] to-[#050011] z-0" />

                {/* Animation styles */}
                <style>{`
    @keyframes twinkle {
      0%, 100% { opacity: 0.2; transform: scale(0.8); }
      50% { opacity: 0.9; transform: scale(1); }
    }

    @keyframes float {
      0% { transform: translateY(0px); opacity: 0.5; }
      50% { transform: translateY(-15px); opacity: 1; }
      100% { transform: translateY(0px); opacity: 0.5; }
    }

    @keyframes shoot {
      0% { transform: translate(-200px, -200px) scale(0.8); opacity: 0; }
      30% { opacity: 1; }
      100% { transform: translate(600px, 600px) scale(1.2); opacity: 0; }
    }

    .star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: white;
      border-radius: 50%;
      animation: twinkle 3s ease-in-out infinite;
    }

    .shooting-star {
      position: absolute;
      width: 2px;
      height: 80px;
      background: linear-gradient(white, transparent);
      transform: rotate(45deg);
      animation: shoot 6s linear infinite;
    }
  `}</style>

                {/* Stars */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {[...Array(40)].map((_, i) => (
                        <div
                            key={i}
                            className="star"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 4}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Floating Emojis */}
                {[
                    { emoji: "🧠", top: "15%", left: "20%", delay: "0s" },
                    { emoji: "🧑‍💻", top: "70%", left: "15%", delay: "1.2s" },
                    { emoji: "⚛️", top: "25%", left: "80%", delay: "2s" },
                    { emoji: "📘", top: "60%", left: "65%", delay: "0.8s" },
                    { emoji: "🧪", top: "40%", left: "40%", delay: "1.7s" },
                ].map((icon, i) => (
                    <div
                        key={i}
                        className="absolute text-2xl md:text-3xl lg:text-4xl pointer-events-none select-none"
                        style={{
                            top: icon.top,
                            left: icon.left,
                            animation: "float 6s ease-in-out infinite",
                            animationDelay: icon.delay,
                        }}
                    >
                        {icon.emoji}
                    </div>
                ))}

                {/* Glow Effects */}
                <div className="absolute w-[500px] h-[500px] bg-indigo-500 opacity-20 rounded-full blur-[160px] top-1/4 left-1/4 z-0" />
                <div className="absolute w-[400px] h-[400px] bg-purple-700 opacity-15 rounded-full blur-[140px] bottom-1/3 right-1/4 z-0" />

                {/* Text Content */}
                <div className="relative z-10 max-w-3xl text-white">
                    <h2 className="text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-xl">
                        Explore CodeMultiVerse
                    </h2>
                    <p className="text-indigo-200 mt-4 text-lg md:text-xl px-2">
                        Empower your coding journey with expert blogs, galactic insights into Web Dev, React, AI, and more. Dive deep into the code cosmos!
                    </p>
                </div>
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
