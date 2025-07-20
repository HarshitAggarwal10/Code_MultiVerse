import back1 from "../images/back1.jpg";
import aImg from "../images/a.png";
import fe1 from "../images/fe1.png";
import fe2 from "../images/fe2.png";
import fe3 from "../images/fe3.png";
import Features from "../components/Features";
import Reviews from "../components/Reviews";
import trust1 from "../images/trust (1).png";
import trust2 from "../images/trust (2).png";
import trust3 from "../images/trust (3).png";
import trust4 from "../images/trust (4).png";
import trust5 from "../images/trust (5).png";
import trust6 from "../images/trust (6).png";

const LearnMore = () => {
    return (
        <div>
            <section
                id="about-home"
                className="relative w-full h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden"
            >
                {/* Gradient Universe Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a011b] via-[#11052f] to-[#050214] z-0" />

                {/* Animated Stars */}
                <style>{`
    @keyframes twinkle {
      0%, 100% { opacity: 0.2; transform: scale(0.8); }
      50% { opacity: 0.9; transform: scale(1); }
    }
    .star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: white;
      border-radius: 50%;
      animation: twinkle 3s ease-in-out infinite;
    }
    @keyframes float {
      0% { transform: translateY(0); opacity: 0.6; }
      50% { transform: translateY(-15px); opacity: 1; }
      100% { transform: translateY(0); opacity: 0.6; }
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
                                animationDelay: `${Math.random() * 4}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Floating Emojis */}
                {[
                    { emoji: "🧠", top: "15%", left: "75%", delay: "0s" },
                    { emoji: "⚛️", top: "30%", left: "10%", delay: "1s" },
                    { emoji: "🟨", top: "50%", left: "80%", delay: "2s" },
                    { emoji: "🌐", top: "65%", left: "20%", delay: "1.5s" },
                    { emoji: "🧑‍💻", top: "75%", left: "60%", delay: "0.7s" },
                ].map((icon, i) => (
                    <div
                        key={i}
                        className="absolute text-2xl md:text-4xl pointer-events-none select-none"
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

                {/* Background Glow Effects */}
                <div className="absolute w-[500px] h-[500px] bg-indigo-600 opacity-20 rounded-full blur-[160px] top-1/3 left-1/4 z-0" />
                <div className="absolute w-[400px] h-[400px] bg-purple-700 opacity-15 rounded-full blur-[140px] bottom-1/4 right-1/3 z-0" />

                {/* Main Heading & Subtext */}
                <div className="relative z-10 text-white max-w-4xl">
                    <h2 className="text-4xl md:text-6xl font-extrabold drop-shadow-xl mb-4 animate-fade-in">
                        Learn More
                    </h2>
                    <p className="text-indigo-200 text-lg md:text-xl px-4">
                        Explore in-depth guides, immersive content, and unlock powerful concepts across the multiverse of coding. There's always more to learn, and infinite galaxies to build!
                    </p>
                </div>
            </section>


            <section
                id="about-container"
                className="flex flex-col md:flex-row items-center px-8 py-20 gap-12 max-w-7xl mx-auto"
            >
                <div className="w-full md:w-3/5 md:pr-14">
                    <img
                        src={aImg}
                        alt="CodeMultiVerse Illustration"
                        className="w-full max-h-[550px] object-contain rounded-xl"
                    />
                </div>
                <div className="w-full md:w-2/5 space-y-6">
                    <h2 className="text-[#1f2937] text-3xl md:text-4xl font-bold leading-tight">
                        Welcome to CodeMultiVerse
                    </h2>
                    <p className="text-gray-600 text-base leading-relaxed">
                        CodeMultiVerse is a dynamic tech community and learning platform where innovation meets collaboration.
                        Whether you're a curious beginner or a passionate developer, we empower your journey with interactive learning,
                        exciting coding challenges, and a vibrant support network.
                    </p>

                    <div className="flex items-start gap-4 mt-6">
                        <img src={fe1} alt="feature1" className="w-12" />
                        <div>
                            <h5 className="text-lg font-semibold text-[#1f2937]">Interactive Challenges</h5>
                            <p className="text-gray-500 text-sm">
                                From frontend to AI, explore hands-on coding challenges that sharpen your skills and ignite your curiosity.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 mt-4">
                        <img src={fe2} alt="feature2" className="w-12" />
                        <div>
                            <h5 className="text-lg font-semibold text-[#1f2937]">Lifetime Access</h5>
                            <p className="text-gray-500 text-sm">
                                Get unlimited lifetime access to our resources, community events, and learning content with a one-time sign-in.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 mt-4">
                        <img src={fe3} alt="feature2" className="w-12" />
                        <div>
                            <h5 className="text-lg font-semibold text-[#1f2937]">Courses</h5>
                            <p className="text-gray-500 text-sm">
                                Explore our popular courses today and become a expert in your respective course.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Features />
            <Reviews />

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
    )
}

export default LearnMore;