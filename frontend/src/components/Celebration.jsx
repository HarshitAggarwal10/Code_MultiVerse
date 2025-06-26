// src/components/Celebration.jsx
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Celebration({ onDone }) {
  useEffect(() => {
    // burst repeatedly for ~3 s
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 8,
        spread: 70,
        origin: { y: 0.1 }   // start near top
      });
      if (Date.now() < end) requestAnimationFrame(frame);
      else onDone?.();
    };
    frame();
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl px-10 py-8 text-center">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-2">
          🎉 Congratulations!
        </h2>
        <p className="text-slate-700">
          You’ve completed <strong>all 5 challenges</strong>.<br />
          Only the assignments stand between you and your certificate.
        </p>
        <button
          className="mt-6 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold"
          onClick={onDone}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
