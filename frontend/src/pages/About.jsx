import aImg from "../images/a.png";
import fe1 from "../images/fe1.png";
import fe2 from "../images/fe2.png";
import back1 from "../images/back1.jpg";
import Features from "../components/Features";
import Experts from "../components/Experts";
import trust1 from "../images/trust (1).png";
import trust2 from "../images/trust (2).png";
import trust3 from "../images/trust (3).png";
import trust4 from "../images/trust (4).png";
import trust5 from "../images/trust (5).png";
import trust6 from "../images/trust (6).png";

const About = () => {
    return (
        <div>
            <section
                className="relative w-full h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden"
            >
                {/* Gradient Universe Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a011b] via-[#11052f] to-[#050214] z-0" />

                {/* Keyframe Styles */}
                <style>{`
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; transform: scale(0.9); }
      50% { opacity: 1; transform: scale(1); }
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
      100% { transform: translateY(0px); }
    }

    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes glowPulse {
      0%, 100% { box-shadow: 0 0 15px rgba(99, 102, 241, 0.4); }
      50% { box-shadow: 0 0 25px rgba(99, 102, 241, 0.7); }
    }

    .star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: white;
      border-radius: 50%;
      animation: twinkle 4s ease-in-out infinite;
    }

    .dust {
      position: absolute;
      width: 1px;
      height: 1px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      animation: float 15s linear infinite;
    }
  `}</style>

                {/* Stars */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {[...Array(40)].map((_, i) => (
                        <div
                            key={i}
                            className="star"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 6}s`,
                            }}
                        />
                    ))}
                    {/* Space Dust */}
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={`dust-${i}`}
                            className="dust"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 10}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Floating Emojis */}
                {[
                    { emoji: "⚛️", top: "20%", left: "10%", delay: "0s" },
                    { emoji: "🟨", top: "35%", left: "85%", delay: "1.5s" },
                    { emoji: "🟢", top: "70%", left: "15%", delay: "0.8s" },
                    { emoji: "🌿", top: "15%", left: "65%", delay: "2.2s" },
                    { emoji: "🧠", top: "50%", left: "40%", delay: "1.2s" },
                    { emoji: "🧑‍💻", top: "75%", left: "75%", delay: "2.5s" },
                ].map((icon, i) => (
                    <div
                        key={i}
                        className="absolute text-2xl md:text-3xl lg:text-4xl pointer-events-none select-none"
                        style={{
                            top: icon.top,
                            left: icon.left,
                            animation: "float 6s ease-in-out infinite",
                            animationDelay: icon.delay,
                        }}
                    >
                        {icon.emoji}
                    </div>
                ))}

                {/* Emoji Orbit Ring */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-[200px] h-[200px] rounded-full border border-indigo-600/10 flex items-center justify-center gap-3 animate-spin-slow" style={{ animation: "glowPulse 3s infinite ease-in-out" }}>
                    {["💻", "🧪", "🔧", "🔭", "📡", "⚙️"].map((emoji, i) => (
                        <span key={i} className="text-white/40 text-lg">{emoji}</span>
                    ))}
                </div>

                {/* Background Glows */}
                <div className="absolute w-[600px] h-[600px] bg-indigo-600 opacity-20 rounded-full blur-[160px] top-1/3 left-1/4 z-0" />
                <div className="absolute w-[400px] h-[400px] bg-purple-700 opacity-15 rounded-full blur-[140px] bottom-1/4 right-1/3 z-0" />

                {/* Text Content */}
                <div className="relative z-10 max-w-4xl text-white animate-[fadeInUp_1s_ease-out]">
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg mb-6">
                        About CodeMultiVerse
                    </h2>
                    <p className="text-indigo-200 text-lg md:text-xl leading-relaxed px-2 max-w-3xl mx-auto">
                        CodeMultiVerse is a galaxy of interactive learning. Dive into coding adventures, orbit through tech stacks, and build projects across a universe of AI, Web Dev, and beyond. Every developer here is a star.
                    </p>
                </div>
            </section>

            <section className="relative flex flex-col md:flex-row items-center px-8 py-20 gap-12 max-w-7xl mx-auto overflow-hidden">
                {/* Soft gradient background accent */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[120px] -z-10"></div>
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-50/30 rounded-full blur-[100px] -z-10"></div>

                {/* Floating Emojis */}
                {[
                    { emoji: "💻", top: "15%", left: "5%", delay: "0s" },
                    { emoji: "⚛️", top: "70%", left: "10%", delay: "0.8s" },
                    { emoji: "📡", top: "25%", left: "90%", delay: "1.2s" },
                    { emoji: "🧠", top: "80%", left: "85%", delay: "2s" },
                    { emoji: "🔧", top: "50%", left: "0%", delay: "1.6s" },
                    { emoji: "🧑‍💻", top: "5%", left: "80%", delay: "2.5s" },
                ].map((icon, i) => (
                    <div
                        key={i}
                        className="absolute text-2xl md:text-3xl lg:text-4xl pointer-events-none select-none opacity-50"
                        style={{
                            top: icon.top,
                            left: icon.left,
                            animation: "floatIcon 6s ease-in-out infinite",
                            animationDelay: icon.delay,
                        }}
                    >
                        {icon.emoji}
                    </div>
                ))}

                {/* Left Image Section */}
                <div className="w-full md:w-3/5 md:pr-14 animate-[fadeInUp_0.8s_ease-out] relative z-10">
                    <img
                        src={aImg}
                        alt="CodeMultiVerse Illustration"
                        className="w-full max-h-[550px] object-contain rounded-2xl hover:scale-[1.02] transition-transform duration-500"
                    />
                </div>

                {/* Right Content Section */}
                <div className="w-full md:w-2/5 space-y-6 animate-[fadeInUp_1s_ease-out] relative z-10">
                    <h2 className="text-[#1f2937] text-3xl md:text-4xl font-bold leading-tight">
                        Welcome to <span className="text-indigo-600">CodeMultiVerse</span>
                    </h2>
                    <p className="text-gray-600 text-base leading-relaxed">
                        CodeMultiVerse is a dynamic tech community and learning platform where innovation meets collaboration.
                        Whether you're a curious beginner or a passionate developer, we empower your journey with interactive learning,
                        exciting coding challenges, and a vibrant support network.
                    </p>

                    {/* Feature 1 */}
                    <div className="flex items-start gap-4 mt-6 group">
                        <img
                            src={fe1}
                            alt="feature1"
                            className="w-12 transition-transform duration-300 group-hover:scale-110"
                        />
                        <div>
                            <h5 className="text-lg font-semibold text-[#1f2937]">Interactive Challenges</h5>
                            <p className="text-gray-500 text-sm">
                                From frontend to AI, explore hands-on coding challenges that sharpen your skills and ignite your curiosity.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-start gap-4 mt-4 group">
                        <img
                            src={fe2}
                            alt="feature2"
                            className="w-12 transition-transform duration-300 group-hover:scale-110"
                        />
                        <div>
                            <h5 className="text-lg font-semibold text-[#1f2937]">Lifetime Access</h5>
                            <p className="text-gray-500 text-sm">
                                Get unlimited lifetime access to our resources, community events, and learning content with a one-time sign-in.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Animations */}
                <style>{`
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes floatIcon {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }
  `}</style>
            </section>

            <Experts />

            <Features />

            <section
                id="trust"
                className="text-center px-8 py-20 bg-white max-w-7xl mx-auto"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                    Trusted By
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
                    "Chosen by Institutions, Loved by Innovators: CodeMultiVerse is the Trusted Choice!"
                </p>

                <div className="flex flex-wrap justify-center items-center gap-30 mt-12">
                    {[trust1, trust2, trust3, trust4, trust5, trust6].map((logo, index) => (
                        <img
                            key={index}
                            src={logo}
                            alt={`Trust Logo ${index + 1}`}
                            className="w-[80px] md:w-[100px] object-contain transition-transform duration-300 hover:scale-110"
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
