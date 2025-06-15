import { useState } from "react";
import Mine from "../images/mine.png";
import Jiyansh from "../images/jiyansh.jpg";
import Apurav from "../images/photo_id (grey).png";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

const experts = [
  {
    name: "Harshit Aggarwal",
    role: "MERN Stack Developer",
    img: Mine,
    bio: "Harshit is a passionate developer and the founder of CodeMultiVerse. He specializes in building scalable MERN applications.",
    skills: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    links: {
      instagram: "https://www.instagram.com/iamharshitaggarwal/",
      linkedin: "https://www.linkedin.com/in/harshit-aggarwal-85309a296/",
    },
  },
  {
    name: "Apurav Gautam",
    role: "MERN Stack Developer",
    img: Apurav,
    bio: "Apurav is a backend enthusiast who loves optimizing APIs and building secure, efficient systems.",
    skills: ["Node.js", "Express", "MongoDB", "JWT", "REST APIs"],
    links: {
      instagram: "https://www.instagram.com/apurav_990/",
      linkedin: "https://www.linkedin.com/in/apurav-gautam-b19b9428b/",
    },
  },
  {
    name: "Jiyansh Kalra",
    role: "MERN Stack Developer",
    img: Jiyansh,
    bio: "Jiyansh is focused on UI/UX, and brings life to CodeMultiVerse with intuitive design and great interfaces.",
    skills: ["Figma", "CSS", "React", "UI/UX", "Tailwind"],
    links: {
      instagram: "https://www.instagram.com/apurav_990/",
      linkedin: "https://www.linkedin.com/in/jiyansh-kalra-9374ab290/",
    },
  },
];

const Experts = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);

  const closeModal = () => setSelectedExpert(null);

  return (
    <section
      id="experts"
      className="relative px-6 md:px-12 py-24 bg-gradient-to-br from-blue-50 to-indigo-100 text-center overflow-hidden mt-24"
    >
      {/* 3D Backgrounds */}
      <div className="absolute top-[-60px] left-[-60px] w-[300px] h-[300px] bg-indigo-300 opacity-30 rounded-full filter blur-3xl z-0 animate-pulse"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] bg-yellow-300 opacity-30 rounded-full filter blur-3xl z-0 animate-pulse"></div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 z-10 relative">
        Meet Our Core Team
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mt-3 mb-14 italic z-10 relative">
        “CodeMultiVerse isn't just a platform — it's a revolution built by passionate minds.”
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 relative z-10">
        {experts.map((expert, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedExpert(expert)}
            className="cursor-pointer backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl shadow-xl p-8 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <img
              src={expert.img}
              alt={expert.name}
              className="w-60 h-60 object-cover mx-auto rounded-full border-4 border-indigo-100 shadow-lg"
            />
            <h3 className="text-2xl font-bold text-indigo-900 mt-6">{expert.name}</h3>
            <p className="text-md text-indigo-700 font-medium">{expert.role}</p>

            <div className="flex justify-center gap-5 mt-6">
              <a
                href={expert.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-pink-600 hover:bg-pink-600 hover:text-white border border-pink-600 p-3 rounded-full transition duration-300 text-xl"
              >
                <FaInstagram />
              </a>
              <a
                href={expert.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-600 p-3 rounded-full transition duration-300 text-xl"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 md:p-10 shadow-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-red-500"
            >
              &times;
            </button>

            <img
              src={selectedExpert.img}
              alt={selectedExpert.name}
              className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-indigo-200 shadow-md"
            />
            <h2 className="text-3xl font-bold text-indigo-900 text-center">{selectedExpert.name}</h2>
            <p className="text-md text-indigo-700 text-center mb-2">{selectedExpert.role}</p>
            <p className="text-gray-700 text-center italic mb-4">{selectedExpert.bio}</p>

            <h4 className="text-lg font-semibold text-indigo-800">Skills</h4>
            <ul className="flex flex-wrap gap-2 justify-center mt-2">
              {selectedExpert.skills.map((skill, i) => (
                <li
                  key={i}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experts;
