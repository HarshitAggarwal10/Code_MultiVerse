import { useEffect } from 'react';
import Confetti from 'react-confetti';

export default function Celebration({ onDone }) {
  // run confetti for 4 s, then notify parent
  useEffect(() => {
    const id = setTimeout(onDone, 4000);
    return () => clearTimeout(id);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={400}
      />
    </div>
  );
}
