/* ───────── src/pages/Contact.jsx ───────── */
import { useRef } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import back1   from '../images/back1.jpg';

/* ─ EmailJS keys (must match ones in your EmailJS dashboard) ─ */
const SERVICE_ID  = 'service_8p86kzp';
const TEMPLATE_ID = 'template_if14rc3';
const PUBLIC_KEY  = '9ahe1ajax_Tg2Z-4O';   // MUST start with “public_”

export default function Contact() {
  const formRef = useRef(null);

  /* ────────────────── handlers ────────────────── */
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        alert('✅  Message sent successfully!');
        formRef.current.reset();
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        alert('❌  Could not send message. Please try again.');
      });
  };

  /* ────────────────── JSX ────────────────── */
  return (
    <>
      {/* Hero banner */}
      <section
        id="about-home"
        className="w-full h-[85vh] bg-cover bg-center flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(25,0,60,.6),rgba(0,0,70,.7)),url(${back1})`
        }}
      >
        <h2 className="text-white text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg animate-fade-in">
          Contact&nbsp;Us
        </h2>
      </section>

      {/* Contact block */}
      <section id="contact" className="px-6 md:px-12 py-16 flex flex-col lg:flex-row gap-16 bg-gray-100">
        {/* Left column */}
        <aside className="w-full lg:w-1/3 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600 border-b pb-6">
            Get in touch and let's dive into the world of trivia together!
          </p>

          <Info title="🏠 Address">
            Chitkara University, Rajpura, Punjab 140401
          </Info>

          <Info title="📞 Phone">
            +91 80592 41824<br />
          </Info>

          <Info title="✉️ Support">
            harshit0766.be23@chitkara.edu.in<br />
          </Info>

          <Socials />
        </aside>

        {/* Right column – form */}
        <div className="w-full lg:w-2/3 bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-2xl">
          <h4 className="text-3xl font-bold text-gray-800 mb-4">Let’s Connect</h4>
          <p className="text-gray-600 mb-6">Looking for help? Fill the form and start a new adventure.</p>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            {/* Name & email */}
            <div className="flex flex-col md:flex-row gap-4">
              <Input name="name"  placeholder="Your Name"  />
              <Input name="email" placeholder="Your Email" type="email" />
            </div>

            <Input name="subject" placeholder="Subject" />

            <textarea
              name="message"
              rows="5"
              placeholder="How can we help?"
              className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />

            <button
              type="submit"
              className="w-full md:w-auto bg-indigo-700 text-white px-6 py-3 rounded-md hover:bg-indigo-800 transition"
            >
              Send&nbsp;Message
            </button>
          </form>
        </div>
      </section>

      {/* Google map */}
      <iframe
        title="Chitkara University Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3422.2997393088723!2d76.65745467512562!3d30.516739296194487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3910288ac97cfdfd%3A0x8c34ea3c7d299b5b!2sChitkara%20University!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
        className="w-full h-[500px] mt-12 border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </>
  );
}

/* ───────── helpers ───────── */
const Input = ({ type = 'text', ...rest }) => (
  <input
    type={type}
    {...rest}
    className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
    required
  />
);

const Info = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-700 mt-2">{children}</p>
  </div>
);

const Socials = () => {
  const links = [
    { icon: <FaFacebookF />, link: 'https://www.facebook.com/thequizopedia/' },
    { icon: <FaInstagram />, link: 'https://www.instagram.com/quizopedia.agk/' },
    { icon: <FaLinkedinIn />, link: 'https://www.linkedin.com/in/quizopedia-quiz-game-935703296/' },
    { icon: <FaWhatsapp />,  link: 'https://chat.whatsapp.com/IkWddWbzJbf0KKcOpNIJRJ' }
  ];

  return (
    <>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
      <div className="flex gap-4">
        {links.map(({ icon, link }, i) => (
          <a
            key={i}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-indigo-700 text-white flex items-center justify-center hover:bg-indigo-900 transition transform hover:scale-110"
          >
            {icon}
          </a>
        ))}
      </div>
    </>
  );
};
