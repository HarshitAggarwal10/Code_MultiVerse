import { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaMedal } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { differenceInCalendarDays, eachDayOfInterval, formatISO } from 'date-fns';

export default function UserProfile() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [alert, setAlert] = useState(null);
  const [streakDays, setStreakDays] = useState(0);     // e.g. 5
  const [nextBadge, setNextBadge] = useState('N/A');
  const navigate = useNavigate();

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

  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase() || 'U';
  const inProgress = courses.filter(c => (c.progress ?? 0) < 100);
  const completed = courses.filter(c => (c.progress ?? 0) >= 100);

  const certificates = completed.filter(c => c.challengesCompleted && c.assignmentsCompleted
  );
  const recommended = inProgress.find((c) => (c.progress || 0) > 0) || inProgress[0];
  const badges = courses
    .filter(c => c.quizResult?.badge && c.quizResult.badge !== 'none')
    .map(c => ({
      course: c.subject?.name,
      score: c.quizResult.score,
      medal: c.quizResult.badge          // gold | silver | bronze
    }));

  /* ───────────────────────────────────────────────────────────────
   Show yellow banner only when: every challenge is done but
    at least one assignment is still pending for that course.
  ──────────────────────────────────────────────────────────────── */
  const bannerCourse = courses.find(c =>
    (c.completedChallenges?.length || 0) >= (c.totalChallenges || 0) &&
    (c.assignmentsCompleted || 0) < (c.totalAssignments || 0)
  );

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

      {bannerCourse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 max-w-4xl mx-auto flex items-center gap-4
               bg-amber-50 border border-amber-300/80 rounded-xl p-5 shadow"
        >
          <span className="text-3xl">🎉</span>
          <p className="flex-1 text-sm sm:text-base text-amber-900">
            You’ve smashed <b>all challenges</b> in
            <b className="mx-1">{bannerCourse.subject?.name}</b>.
            Submit the assignment(s) to unlock your certificate!
          </p>
          <button
            onClick={() => navigate(`/course/${bannerCourse.subject?._id}#assignments`)}
            className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white
                 px-4 py-2 rounded-md text-sm font-semibold"
          >
            Go&nbsp;to&nbsp;assignments
          </button>
        </motion.div>
      )}

      {badges.length > 0 && (
        <Section title="Badges">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map(b => (
              <motion.div key={`${b.course}-${b.medal}`}
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
            <HiOutlineLightningBolt className="text-4xl text-[#1e40af]" />
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
        <div className="
      relative overflow-hidden
      rounded-3xl shadow-xl
      p-8 sm:p-12
      flex flex-col sm:flex-row items-center justify-between gap-6
      text-white
      bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800
  ">
          {/* decorative burst */}
          <span className="absolute -top-16 -left-20 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h4 className="text-2xl font-extrabold mb-1">Need help?</h4>
            <p className="text-sm/relaxed text-white/90">
              Our mentors reply within&nbsp;<strong>&lt; 3&nbsp;h</strong>.
            </p>
          </div>

          <a
            href="mailto:support@codemultiverse.com"
            className="
        relative z-10
        inline-flex items-center gap-2
        bg-white text-indigo-700 font-semibold
        px-5 py-2.5 rounded-full
        shadow-md hover:shadow-lg
        transition
      "
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 4h20v16H2z" opacity=".1" />
              <path d="M22 6.6V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2.6l10 6.3 10-6.3ZM22 9.4l-10 6.3-10-6.3V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9.4Z" />
            </svg>
            Contact&nbsp;Support
          </a>
        </div>
      </section>
      <LockAlert data={alert} onClose={() => setAlert(null)} />
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

const CourseGrid = ({ data, accent, completed = false, openAlert }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {data.map((c) => {                        /*  ← curly brace added       */
      /* ────────── per-course derived state ────────── */
      const doneChallenges =
        (c.completedChallenges?.length || 0) >= (c.totalChallenges || 0);
      const doneAssignments =
        (c.assignmentsCompleted || 0) >= (c.totalAssignments || 0);
      const canDownload = doneChallenges && doneAssignments;

      return (                                   /*  ← return added          */
        <motion.div
          key={c._id}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .4 }}
          className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm"
        >
          <h4 className={`font-semibold ${completed ? 'text-green-600' : 'text-[#1e40af]'
            } mb-1`}>
            {c.subject?.name}
          </h4>

          <p className="text-sm text-gray-600 mb-5">
            {c.subject?.description || 'No description'}
          </p>

          {/* progress ring */}
          <ProgressRing
            value={completed ? 100 : (c.progress ?? 0)}
            accent={
              completed ? '#16a34a'
                : c.quiz?.badge === 'gold' ? '#d97706'
                  : c.quiz?.badge === 'silver' ? '#6b7280'
                    : c.quiz?.badge === 'bronze' ? '#b45309'
                      : accent
            }
            completed={completed}
          />

          {/* certificate button */}
          {completed && (
            <button
              onClick={() => {
                if (canDownload) {
                  window.open(`/certificate/download/${c.subject._id}`, '_blank');
                } else {
                  openAlert?.({ course: c.subject?.name });
                }
              }}
              className={`mt-5 w-full py-2 text-sm font-semibold rounded
                ${canDownload
                  ? 'bg-[#1e40af] hover:bg-[#1e3a8a] text-white'
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-200 ring-1 ring-inset ring-gray-300'
                }`}
            >
              Download Certificate
            </button>
          )}
        </motion.div>
      );
    })}
  </div>
);

const ProgressRing = ({ value, accent, completed }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setDisplay(value), 200); // start fill after mount
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <CircularProgressbarWithChildren
      value={display}
      styles={buildStyles({
        pathTransitionDuration: 0.8,
        pathColor: accent,
        textColor: completed ? accent : '#1e293b',
        trailColor: '#e5e7eb',
      })}
    >
      <div className="text-sm font-semibold">
        {display.toFixed(0)}%
      </div>
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