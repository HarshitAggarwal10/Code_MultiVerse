import { Link } from "react-router-dom";
import heroImg from "../images/back.jpg";
import featureImg from "../img/motivatestudent.webp";
import PopularCourses from "../components/PopularCourses";
import Features from "../components/Features";
// import Experts from "../components/Experts";
import Reviews from "../components/Reviews";
import { Typewriter } from "react-simple-typewriter";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import TechLogos3DSection from "../components/TechLogos";


const CodeSphere = () => {
    return (
        <mesh rotation={[0.3, 0.3, 0]}>
            <sphereGeometry args={[1.8, 64, 64]} />
            <meshStandardMaterial color="#0ea5e9" wireframe={true} />
        </mesh>
    );
};

const FloatingCodeText = () => {
    return (
        <Text
            position={[0, 2.5, 0]}
            fontSize={0.4}
            color="#FDC93B"
            anchorX="center"
            anchorY="middle"
        >
            const universe = "CodeMultiVerse";
        </Text>
    );
};

const Home = () => {
    return (
        <div>
            <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden text-center px-4">
                <style>{`
    @keyframes twinkle {
      0%, 100% { opacity: 0.1; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.3); }
    }

    @keyframes floatEmoji {
      0% { transform: translateY(0px); opacity: 0.3; }
      50% { transform: translateY(-20px); opacity: 0.6; }
      100% { transform: translateY(0px); opacity: 0.3; }
    }

    @keyframes cometMove {
      0% { transform: translate(0, 0); opacity: 0; }
      10% { opacity: 1; }
      100% { transform: translate(100vw, -100vh); opacity: 0; }
    }

    .star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: white;
      border-radius: 50%;
      animation: twinkle 4s ease-in-out infinite;
    }

    .floating-emoji {
      animation: floatEmoji 10s ease-in-out infinite;
      font-size: 2.5rem;
      opacity: 0.4;
      user-select: none;
      filter: drop-shadow(0 0 8px rgba(255,255,255,0.25));
    }

    .comet {
      position: absolute;
      width: 2px;
      height: 80px;
      background: linear-gradient(white, transparent);
      opacity: 0;
      animation: cometMove 12s linear infinite;
    }
  `}</style>

                {/* Layered Space Gradient */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#06010d] via-[#0a0c2e] to-[#0c0f1e]" />

                {/* Cosmic Dust Glows */}
                <div className="absolute w-[600px] h-[600px] bg-purple-800 opacity-20 rounded-full blur-[200px] top-1/4 left-1/3 z-0"></div>
                <div className="absolute w-[400px] h-[400px] bg-indigo-500 opacity-15 rounded-full blur-[150px] bottom-1/3 right-1/4 z-0"></div>
                <div className="absolute w-[500px] h-[500px] bg-fuchsia-600 opacity-10 rounded-full blur-[180px] top-1/2 left-1/5 z-0"></div>

                {/* Twinkling Stars */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    {[...Array(60)].map((_, i) => (
                        <div
                            key={i}
                            className="star"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 4}s`,
                                opacity: Math.random() * 0.7 + 0.3,
                            }}
                        />
                    ))}
                </div>

                {/* Floating Emojis */}
                <div className="absolute inset-0 pointer-events-none z-10">
                    {['⚛️', '💻', '🌐', '📦', '🧠', '📱', '🛰️', '🔧'].map((emoji, index) => (
                        <div
                            key={index}
                            className="floating-emoji absolute text-white"
                            style={{
                                top: `${10 + index * 8}%`,
                                left: `${10 + index * 9}%`,
                                animationDelay: `${index * 1.2}s`,
                            }}
                        >
                            {emoji}
                        </div>
                    ))}
                </div>

                {/* Hero Content */}
                <div className="z-20 max-w-4xl mx-auto text-white">
                    <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-wide drop-shadow-lg">
                        Step Into the Universe of Code with <br />
                        <span className="text-yellow-400 inline-block drop-shadow-md">
                            <Typewriter
                                words={["CodeMultiVerse", "CodeMultiVerse", "CodeMultiVerse"]}
                                loop
                                cursor
                                cursorStyle="_"
                                typeSpeed={90}
                                deleteSpeed={40}
                                delaySpeed={1200}
                            />
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl leading-7 text-indigo-100 max-w-3xl mx-auto drop-shadow-sm">
                        CodeMultiVerse is a futuristic galaxy built for devs and dreamers.
                        Conquer interactive quests, explore AI-powered quizzes, and showcase
                        your coding skills among the stars.
                    </p>

                    <div className="mt-10 flex gap-6 justify-center flex-wrap">
                        <Link
                            to="/learn-more"
                            className="text-white bg-blue-800 hover:bg-white hover:text-blue-800 font-semibold px-7 py-3 rounded-md transition shadow-lg"
                        >
                            Learn More
                        </Link>
                        <Link
                            to="/courses"
                            className="text-white bg-yellow-400 hover:bg-white hover:text-yellow-500 font-semibold px-7 py-3 rounded-md transition shadow-lg"
                        >
                            Explore Tracks
                        </Link>
                    </div>
                </div>
            </section>


            <section id="quiz" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                        Interactive Modules
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
                        Fuel Your Growth with Daily Coding Challenges, AI-based Quizzes & Hands-on Projects!
                    </p>

                    <div className="mt-16 flex flex-col lg:flex-row items-center justify-between gap-12 bg-[#f9f9ff] p-6 md:p-10 rounded-xl shadow-md">

                        {/* Image Section */}
                        <div className="w-full lg:w-5/12 flex justify-center">
                            <div className="w-114 h-84 sm:w-112 sm:h-82 overflow-hidden rounded-xl hover:shadow-blue-400/40 transition duration-500">
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
                            <Link
                                to="/auth"
                                className="inline-block bg-blue-900 text-white hover:bg-[#FDC93B] hover:text-blue-900 px-6 py-3 rounded-md font-semibold transition duration-300"
                            >
                                Get Started &gt;
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-28 bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                            Enter the <span className="text-[#FDC93B]">CodeMultiVerse</span>
                        </h2>
                        <p className="text-lg md:text-xl text-indigo-200 max-w-3xl mx-auto">
                            Discover a visually striking universe where every orbit represents a language and every star a problem solved.
                        </p>
                    </div>

                    <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
                            <ambientLight intensity={0.6} />
                            <directionalLight position={[3, 2, 1]} intensity={1} />
                            <Stars radius={100} depth={50} count={3000} factor={4} fade speed={2} />
                            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                            <CodeSphere />
                            <FloatingCodeText />
                        </Canvas>
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-lg text-indigo-100 max-w-xl mx-auto">
                            Visualize code like never before — where creativity meets logic in an infinite digital universe.
                        </p>
                    </div>
                </div>
            </section>

            <PopularCourses />
            <TechLogos3DSection />
            <Features />
            {/* <Experts /> */}
            <Reviews />
        </div>
    );
};

export default Home;
