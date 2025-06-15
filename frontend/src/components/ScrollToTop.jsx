import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const FloatingMenu = () => {
  const [fabOpen, setFabOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    {
      label: "Scroll to Top",
      icon: "⬆️",
      onClick: ScrollToTop,
      bg: "bg-blue-600",
      hover: "hover:bg-blue-700",
    },
    {
      label: "Chatbot",
      icon: "🤖",
      onClick: () => alert("Chatbot coming soon!"),
      bg: "bg-yellow-500",
      hover: "hover:bg-yellow-600",
    },
    {
      label: "Contact",
      icon: "📞",
      onClick: () => navigate("/contact"),
      bg: "bg-green-600",
      hover: "hover:bg-green-700",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Floating Action Buttons */}
        <div
          className={`flex flex-col items-end space-y-3 mb-3 transition-all duration-500 ease-in-out transform ${
            fabOpen
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-90 translate-y-4 pointer-events-none"
          }`}
        >
          {actions.map((action, idx) => (
            <div key={idx} className="relative group">
              <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                {action.label}
              </span>
              <button
                onClick={action.onClick}
                className={`${action.bg} text-white p-3 rounded-full shadow-xl ${action.hover} transition transform hover:scale-105`}
                title={action.label}
              >
                {action.icon}
              </button>
            </div>
          ))}
        </div>

        {/* FAB Toggle Button */}
        <button
          onClick={() => setFabOpen(!fabOpen)}
          className="bg-gray-800 text-white p-4 rounded-full shadow-2xl hover:bg-gray-700 transition transform hover:rotate-90"
          title="Menu"
        >
          <div className="flex flex-col items-center space-y-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default FloatingMenu;
