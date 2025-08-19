import Pro1 from "../images/pro1.webp";
import Pro2 from "../images/pro2.webp";
import Pro3 from "../images/pro3.webp";
import { FaStar, FaRegStar } from "react-icons/fa";

const reviews = [
  {
    name: "Sanya Rajput",
    img: Pro1,
    stars: 5,
    feedback:
      "CodeMultiVerse helped me crack frontend interviews! The open-source vibe and real-world projects are top-tier.",
  },
  {
    name: "Aarav Mehta",
    img: Pro2,
    stars: 4,
    feedback:
      "Loved the community and mentorship! I started as a beginner and now I contribute to MERN stack projects confidently.",
  },
  {
    name: "Krishna Verma",
    img: Pro3,
    stars: 5,
    feedback:
      "The CodeMultiVerse platform boosted my confidence with hands-on experience, amazing UI, and problem-solving sessions.",
  },
];

const Reviews = () => {
  return (
    <section
      id="review"
      className="relative py-24 px-6 md:px-16 bg-gradient-to-b from-white to-indigo-50 overflow-hidden"
    >
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-900">
          Voices of the Multiverse
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mt-4 italic">
          “Real Developers. Real Impact. Powered by{" "}
          <span className="text-indigo-600 font-semibold">CodeMultiVerse</span>.”
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className="group relative bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-indigo-400"
          >
            {/* Avatar glow */}
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
              <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-indigo-400 via-blue-400 to-cyan-300 group-hover:rotate-180 transition-transform duration-700 ease-in-out">
                <div className="rounded-full overflow-hidden border-4 border-white shadow-lg w-full h-full">
                  <img
                    src={r.img}
                    alt={r.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Quote box */}
            <div className="mt-12 relative bg-white border-l-4 border-indigo-500 p-6 rounded-xl shadow-inner">
              <p className="text-gray-700 italic text-sm md:text-base leading-relaxed">
                “{r.feedback}”
              </p>
              <div className="flex mt-4 gap-1 text-yellow-500 group-hover:animate-shimmerStars">
                {[...Array(5)].map((_, i) =>
                  i < r.stars ? <FaStar key={i} /> : <FaRegStar key={i} />
                )}
              </div>
            </div>

            {/* Name & role */}
            <div className="mt-6 text-center">
              <h4 className="text-indigo-900 font-semibold text-lg">
                {r.name}
              </h4>
              <p className="text-indigo-600 text-sm">CodeMultiVerse Learner</p>
            </div>
          </div>
        ))}
      </div>

      {/* Creative star shimmer animation */}
      <style>{`
        @keyframes shimmerStars {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        .animate-shimmerStars {
          animation: shimmerStars 1.2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Reviews;
