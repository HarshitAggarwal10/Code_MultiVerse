import { FaGraduationCap, FaCertificate, FaAward } from "react-icons/fa";

const features = [
  {
    icon: <FaGraduationCap className="text-4xl text-indigo-600 group-hover:scale-110 transition-transform duration-300" />,
    title: "Progress Tracking",
    desc: "Stay sharp. Code smarter. Track every module, badge, and quiz win in real time — like XP in your dev game.",
  },
  {
    icon: <FaCertificate className="text-4xl text-indigo-600 group-hover:scale-110 transition-transform duration-300" />,
    title: "Earn Certificates",
    desc: "Show the world you're a multiverse explorer — earn shareable, verifiable certificates with each milestone.",
  },
  {
    icon: <FaAward className="text-4xl text-indigo-600 group-hover:scale-110 transition-transform duration-300" />,
    title: "Achievement Badges",
    desc: "Collect epic badges as you code through challenges. Flex your skills like digital trophies across your profile.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 md:px-12 bg-gradient-to-b from-white to-indigo-50 text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-900">Why Devs Love CodeMultiVerse</h2>
      <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-3xl mx-auto italic">
        “Code. Conquer. Collect. Learn the smart way with features built for modern developers.”
      </p>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="group relative bg-white bg-opacity-40 backdrop-blur-lg border border-indigo-100 shadow-xl p-8 rounded-3xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-indigo-100 mb-6">
              {f.icon}
            </div>
            <h3 className="text-2xl font-bold text-indigo-900">{f.title}</h3>
            <p className="text-gray-700 mt-3 text-sm leading-relaxed">{f.desc}</p>

            {/* Decorative Pulse Glow */}
            <div className="absolute -top-4 -right-4 w-5 h-5 bg-indigo-400 opacity-10 blur-2xl rounded-full animate-ping"></div>
            <div className="absolute -bottom-4 -left-4 w-5 h-5 bg-indigo-400 opacity-10 blur-2xl rounded-full animate-ping"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
