import { useEffect, useState, useContext, useRef } from 'react';
import api from '../utils/api';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaMedal } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { formatISO } from 'date-fns';
import Celebration from '../components/Celebration';
import emailjs from "@emailjs/browser";
import { FaPaperPlane, FaTimes } from "react-icons/fa";

const SERVICE_ID = "service_wcgoxz2";
const TEMPLATE_ID = "template_cww92fu";
const PUBLIC_KEY = "9ahe1ajax_Tg2Z-4O";

export default function UserProfile() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [alert, setAlert] = useState(null);
  const [streakDays, setStreakDays] = useState(0);     // e.g. 5
  const [nextBadge, setNextBadge] = useState('N/A');
  const [showCertConfetti, setShowCertConfetti] = useState(false);
  const [seenReadyIds, setSeenReadyIds] = useState(new Set());
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSend = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setSuccessMsg("✅ Message sent successfully!");
        formRef.current.reset();
        setSending(false);
        // Optionally auto-close after delay
        setTimeout(() => {
          setOpen(false);
          setSuccessMsg("");
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Failed to send message. Please try again.");
        setSending(false);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/user-courses/my-courses');
        setCourses(res.data || []);
        const activityDates = new Set();
        (res.data || []).forEach(c => {
          ['createdAt', 'updatedAt'].forEach(k => {
            if (c[k]) activityDates.add(formatISO(new Date(c[k]), { representation: 'date' }));
          });
          if (c.quizResult?.attemptedAt) {
            activityDates.add(formatISO(new Date(c.quizResult.attemptedAt), { representation: 'date' }));
          }
        });

        let tmp = 0;                                    // walk backwards from today
        for (let i = 0; ; i++) {
          const dayKey = formatISO(
            new Date(Date.now() - i * 86_400_000),
            { representation: 'date' }
          );
          if (activityDates.has(dayKey)) tmp++;
          else break;
        }
        setStreakDays(tmp);
        const best = Math.max(0, ...res.data.map(c => c.quizResult?.score ?? 0));
        let nb;
        if (best >= 80) nb = 'Maxed';
        else if (best >= 60) nb = '≥ 80 %';
        else if (best >= 40) nb = '≥ 60 %';
        else nb = '≥ 40 %';
        setNextBadge(nb);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const readyNow = courses.filter(c => c.certificateStatus === 'ready');
    const fresh = readyNow.find(c => !seenReadyIds.has(c.subject._id));
    if (fresh) {
      setShowCertConfetti(true);
      setSeenReadyIds(prev => new Set(prev).add(fresh.subject._id));
    }
  }, [courses, seenReadyIds]);

  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase() || 'U';
  const inProgress = courses.filter(c => (c.progress ?? 0) < 100);
  const completed = courses.filter(c => (c.progress ?? 0) >= 100);

  const certificates = completed.filter(c => c.certificateStatus === 'ready');
  const recommended = inProgress.find((c) => (c.progress || 0) > 0) || inProgress[0];
  const badges = courses
    .filter(c => c.quizResult?.badge && c.quizResult.badge !== 'none')
    .map(c => ({
      course: c.subject?.name,
      score: c.quizResult.score,
      medal: c.quizResult.badge
    }));

  const pendingCourse = courses.find(c =>
    (c.completedChallenges?.length || 0) >= (c.totalChallenges || 0) &&
    (c.assignmentsCompleted) < (c.totalAssignments || 0) &&
    c.certificateStatus !== 'ready'
  );

  const readyCourse = courses.find(c => c.certificateStatus === 'ready');

  const medalColor = {
    gold: '#FACC15',   // amber-400
    silver: '#A3A3A3',   // zinc-400
    bronze: '#CD7F32'    // 🟤 bronze
  };

  const badgeCount = badges.length;

  return (
    <div className="min-h-screen bg-white text-[#1e293b] px-6 lg:px-20 py-14">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 flex flex-col md:flex-row items-center gap-10

    /* glass morphic panel */
    bg-white/80 backdrop-blur-lg
    border border-indigo-100/70
    shadow-2xl
    rounded-[2.5rem]

    /* fancy gradient edge light */
    relative overflow-hidden
  "
      >
        {/* decorative glow – completely optional */}
        <span className="
    pointer-events-none select-none
    absolute -inset-[150px] m-auto h-[300px] w-[300px]
    rounded-full bg-gradient-to-br from-indigo-400/20 to-transparent
    blur-[110px]
    md:left-auto md:right-10
  " />

        {/* avatar */}
        <div className="
      shrink-0
      w-32 h-32
      rounded-full grid place-content-center
      bg-gradient-to-br from-indigo-600 to-indigo-800
      text-white text-[2.6rem] font-extrabold
      shadow-lg ring-4 ring-white/40
    ">
          {initials}
        </div>

        {/* name / email */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-[2.5rem] leading-tight font-extrabold text-indigo-800">
            {user?.name}
          </h1>
          <p className="text-slate-600 text-lg mt-2">{user?.email}</p>
        </div>

        {/* live stats grid */}
        <div className="
      w-full md:w-auto
      grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6
      gap-3 sm:gap-4
    ">
          <Stat label="In Progress" value={inProgress.length} color="bg-amber-500" />
          <Stat label="Completed" value={completed.length} color="bg-emerald-600" />
          <Stat label="Certificates" value={certificates.length} color="bg-sky-600" />
          <Stat label="Badges" value={badgeCount} color="bg-gradient-to-br from-yellow-300 to-amber-600" />
          <Stat label="Streak" value={`${streakDays} day${streakDays !== 1 ? 's' : ''}`} color="bg-indigo-500" />
          <Stat label="Next Badge" value={nextBadge} color="bg-rose-500" />
        </div>
      </motion.div>

      <Section title="In-progress Courses" top>
        {inProgress.length === 0 ? (
          <Empty text="You have no courses in progress." />
        ) : (
          <CourseGrid data={inProgress} accent="#1e40af"
            openAlert={setAlert}
          />)}
      </Section>

      <Section title="Completed Courses">
        {completed.length === 0 ? (
          <Empty text="No courses completed yet." />
        ) : (
          <CourseGrid
            data={completed}
            accent="#16a34a"
            completed
            openAlert={setAlert}
          />)}
      </Section>

      {pendingCourse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 max-w-4xl mx-auto flex …"
        >          <span className="text-3xl">🎯</span>
          <p className="flex-1 text-sm sm:text-base text-amber-900">
            You’ve aced <b>all challenges</b> in
            <b className="mx-1">{pendingCourse.subject?.name}</b>.
            Submit the assignment(s) to unlock your certificate!
          </p>
          <button onClick={() =>
            navigate(`/course/${pendingCourse.subject?._id}#assignments`)}
            className="shrink-0 bg-amber-600 hover:bg-amber-700 …">
            Go&nbsp;to&nbsp;assignments
          </button>
        </motion.div>
      )}

      {/* ── green ‘certificate ready’ banner ────────────────────────────── */}
      {readyCourse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 max-w-4xl mx-auto flex items-center gap-4
               bg-emerald-50 border border-emerald-300/80 rounded-xl p-5 shadow"
        >
          <span className="text-3xl">🎉</span>
          <p className="flex-1 text-sm sm:text-base text-emerald-900">
            Congratulations! You’ve completed <b>all challenges &amp; assignments</b> in
            <b className="mx-1">{readyCourse.subject?.name}</b>.
            Your certificate is now ready to download.
          </p>
          <button
            onClick={() => navigate(
              `/certificate/${readyCourse.subject._id}`         // opens a new tab and avoids SPA routing clash
            )}
            className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-semibold">
            Download&nbsp;Certificate
          </button>
        </motion.div>
      )}

      {badges.length > 0 && (
        <Section title="Badges">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((b, idx) => (
              <motion.div key={`${b.course}-${b.medal}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: .4 }}
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
              >
                <FaMedal
                  size={48}
                  color={medalColor[b.medal]}
                  title={`${b.medal} medal`}
                  aria-label={`${b.medal} medal`}
                  className="shrink-0 drop-shadow-sm"
                />
                <div>
                  <p className="font-semibold text-slate-800 leading-tight">
                    {b.course}
                  </p>
                  <p className="text-sm text-slate-600">
                    Score&nbsp;
                    <span className="font-bold">{b.score}%</span>
                    &nbsp;•&nbsp;
                    <span
                      className="capitalize font-medium"
                      style={{ color: medalColor[b.medal] }}
                    >
                      {b.medal}
                    </span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* skills row  */}
      {completed.length > 0 && (
        <Section title="Skills Earned">
          <div className="flex flex-wrap gap-3">
            {completed.slice(0, 6).map(c => (
              <span
                key={c._id}
                className="
          flex items-center gap-1
          bg-indigo-50 text-indigo-700
          px-3 py-1.5
          rounded-full shadow-sm
          text-sm font-semibold
          hover:shadow-md hover:scale-[1.03] transition
        "
              >
                <svg className="w-3.5 h-3.5 fill-current opacity-70" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" />
                </svg>
                {c.subject?.name}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* recommended card */}
      {recommended && (
        <Section title="Resume Learning">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl bg-white border border-gray-200 rounded-xl shadow p-6 flex items-center gap-6"
          >
            {/* <HiOutlineLightningBolt className="text-4xl text-[#1e40af]" /> */}
            <div className="flex-1">
              <h4 className="text-lg font-bold text-[#1e40af]">
                {recommended.subject?.name}
              </h4>
              <p className="text-gray-600 text-sm">
                Continue from {recommended.progress || 0}% completed.
              </p>
            </div>
            <button
              onClick={() => navigate(`/course/${recommended.subject?._id}`)}
              className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white px-4 py-2 rounded text-sm font-semibold"
            >
              Resume
            </button>
          </motion.div>
        </Section>
      )}

      {/* Support card */}
      <section className="max-w-6xl mx-auto mt-20">
        {/* Background card */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-white bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800">
          <span className="absolute -top-16 -left-20 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h4 className="text-2xl font-extrabold mb-1">Need help?</h4>
            <p className="text-sm/relaxed text-white/90">
              Our mentors reply within&nbsp;<strong>&lt; 3&nbsp;h</strong>.
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="relative z-10 inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition"
          >
            <FaPaperPlane className="w-5 h-5" />
            Contact&nbsp;Support
          </button>
        </div>

        {/* Popup modal */}
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={() => !sending && setOpen(false)}
          >
            <form
              ref={formRef}
              onSubmit={handleSend}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white max-w-md w-full rounded-2xl p-8 space-y-4 shadow-xl"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <FaTimes className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-indigo-800 mb-2">
                Write to Code MultiVerse
              </h3>

              {successMsg && (
                <div className="text-green-700 bg-green-100 p-3 rounded-md text-sm">
                  {successMsg}
                </div>
              )}

              <input
                name="name"
                placeholder="Your name"
                required
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="w-full border rounded px-3 py-2"
              />
              <input
                name="subject"
                placeholder="Subject"
                defaultValue="Need Help with Code MultiVerse"
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                name="message"
                rows="4"
                placeholder="How can we help?"
                required
                className="w-full border rounded px-3 py-2"
              />

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-2 rounded font-semibold disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>
        )}
      </section>

      <LockAlert data={alert} onClose={() => setAlert(null)} />
      {showCertConfetti && (
        <Celebration onDone={() => setShowCertConfetti(false)} />
      )}
    </div>
  );
}

const Stat = ({ label, value, color }) => (
  <div className={`rounded-lg ${color} text-white py-3 px-4 text-center shadow`}>
    <div className="text-xl font-bold">{value}</div>
    <div className="text-xs font-semibold">{label}</div>
  </div>
);

const Section = ({ title, children, top = false }) => (
  <section className={`max-w-6xl mx-auto ${top ? 'mt-16' : 'mt-20'}`}>
    <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6">{title}</h2>
    {children}
  </section>
);

const Empty = ({ text }) => (
  <p className="text-gray-500 font-medium">{text}</p>
);

const CourseGrid = ({ data, accent, completed = false, openAlert }) => {
  const navigate = useNavigate();                     // ✔ we need the hook *here*

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((c) => {
        const canDownload = c.certificateStatus === 'ready';

        return (
          <motion.div
            key={c._id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm"
          >
            {/* --- title & description --------------------------------- */}
            <h4
              className={`font-semibold ${completed ? 'text-green-600' : 'text-[#1e40af]'
                } mb-1`}
            >
              {c.subject?.name}
            </h4>

            <p className="text-sm text-gray-600 mb-5">
              {c.subject?.description || 'No description'}
            </p>

            {/* --- progress ring -------------------------------------- */}
            <ProgressRing
              value={completed ? 100 : c.progress ?? 0}
              accent={
                completed
                  ? '#16a34a'
                  : c.quiz?.badge === 'gold'
                    ? '#d97706'
                    : c.quiz?.badge === 'silver'
                      ? '#6b7280'
                      : c.quiz?.badge === 'bronze'
                        ? '#b45309'
                        : accent
              }
              completed={completed}
            />

            {/* --- Certificate / locked button ------------------------ */}
            {completed && (
              <button
                onClick={() => {
                  if (canDownload) {
                    // open certificate IN THE SAME TAB
                    navigate(`/certificate/${c.subject._id}`);
                  } else {
                    // show “finish course first” modal
                    openAlert?.({ course: c.subject?.name });
                  }
                }}
                className={`mt-5 w-full py-2 text-sm font-semibold rounded ${canDownload
                  ? 'bg-[#1e40af] hover:bg-[#1e3a8a] text-white'
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-200 ring-1 ring-inset ring-gray-300'
                  }`}
              >
                Download&nbsp;Certificate
              </button>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

const ProgressRing = ({ value, accent, completed }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setDisplay(value), 150);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <CircularProgressbarWithChildren
      value={display}
      styles={buildStyles({
        pathTransitionDuration: 0.8,
        pathColor: accent,
        trailColor: '#e5e7eb',
        textColor: completed ? accent : '#1e293b',
      })}
    >
      <div className="text-sm font-semibold">{display.toFixed(0)}%</div>
    </CircularProgressbarWithChildren>
  );
};

function LockAlert({ data, onClose }) {
  if (!data) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: .9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: .9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="bg-white max-w-sm w-full rounded-2xl shadow-xl p-6 text-center"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-[#1e3a8a] mb-2">
          Finish the course first!
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          Complete all challenges & assignments in&nbsp;
          <span className="font-medium text-slate-800">
            {data.course}
          </span>{' '}
          to unlock your certificate.
        </p>
        <button
          onClick={onClose}
          className="mt-1.5 px-4 py-2 bg-[#1e40af] hover:bg-[#1e3a8a] text-white rounded font-semibold text-sm"
        >
          Got it
        </button>
      </motion.div>
    </motion.div>
  );
}