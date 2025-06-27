/* ───────── src/pages/CertificatePage.jsx (fixed & polished) ───────── */
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext /*, useRef*/ } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import logo from '../quizpics/logo2-removebg-preview.png';
import sign from '../quizpics/image.png';

/* ─ fallback colour palette ─ */
const PALETTE = [
  '#2563eb', '#0ea5e9', '#059669',
  '#e11d48', '#d97706', '#9333ea',
  '#ea580c', '#14b8a6', '#22c55e'
];
const hashToIdx = str =>
  [...str].reduce((t, c) => (t + c.charCodeAt(0)) % PALETTE.length, 0);

export default function CertificatePage() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [fullName, setFullName] = useState('Learner');
  const [theme, setTheme] = useState('#2563eb');          // default blue

  /* ───────────────────────────── load data once ─────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        /* 0️⃣ – try the name that’s already in context/localStorage */
        const cachedUser = localStorage.getItem('user');
        if (user?.name) setFullName(user.name);
        else if (cachedUser) {
          const tmp = JSON.parse(cachedUser);
          if (tmp?.name) setFullName(tmp.name);
        }

        /* 1️⃣ – course & enrolment */
        const [{ data: subj }, { data: mine }] = await Promise.all([
          api.get(`/subjects/${subjectId}`),
          api.get('/user-courses/my-courses')
        ]);

        const record = mine.find(r => r.subject?._id === subjectId);
        if (!record) return navigate('/profile', { replace: true });

        setCourse(subj);
        setProgress(record.progress ?? 100);

        /* 2️⃣ – if the name is still missing, ask the user endpoint by id */
        if (!user?.name && record.userId) {
          try {
            const { data } = await api.get(`/users/${record.userId}`);
            if (data?.name) setFullName(data.name);
          } catch {/* silently ignore */ }
        }

        /* 3️⃣ – pick a colour */
        const picked = subj.colorHex ||
          subj.themeColor ||
          PALETTE[hashToIdx(subjectId)];
        setTheme(picked);

      } catch (err) {
        console.error('Certificate load failed:', err);
        navigate('/profile', { replace: true });
      } finally {
        setLoading(false);
      }
    })();
  }, [subjectId, user, navigate]);

  /* ───────────────────────────── loading splash ─────────────────────────── */
  if (loading) {
    return (
      <div className="min-h-screen grid place-content-center bg-white">
        <p className="text-slate-500 text-lg">Loading certificate…</p>
      </div>
    );
  }

  /* ───────────────────────── rendered certificate ───────────────────────── */
  return (
    <div
      style={{ '--c': theme, '--c60': `${theme}99` }}
      className="min-h-screen flex items-center justify-center py-14 px-4
                 bg-slate-100 print:bg-white relative overflow-hidden">

      {/* background aura */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, var(--c)11%,transparent 70%)',
          opacity: .08
        }} />
        <button
          onClick={() => navigate('/profile')}
          className="fixed top-6 left-6 px-4 py-2 rounded-md font-semibold
                   text-white shadow print:hidden"
          style={{ background: 'var(--c)' }}>
          ← Back to Profile
        </button>

      {/* --------------- CARD --------------- */}
      <div
        className="relative w-[1000px] h-[700px] bg-white/80 backdrop-blur
                   rounded-[32px] border-[14px] shadow-2xl p-20
                   print:shadow-none"
        style={{ borderColor: 'var(--c)' }}>

        {/* logo & brand */}
        <div className="absolute top-6 left-6 select-none">
          <img src={logo} alt="Code MultiVerse logo"
            className="w-24 drop-shadow-md" />
          <p className="mt-1 text-[1.05rem] font-serif tracking-wide font-semibold"
            style={{ color: 'var(--c)' }}>
            Code&nbsp;MultiVerse
          </p>
        </div>

        {/* heading */}
        <h1 className="text-center text-5xl font-extrabold mb-1"
          style={{ color: 'var(--c)', fontFamily: 'Playfair Display,serif' }}>
          Certificate&nbsp;of&nbsp;Achievement
        </h1>
        <p className="text-center text-sm tracking-widest mb-8"
          style={{ color: 'var(--c60)' }}>
          Presented by Code&nbsp;MultiVerse
        </p>

        {/* body */}
        <p className="text-center text-lg text-gray-700">
          This is to certify that
        </p>

        <h2 className="mt-4 text-center text-4xl font-bold text-gray-900"
          style={{
            textDecoration: 'underline',
            textDecorationColor: 'var(--c)',
            textDecorationThickness: '4px',
            textUnderlineOffset: '8px'
          }}>
          {fullName}
        </h2>

        <p className="mt-8 text-center text-lg text-gray-700">
          has successfully completed the course
        </p>

        <h3 className="mt-3 text-center text-3xl font-semibold"
          style={{ color: 'var(--c)' }}>
          {course?.name}
        </h3>

        <p className="text-center text-md text-gray-600 mt-3">
          Completion&nbsp;Progress:&nbsp;<strong>{progress}%</strong>
        </p>

        <p className="text-center text-gray-600 italic max-w-3xl mx-auto
                      mt-10 leading-relaxed">
          Awarded in recognition of the dedication and mastery you have shown
          throughout your learning journey. Keep coding, keep creating.
        </p>

        {/* footer */}
        <div
          className="absolute bottom-16 inset-x-0 px-20 flex justify-between items-end">
          <div className="text-sm text-gray-600">
            <p>Date</p>
            <p className="font-medium">{new Date().toLocaleDateString()}</p>
          </div>

          <div className="text-center">
            <img src={sign} alt="signature" className="w-40 mx-auto" />
            <p className="text-sm text-gray-600 -mt-2">Course Director</p>
          </div>
        </div>

        {/* inner border */}
        <div className="absolute inset-4 rounded-[24px] pointer-events-none"
          style={{ border: '4px solid var(--c60)' }} />
      </div>

      {/* print helper */}
      <button
        onClick={() => {
          alert(
            `👉 In the dialog change **Destination → Save as PDF** then press **Save**.

If another printer (e.g. OneNote) appears, pick “Save as PDF” instead.` );
          window.print();
        }}
        className="fixed bottom-6 right-6 px-4 py-2 rounded-md font-semibold
                   text-white shadow print:hidden"
        style={{ background: 'var(--c)' }}>
        Print / Save&nbsp;PDF
      </button>
    </div>
  );
}


//service_8p86kzp