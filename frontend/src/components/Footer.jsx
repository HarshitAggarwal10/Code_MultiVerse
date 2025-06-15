import { FaFacebook, FaInstagram, FaLinkedinIn, FaCopyright } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const handleNewsletter = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Newsletter subscribed!");
        setNewsletterEmail("");
      } else {
        alert(data.message || "❌ Subscription failed");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting newsletter");
    }
  };
  return (
    <footer className="bg-[#101c32] text-white px-8 py-12 mt-16 flex flex-wrap justify-between gap-8">
      {/* Footer Columns */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Top Products</h3>
        <ul className="text-sm text-[#7b838a] space-y-2">
          <li className="hover:text-white cursor-pointer">Manage Reputation</li>
          <li className="hover:text-white cursor-pointer">Power Tools</li>
          <li className="hover:text-white cursor-pointer">Managed Website</li>
          <li className="hover:text-white cursor-pointer">Marketing Service</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Quick Links</h3>
        <ul className="text-sm text-[#7b838a] space-y-2">
          <li className="hover:text-white cursor-pointer">Jobs</li>
          <li className="hover:text-white cursor-pointer">Marketing Services</li>
          <li className="hover:text-white cursor-pointer">Top Products</li>
          <li className="hover:text-white cursor-pointer">Manage Reputations</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Features</h3>
        <ul className="text-sm text-[#7b838a] space-y-2">
          <li className="hover:text-white cursor-pointer">Manage Reputation</li>
          <li className="hover:text-white cursor-pointer">Power Tools</li>
          <li className="hover:text-white cursor-pointer">Managed Website</li>
          <li className="hover:text-white cursor-pointer">Marketing Service</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Resources</h3>
        <ul className="text-sm text-[#7b838a] space-y-2">
          <li className="hover:text-white cursor-pointer">Guides</li>
          <li className="hover:text-white cursor-pointer">Research</li>
          <li className="hover:text-white cursor-pointer">Experts</li>
          <li className="hover:text-white cursor-pointer">Marketing Service</li>
        </ul>
      </div>

      {/* Newsletter */}
      <div className="max-w-sm">
        <h3 className="font-semibold text-lg mb-2">Newsletter</h3>
        <p className="text-[#7b838a] text-sm">You can trust us, we only send your progress and achievements</p>
        <div className="flex mt-4">
          <input
            type="text"
            placeholder="Your Email address"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            className="w-full p-3 bg-[#334f6c] text-white text-sm placeholder:text-gray-300 rounded-l-md outline-none"
          />
          <button
            onClick={handleNewsletter}
            className="bg-[#FDC93B] text-white font-semibold px-5 rounded-r-md hover:bg-white hover:text-[#151564] transition-all duration-300"
          >
            ENTER
          </button>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="w-full mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="flex items-center gap-1 text-sm text-gray-300">
          Copyright <FaCopyright className="text-xs" /> 2024 All rights reserved by <strong>CodeMultiVerse</strong>
        </p>
        <div className="flex gap-4 text-white text-lg">
          <a href="https://www.facebook.com/thequizopedia/" target="_blank" rel="noopener noreferrer" className="bg-[#5f7185] p-2 rounded-full hover:bg-[#FDC93B] hover:text-[#2c2c2c]">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/quizopedia.agk/" target="_blank" rel="noopener noreferrer" className="bg-[#5f7185] p-2 rounded-full hover:bg-[#FDC93B] hover:text-[#2c2c2c]">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/in/quizopedia-quiz-game-935703296/" target="_blank" rel="noopener noreferrer" className="bg-[#5f7185] p-2 rounded-full hover:bg-[#FDC93B] hover:text-[#2c2c2c]">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;