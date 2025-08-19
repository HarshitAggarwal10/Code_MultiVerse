import { motion } from "framer-motion";
import {
  FaLinkedinIn,
  FaGithub,
  FaDiscord,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import Mine from "../images/mine.png";

export default function FounderCard() {
  const floatingIcons = [
    { emoji: "💻", top: "10%", left: "8%", delay: "0s" },
    { emoji: "⚛️", top: "20%", right: "6%", delay: "1s" },
    { emoji: "🧠", bottom: "12%", left: "5%", delay: "2s" },
    { emoji: "📡", bottom: "18%", right: "8%", delay: "2.5s" },
    { emoji: "🔧", top: "50%", left: "-3%", delay: "1.8s" },
  ];

  return (
    <section
      id="founder"
      className="relative isolate px-6 md:px-12 py-28 bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-100 overflow-hidden"
    >
      {/* Background blobs */}
      <AnimatedBlob className="top-[-80px] left-[-80px] bg-indigo-300" />
      <AnimatedBlob className="bottom-[-100px] right-[-90px] bg-rose-200 delay-1500" />

      {/* Floating Tech Emojis */}
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-xl md:text-2xl lg:text-3xl opacity-40 select-none pointer-events-none"
          style={{
            top: icon.top,
            left: icon.left,
            right: icon.right,
            bottom: icon.bottom,
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 6,
            delay: parseFloat(icon.delay),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {icon.emoji}
        </motion.div>
      ))}

      {/* Header */}
      <header className="relative z-10 mb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 font-serif">
          Meet the Founder
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-gray-600 italic max-w-2xl mx-auto">
          "One vision • One developer driving CodeMultiVerse forward"
        </p>
      </header>

      {/* Card */}
      <div className="relative z-10 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.02, rotate: 0.3 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="group w-full max-w-6xl backdrop-blur-[10px] bg-white/60 border border-white/30 shadow-[0_12px_50px_-12px_rgba(0,0,0,0.25)] rounded-[2rem] overflow-hidden py-14 px-8 md:px-20 flex flex-col md:flex-row gap-12 md:gap-16"
        >
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="shrink-0 self-center relative"
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-3xl border-[6px] border-indigo-300/50 animate-[pulse_3s_ease-in-out_infinite]"></div>

            <div className="relative w-72 h-72 rounded-3xl bg-white/40 border border-white/30 shadow-xl p-3">
              <div className="absolute inset-0 rounded-3xl border-4 border-indigo-200 opacity-60 animate-pulse"></div>
              <img
                src={Mine}
                alt="Harshit Aggarwal"
                className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-md hover:shadow-2xl transition-shadow duration-500"
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-left max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-indigo-900 mb-2 leading-snug tracking-tight font-serif">
              Harshit Aggarwal
            </h2>
            <p className="text-2xl text-indigo-700 font-medium mb-6">
              Full-Stack & MERN Developer
            </p>

            <p className="text-gray-800/90 leading-relaxed mb-4">
              I'm a <span className="font-semibold">19-year-old software engineer</span> and the
              founder of <span className="font-semibold">CodeMultiVerse</span>. I specialize in
              building scalable full-stack applications with the MERN stack and bring a passion
              for <span className="font-semibold">AI</span>, competitive programming, and elegant UI/UX
              engineering.
            </p>
            <p className="text-gray-800/90 leading-relaxed mb-6">
              My mission is to empower the next generation of developers through real-world
              projects, education, and community collaboration — turning ideas into delightful
              digital products.
            </p>

            {/* Email */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="mailto:harshitaggarwal100306@gmail.com"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-indigo-800 border border-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
              >
                <FaEnvelope /> harshitaggarwal100306@gmail.com
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 text-[1.45rem]">
              <SocialIcon href="https://www.linkedin.com/in/harshit-aggarwal-85309a296/" label="LinkedIn" bg="bg-[#0A66C2]">
                <FaLinkedinIn />
              </SocialIcon>
              <SocialIcon href="https://github.com/harshitagg" label="GitHub" bg="bg-gray-800">
                <FaGithub />
              </SocialIcon>
              <SocialIcon href="https://discordapp.com/users/harshit#1003" label="Discord" bg="bg-indigo-600">
                <FaDiscord />
              </SocialIcon>
              <SocialIcon href="https://www.instagram.com/iamharshitaggarwal/" label="Instagram" bg="bg-gradient-to-tr from-pink-500 to-orange-500">
                <FaInstagram />
              </SocialIcon>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialIcon({ href, label, children, bg }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`grid place-items-center w-12 h-12 rounded-full text-white ${bg} shadow-lg hover:shadow-[0_0_15px_currentColor] transition-all duration-300`}
      whileHover={{ y: -6, rotate: 5, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {children}
    </motion.a>
  );
}

function AnimatedBlob({ className = "", ...rest }) {
  return (
    <motion.div
      className={`absolute w-[280px] h-[280px] rounded-full blur-3xl opacity-30 ${className}`}
      animate={{ y: [0, 60, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      {...rest}
    />
  );
}
