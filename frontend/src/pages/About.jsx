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
                id="about-home"
                className="w-full h-[85vh] bg-cover bg-center flex flex-col justify-center items-center text-center pt-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(25, 0, 60, 0.6), rgba(0, 0, 70, 0.7)), url(${back1})`,
                }}
            >
                <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wide drop-shadow-md">
                    About CodeMultiVerse
                </h2>
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
                </div>
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
