import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "../data/blogData";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaEnvelope, FaArrowLeft } from "react-icons/fa";

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = blogPosts.find((item) => item.id === id);
    const suggestedPosts = blogPosts.filter((item) => item.id !== id).slice(0, 2);

    const calculateReadTime = (text) => {
        const wordsPerMinute = 200;
        const words = text.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    if (!post) {
        return <div className="p-10 text-center text-red-600 text-xl">Post not found</div>;
    }

    const readTime = calculateReadTime(post.content);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto px-6 py-20 font-serif bg-gradient-to-br from-white to-indigo-50 rounded-xl shadow-xl"
        >
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2 text-indigo-700 font-medium hover:underline hover:text-indigo-900"
            >
                <FaArrowLeft /> Back to Blogs
            </button>

            <h1 className="text-5xl font-extrabold text-indigo-950 mb-6 leading-tight tracking-tight text-center">
                {post.title}
            </h1>

            <div className="flex flex-wrap gap-4 items-center justify-center mb-8">
                <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-4 py-1 rounded-full shadow">
                    ✍️ {post.author}
                </span>
                <span className="bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-1 rounded-full shadow">
                    📅 {post.date}
                </span>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-full shadow">
                    ⏱️ {readTime} min read
                </span>
            </div>

            <motion.img
                src={post.image}
                alt={post.title}
                className="rounded-xl mb-10 w-full max-h-[400px] object-cover shadow-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
            />

            <article className="prose prose-lg md:prose-xl prose-indigo max-w-none text-gray-800 leading-relaxed">
                {post.content.split("\n").map((para, i) => (
                    <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        {para}
                    </motion.p>
                ))}

                <div className="mt-14 border-t pt-8 text-center">
                    <h4 className="text-2xl font-semibold text-indigo-900 mb-4">Share this article</h4>
                    <div className="flex justify-center gap-6">
                        <motion.a
                            href={`https://twitter.com/share?text=${post.title}&url=https://yoursite.com/blog/${post.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold px-4 py-2 rounded-full transition-transform transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaTwitter /> Twitter
                        </motion.a>
                        <motion.a
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=https://yoursite.com/blog/${post.id}&title=${post.title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-full transition-transform transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaLinkedin /> LinkedIn
                        </motion.a>
                        <motion.a
                            href={`mailto:?subject=${post.title}&body=Check out this blog: https://yoursite.com/blog/${post.id}`}
                            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-full transition-transform transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaEnvelope /> Email
                        </motion.a>
                    </div>
                </div>
            </article>

            <div className="mt-24">
                <h3 className="text-3xl font-bold text-indigo-950 mb-8 text-center">You might also like</h3>
                <div className="grid gap-8 md:grid-cols-2">
                    {suggestedPosts.map((suggested) => (
                        <motion.div
                            key={suggested.id}
                            className="border rounded-xl p-6 hover:shadow-xl transition duration-300 bg-white shadow-md"
                            whileHover={{ scale: 1.02 }}
                        >
                            <img
                                src={suggested.image}
                                alt={suggested.title}
                                className="rounded-lg mb-4 h-52 w-full object-cover shadow"
                            />
                            <h4 className="text-xl font-semibold text-indigo-900 mb-1">
                                {suggested.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">By {suggested.author} · {suggested.date}</p>
                            <p className="text-gray-700 text-base mb-2">
                                {suggested.desc.slice(0, 110)}...
                            </p>
                            <a
                                href={`/blog/${suggested.id}`}
                                className="text-indigo-700 font-medium hover:underline text-sm"
                            >
                                Read More →
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default BlogPost;
