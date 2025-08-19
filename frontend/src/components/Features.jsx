import { FaGraduationCap, FaCertificate, FaAward } from "react-icons/fa";

const features = [
  {
    icon: <FaGraduationCap className="text-4xl text-indigo-500 group-hover:text-blue-500 transition-all duration-500" />,
    title: "Progress Tracking",
    desc: "Stay sharp. Code smarter. Track every module, badge, and quiz win in real time — like XP in your dev game.",
  },
  {
    icon: <FaCertificate className="text-4xl text-indigo-500 group-hover:text-blue-500 transition-all duration-500" />,
    title: "Earn Certificates",
    desc: "Show the world you're a multiverse explorer — earn shareable, verifiable certificates with each milestone.",
  },
  {
    icon: <FaAward className="text-4xl text-indigo-500 group-hover:text-blue-500 transition-all duration-500" />,
    title: "Achievement Badges",
    desc: "Collect epic badges as you code through challenges. Flex your skills like digital trophies across your profile.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-gradient-to-b from-white to-indigo-50 text-center"
    >
      {/* Animated background orbs */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-indigo-200 opacity-20 blur-3xl rounded-full animate-[floatOrb_10s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-20 right-10 w-56 h-56 bg-blue-300 opacity-20 blur-3xl rounded-full animate-[floatOrb_12s_ease-in-out_infinite]"></div>

      <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-900">
        Why Devs Love CodeMultiVerse
      </h2>
      <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-3xl mx-auto italic">
        “Code. Conquer. Collect. Learn the smart way with features built for
        modern developers.”
      </p>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="group relative bg-white/70 backdrop-blur-xl border border-indigo-100 shadow-lg p-8 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-[floatCard_6s_ease-in-out_infinite]"
            style={{ animationDelay: `${idx * 1.5}s` }}
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-indigo-100 to-blue-50 shadow-inner mb-6">
              {f.icon}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-indigo-900">{f.title}</h3>

            {/* Description */}
            <p className="text-gray-700 mt-3 text-sm leading-relaxed">
              {f.desc}
            </p>

            {/* Multiverse glow effect */}
            <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500"></div>
          </div>
        ))}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
};

export default Features;
