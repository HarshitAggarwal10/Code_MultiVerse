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
            <section
                id="home"
                className="relative w-full h-screen bg-cover bg-center flex flex-col justify-center items-center text-center pt-10 overflow-hidden"
                style={{
                    backgroundImage: `linear-gradient(rgba(31, 30, 45, 0.3), rgba(10, 8, 113, 0.7)), url(${heroImg})`,
                }}
            >
                {/* Decorative Glows */}
                <div className="absolute top-10 left-10 w-53 h-52 bg-indigo-400 opacity-20 rounded-full blur-3xl animate-pulse z-0"></div>
                <div className="absolute bottom-10 right-10 w-52 h-52 bg-yellow-400 opacity-20 rounded-full blur-3xl animate-pulse z-0"></div>

                <div className="w-full max-w-7xl mx-auto px-4 text-white z-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wide leading-tight">
                        Step Into the Universe of Code with <br />
                        <span className="text-yellow-400 inline-block">
                            <Typewriter
                                words={["CodeMultiVerse", "CodeMultiVerse", "CodeMultiVerse"]}
                                loop={true}
                                cursor
                                cursorStyle="_"
                                typeSpeed={90}
                                deleteSpeed={40}
                                delaySpeed={1200}
                            />
                        </span>
                    </h2>
                    <p className="text-lg md:text-base leading-6 md:leading-7 max-w-3xl mx-auto text-indigo-100">
                        CodeMultiVerse is a futuristic space built for devs and dreamers. Conquer interactive quests, explore AI-driven quizzes, and showcase your code skills in a galaxy full of learning.
                    </p>

                    <div className="mt-8 flex gap-4 flex-wrap justify-center">
                        <Link
                            to="/learn-more"
                            className="text-white bg-blue-900 hover:bg-white hover:text-blue-900 font-semibold px-7 py-3 rounded-md transition"
                        >
                            Learn More
                        </Link>
                        <Link
                            to="/courses"
                            className="text-white bg-[#FDC93B] hover:bg-white hover:text-yellow-500 font-semibold px-7 py-3 rounded-md transition"
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
