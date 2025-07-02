import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import c1 from "../images/c1.jpg";
import c2 from "../images/c2.jpg";
import c3 from "../images/c3.jpg";
import c4 from "../images/c4.jpg";
import c5 from "../images/c5.jpg";
import logo from "../img/newLogoBG.png";
import { FaArrowRight } from "react-icons/fa";

const sliderImages = [c1, c2, c3, c4, c5];
const bgColors = [
  ["#4B5563", "#9CA3AF"],       // gray
  ["#60A5FA", "#1D4ED8"],       // blue
  ["#FDE68A", "#FBBF24"],       // yellow
  ["#A1A1AA", "#4B5563"],       // zinc/gray
  ["#4B5563", "#1F2937"],       // dark tones
];

const PopularCourses = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const gradientStyle = {
    backgroundImage: `linear-gradient(to bottom right, ${bgColors[index][0]}, ${bgColors[index][1]})`,
  };

  return (
    <section className="relative py-24 px-4 lg:px-16 overflow-hidden">
      {/* Section Heading */}
      <div className="text-center mb-20">
        <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          Unlock Your Superpowers
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
          Our curated popular tracks are crafted to turn you into a tech wizard.
        </p>
      </div>

      <div
        className="relative rounded-3xl overflow-hidden flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto shadow-2xl animate-fade-in-up"
        style={gradientStyle}
      >
        {/* Background Animation Layer */}
        <div className="absolute inset-0 -z-10 transition-all duration-1000 blur-3xl opacity-40" style={gradientStyle} />

        {/* Text Area */}
        <div className="z-10 w-full lg:w-1/2 px-8 py-12 lg:px-12 text-left text-white">
          <div className="flex items-center justify-between mb-6">
            <img
              src={logo}
              alt="Logo"
              className="w-25 h-20 animate-spin-slow"
              style={{ animation: "spin 10s linear infinite" }}
            />
            {/* <h3 className="text-4xl font-extrabold">
              <span className="text-white">Code</span>
              <span className="bg-gradient-to-r from-blue-800 to-cyan-400 bg-clip-text text-transparent">MultiVerse</span>
            </h3> */}
          </div>

          <h4 className="text-2xl font-semibold text-white mb-4">Popular Courses</h4>

          <ul className="space-y-3 text-lg font-medium mb-8 list-disc list-inside">
            <li>JavaScript for Beginners</li>
            <li>HTML & CSS Mastery</li>
            <li>Python Programming Essentials</li>
            <li>Creative Web Design</li>
            <li>Full Stack Dev Crash Course</li>
          </ul>

          <Link
            to="/courses"
            className="inline-flex items-center bg-yellow-400 text-black font-semibold py-3 px-6 rounded-md hover:bg-white hover:text-yellow-500 transition duration-300"
          >
            Explore More Courses <FaArrowRight className="ml-2" />
          </Link>
        </div>

        {/* Image Carousel */}
        <div className="z-10 w-full lg:w-1/2 flex items-center justify-center relative h-[400px] lg:h-[480px]">
          {sliderImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Course ${i + 1}`}
              className={`absolute w-[520px] h-[380px] object-cover rounded-xl transition-all duration-[1200ms] shadow-2xl ${
                i === index
                  ? "opacity-100 scale-100 z-20 animate-[floatY_5s_ease-in-out_infinite]"
                  : i === (index + 1) % sliderImages.length
                    ? "opacity-50 scale-90 z-10 blur-sm"
                    : "opacity-0 scale-75 z-0 blur-md"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
