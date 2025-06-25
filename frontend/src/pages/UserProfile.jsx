import React, { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [hoursWatched, setHrs] = useState(0);
  const navigate = useNavigate();

  /* fetch once */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/user-courses/my-courses');
        setCourses(res.data || []);

        // simple hours aggregate
        const hrs = (res.data || []).reduce(
          (sum, c) => sum + (c.progressMinutes || 0) / 60,
          0,
        );
        setHrs(Math.round(hrs));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  /* helpers */
  const initials =
    user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase() || 'U';
  const inProgress = courses.filter(c => (c.progress ?? 0) < 100);
  const completed = courses.filter(c => (c.progress ?? 0) >= 100);

  /* recommended: first incomplete course > 0 % */
  const recommended =
    inProgress.find((c) => (c.progress || 0) > 0) || inProgress[0];

  /* ─────────────────────────────────── layout */
  return (
    <div className="min-h-screen bg-white text-[#1e293b] px-6 lg:px-20 py-14">
      {/* header card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow p-8 flex flex-col md:flex-row items-center gap-8"
      >
        {/* avatar */}
        <div className="w-24 h-24 rounded-full bg-[#1e40af] text-white flex items-center justify-center text-3xl font-extrabold">
          {initials}
        </div>

        {/* details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-[#1e3a8a]">{user?.name}</h1>
          <p className="text-gray-600 font-medium">{user?.email}</p>
        </div>

        {/* quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
          <Stat label="In-Progress" value={inProgress.length} color="bg-amber-500" />
          <Stat label="Completed" value={completed.length} color="bg-emerald-600" />
          <Stat label="Certificates" value={completed.length} color="bg-sky-600" />
          <Stat label="Hours" value={hoursWatched} color="bg-indigo-600" />
        </div>
      </motion.div>

      {/* in-progress */}
      <Section title="In-progress Courses" top>
        {inProgress.length === 0 ? (
          <Empty text="You have no courses in progress." />
        ) : (
          <CourseGrid data={inProgress} accent="#1e40af" />
        )}
      </Section>

      {/* completed */}
      <Section title="Completed Courses">
        {completed.length === 0 ? (
          <Empty text="No courses completed yet." />
        ) : (
          <CourseGrid data={completed} accent="#16a34a" completed />
        )}
      </Section>

      {/* Goals row */}
      <Section title="Learning Goals">
        <div className="grid sm:grid-cols-3 gap-4">
          {['Finish 2 courses', 'Earn 500 XP', 'Submit 3 assignments'].map(g => (
            <div key={g} className="border border-gray-200 rounded-lg p-4 bg-white flex items-center gap-3">
              <HiOutlineLightningBolt className="text-[#1e40af] text-xl" />
              <span className="font-semibold text-sm">{g}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* skills row  */}
      {completed.length > 0 && (
        <Section title="Skills Earned">
          <div className="flex flex-wrap gap-3">
            {completed.slice(0, 6).map((c) => (
              <span
                key={c._id}
                className="bg-[#1e40af]/10 text-[#1e40af] font-semibold text-sm px-3 py-1 rounded-full"
              >
                {c.subject?.name.split(' ')[0]}
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
        <div className="bg-[#1e40af] text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h4 className="text-lg font-bold">Need help?</h4>
            <p className="text-sm opacity-90">Mentors respond in &lt;3 h.</p>
          </div>
          <a
            href="mailto:support@codemultiverse.com"
            className="bg-white text-[#1e40af] font-semibold px-4 py-2 rounded"
          >
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}

/* ── small composables ─────────────────────────────────────────── */
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

const CourseGrid = ({ data, accent, completed = false }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {data.map((c) => (
      <motion.div
        key={c._id}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm"
      >
        <h4
          className={`font-semibold ${completed ? 'text-green-600' : 'text-[#1e40af]'
            } mb-1`}
        >
          {c.subject?.name}
        </h4>
        <p className="text-sm text-gray-600 mb-5">
          {c.subject?.description || 'No description'}
        </p>

        {/* animated ring */}
        <ProgressRing
          value={completed ? 100 : (c.progress ?? 0)}
          accent={completed
            ? '#16a34a'
            : (c.quiz?.badge === 'gold' ? '#d97706' :
              c.quiz?.badge === 'silver' ? '#6b7280' :
                c.quiz?.badge === 'bronze' ? '#b45309' : accent)} completed={completed}
        />
        {completed && (
          <button
            onClick={() =>
              window.open(`/certificate/download/${c.subject._id}`, '_blank')
            }
            className="mt-5 w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white text-sm py-2 rounded font-semibold"
          >
            Download Certificate
          </button>
        )}
      </motion.div>
    ))}
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
