import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import back1 from "../images/back1.jpg";

const Contact = () => {
    return (
        <>
            {/* Hero Section */}
            <section
                id="about-home"
                className="w-full h-[85vh] bg-cover bg-center flex flex-col justify-center items-center text-center pt-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(25, 0, 60, 0.6), rgba(0, 0, 70, 0.7)), url(${back1})`,
                }}
            >
                <h2 className="text-white text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg animate-fade-in">
                    Contact Us
                </h2>
            </section>

            {/* Contact Section */}
            <section id="contact" className="px-6 md:px-12 py-16 flex flex-col lg:flex-row gap-16 bg-gray-100">
                {/* Left Section */}
                <div className="w-full lg:w-1/3 space-y-6 animate-fade-in">
                    <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
                    <p className="text-gray-600 border-b pb-6">
                        Get in touch and let's dive into the world of trivia together!
                    </p>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">🏠 Address</h3>
                        <p className="text-sm text-gray-700 mt-2">
                            Chitkara University, Rajpura, Punjab, 140401
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">📞 Phone</h3>
                        <p className="text-sm text-gray-700 mt-2">
                            +91 80592 41824<br />+91 98142 20340<br />+91 78149 61169
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">✉️ Support</h3>
                        <p className="text-sm text-gray-700 mt-2">
                            harshit0766.be23@chitkara.edu.in<br />
                            jiyansh0786.be23@chitkara.edu.in<br />
                            apurav0208.be23@chitkara.edu.in
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            {[
                                { icon: <FaFacebookF />, link: "https://www.facebook.com/thequizopedia/" },
                                { icon: <FaInstagram />, link: "https://www.instagram.com/quizopedia.agk/" },
                                { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/quizopedia-quiz-game-935703296/" },
                                { icon: <FaWhatsapp />, link: "https://chat.whatsapp.com/IkWddWbzJbf0KKcOpNIJRJ" },
                            ].map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-indigo-700 text-white flex items-center justify-center hover:bg-indigo-900 transition duration-300 transform hover:scale-110"
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Section - Form */}
                <div className="w-full lg:w-2/3 bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-2xl animate-fade-in">
                    <h4 className="text-3xl font-bold text-gray-800 mb-4">Let’s Connect</h4>
                    <p className="text-gray-600 mb-6">
                        Looking for help? Fill the form and start a new adventure.
                    </p>
                    <form
                        action="https://api.web3forms.com/submit"
                        method="POST"
                        className="space-y-5"
                    >
                        <input type="hidden" name="access_key" value="63e6cdb1-4edc-4b20-b1db-43f416a49a52" />

                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className="w-full md:w-1/2 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                className="w-full md:w-1/2 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                                required
                            />
                        </div>

                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        />

                        <textarea
                            name="message"
                            rows="5"
                            placeholder="How can we help?"
                            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        ></textarea>

                        <button
                            type="submit"
                            className="w-full md:w-auto bg-indigo-700 text-white px-6 py-3 rounded-md hover:bg-indigo-800 transition duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            {/* Full-Width Google Map */}
            <section className="w-full mt-12">
                <iframe
                    title="Chitkara University Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3422.2997393088723!2d76.65745467512562!3d30.516739296194487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3910288ac97cfdfd%3A0x8c34ea3c7d299b5b!2sChitkara%20University!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block"
                ></iframe>
            </section>
        </>
    );
};

export default Contact;
