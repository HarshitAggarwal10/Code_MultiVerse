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
        id="about-home"
        className="w-full h-[85vh] bg-cover bg-center flex flex-col justify-center items-center text-center px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(25, 0, 60, 0.6), rgba(0, 0, 70, 0.7)), url(${back1})`,
        }}
      >
        <h2 className="text-white text-4xl md:text-6xl font-bold drop-shadow-md">Courses</h2>
        <p className="text-gray-200 mt-4 max-w-2xl mx-auto text-lg md:text-xl">
          Dive into the multiverse of knowledge. Whether you're a beginner or a pro, there's a course waiting for you!
        </p>
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
