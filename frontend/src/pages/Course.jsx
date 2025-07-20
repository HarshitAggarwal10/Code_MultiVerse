// CoursePage.jsx
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import back1 from "../images/back1.jpg";
import { courses } from "../data/courseData";

const CourseCard = ({ image, title, rating, reviews, price, id }) => (
  <div className="relative flex flex-col h-full rounded-xl overflow-hidden transition duration-300 hover:scale-[1.02] group shadow-md bg-white">

    {/* Course Image with Price Overlay */}
    <div className="relative">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-xl" />
      <div className="absolute top-2 right-2 bg-white text-[#1e3a8a] text-xs font-bold px-4 py-1 rounded-full shadow-md tracking-wide">
        {price === "Free" ? "FREE" : price}
      </div>
    </div>

    {/* Course Info */}
    <div className="flex-1 flex flex-col justify-between p-5 text-gray-700">
      <div>
        <span className="text-xs text-gray-500 block mb-1">Updated 29/02/2024</span>
        <p className="text-lg font-bold mb-3 line-clamp-2 text-[#1e3a8a]">
          {title}
        </p>

        <div className="flex items-center text-yellow-500 mb-6">
          {Array.from({ length: rating }, (_, i) => (
            <FaStar key={i} className="mr-1 text-sm" />
          ))}
          <span className="text-sm text-gray-600 ml-2">({reviews})</span>
        </div>

        {/* View Details Button */}
        <Link
          to={`/courses/${id}`}
          className="flex items-center justify-center w-full mt-auto bg-[#1e3a8a] text-white text-sm font-semibold px-5 py-3 rounded-lg shadow-md hover:bg-[#172554] transition-all duration-300"
        >
          View Details
          <svg
            className="w-4 h-4 ml-2 transform transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  </div>
);

export default function CoursePage() {
  return (
    <>
      {/* Header Section */}
      <section
        id="courses"
        className="relative w-full h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden"
      >
        {/* Universe Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a011b] via-[#150736] to-[#050014] z-0" />

        {/* CSS Keyframes */}
        <style>{`
    @keyframes twinkle {
      0%, 100% { opacity: 0.2; transform: scale(0.9); }
      50% { opacity: 1; transform: scale(1.1); }
    }
    .star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: white;
      border-radius: 50%;
      animation: twinkle 4s ease-in-out infinite;
    }
    @keyframes float {
      0% { transform: translateY(0px); opacity: 0.6; }
      50% { transform: translateY(-15px); opacity: 1; }
      100% { transform: translateY(0px); opacity: 0.6; }
    }
  `}</style>

        {/* Stars */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Tech Emojis (Books, Code, Learning) */}
        {[
          { emoji: "📘", top: "20%", left: "10%", delay: "0s" },
          { emoji: "👨‍💻", top: "30%", left: "80%", delay: "1.5s" },
          { emoji: "📱", top: "60%", left: "20%", delay: "2s" },
          { emoji: "🧠", top: "75%", left: "70%", delay: "1.2s" },
          { emoji: "🧑‍🚀", top: "50%", left: "45%", delay: "2.5s" },
        ].map((item, i) => (
          <div
            key={i}
            className="absolute text-2xl md:text-3xl lg:text-4xl pointer-events-none select-none"
            style={{
              top: item.top,
              left: item.left,
              animation: "float 6s ease-in-out infinite",
              animationDelay: item.delay,
            }}
          >
            {item.emoji}
          </div>
        ))}

        {/* Glows */}
        <div className="absolute w-[500px] h-[500px] bg-indigo-500 opacity-20 rounded-full blur-[150px] top-1/3 left-1/4 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-purple-700 opacity-15 rounded-full blur-[140px] bottom-1/4 right-1/3 z-0" />

        {/* Content */}
        <div className="relative z-10 text-white">
          <h2 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">Courses</h2>
          <p className="text-indigo-200 mt-4 max-w-2xl mx-auto text-lg md:text-xl">
            Explore the multiverse of knowledge — whether you're just starting out or launching into advanced tech, there's a course made just for you. Start your journey now!
          </p>
        </div>
      </section>

      {/* Courses Grid Section */}
      <section className="relative min-h-screen pb-20 pt-10 bg-gray-100">
        <div className="text-center mb-10 px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-[#1e3a8a]">
            Browse Our Most Popular Courses
          </h3>
          <p className="text-gray-500 mt-2 text-md max-w-xl mx-auto">
            Learn from scratch or advance your skills with these handpicked tutorials!
          </p>
        </div>

        <div className="relative z-10 px-6 md:px-16 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course, index) => (
            <div key={index} className="flex flex-col h-full">
              <CourseCard key={index} {...course} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
