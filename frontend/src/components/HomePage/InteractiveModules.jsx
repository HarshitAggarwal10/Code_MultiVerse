import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCode, FaTrophy, FaRobot, FaRocket, FaLightbulb } from "react-icons/fa";
import featureImg from "../../img/motivatestudent.webp"; // Ensure this path is correct


const InteractiveModules = () => {
  const [stats, setStats] = useState({ challenges: 0, quizzes: 0, projects: 0 });

  // Animate counters
  useEffect(() => {
    let c = 0, q = 0, p = 0;
    const interval = setInterval(() => {
      if (c < 250) c += 5;
      if (q < 120) q += 2;
      if (p < 45) p += 1;
      setStats({ challenges: c, quizzes: q, projects: p });
      if (c >= 250 && q >= 120 && p >= 45) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="quiz" className="py-20 bg-white relative overflow-hidden">
      {/* Floating icons */}
      <FaCode className="absolute top-10 left-20 text-blue-800 opacity-10 text-6xl animate-bounce-slow" />
      <FaTrophy className="absolute bottom-10 left-10 text-yellow-400 opacity-20 text-5xl animate-float" />
      <FaRobot className="absolute top-16 right-20 text-blue-600 opacity-10 text-6xl animate-float-delayed" />
      <FaRocket className="absolute bottom-16 right-10 text-gray-500 opacity-10 text-5xl animate-bounce-slow" />
      <FaLightbulb className="absolute top-1/2 left-1/2 text-yellow-300 opacity-10 text-5xl animate-float" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Interactive Modules
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
          Fuel Your Growth with Daily Coding Challenges, AI-based Quizzes & Hands-on Projects!
        </p>

        <div className="mt-16 flex flex-col lg:flex-row items-center justify-between gap-12 bg-[#f9f9ff] p-6 md:p-10 rounded-xl shadow-md">
          {/* Image Section */}
          <div className="w-full lg:w-5/12 flex justify-center">
            <div className="w-114 h-84 sm:w-112 sm:h-82 overflow-hidden rounded-xl hover:shadow-blue-400/40 transition duration-500 transform hover:-rotate-1 hover:scale-105">
              <img
                src={featureImg}
                alt="Interactive Learning"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-6/12 text-right pr-0 lg:pr-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Learn. Build. Dominate.
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              CodeMultiVerse equips you with practical coding skills through gamified learning.
              Whether you're a beginner or a pro, dive into coding battles, debug challenges,
              and AI-curated quizzes tailored just for you.
            </p>

            {/* Stats Row */}
            <div className="flex justify-end gap-6 mb-6 text-center">
              <div>
                <p className="text-3xl font-bold text-blue-800">{stats.challenges}+</p>
                <p className="text-sm text-gray-500">Challenges Solved</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-500">{stats.quizzes}+</p>
                <p className="text-sm text-gray-500">Quizzes Attempted</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-700">{stats.projects}+</p>
                <p className="text-sm text-gray-500">Projects Completed</p>
              </div>
            </div>

            {/* Call to action */}
            <Link
              to="/auth"
              className="inline-block bg-blue-900 text-white hover:bg-[#FDC93B] hover:text-blue-900 px-6 py-3 rounded-md font-semibold transition duration-300"
            >
              Get Started &gt;
            </Link>
            <p className="text-xs text-gray-500 mt-2">
              Your next challenge starts today 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveModules;
