import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { motion, LayoutGroup } from 'framer-motion';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import Celebration from '../components/Celebration';
import { useNavigate } from 'react-router-dom';

const cx = (...c) => c.filter(Boolean).join(' ');

import {
  FaHtml5, FaCss3Alt, FaRoute, FaMobileAlt, FaTable,
  FaPalette, FaMagic, FaTools, FaChartLine, FaRocket,
  FaCheck,
  FaCheckCircle, FaMedal
} from 'react-icons/fa';
import { FaYoutube, FaGithub, FaBook, FaExternalLinkAlt } from 'react-icons/fa';
const ICONS = [FaHtml5, FaCss3Alt, FaRoute, FaMobileAlt, FaTable, FaPalette, FaMagic, FaTools, FaChartLine, FaRocket, FaCheck, FaCheckCircle];

export default function CourseDetails() {
  const { id } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [err, setErr] = useState(null);
  const [userCourse, setUserCourse] = useState(null);
  const navigate = useNavigate();

  /* quiz state */
  const [quizAns, setQuizAns] = useState({});
  const [quizRes, setQuizRes] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);

  /* code-challenge */
  const [code, setCode] = useState('// write JS here');
  const [testsOk, setTestsOk] = useState(null);

  /* assignment upload */
  const [zip, setZip] = useState(null);
  const [progress, setProgress] = useState(0);

  const refetchUserCourse = async () => {
    try {
      const { data } = await api.get('/user-courses/my-courses');
      const entry = data.find(e => (e.subject?._id || e.subject) === id);
      setUserCourse(entry);          // if you want to store it
      // you can also refresh progress / certificate banners here
    } catch (err) {
      console.error('Could not refresh user-course', err);
    }
  };

  useEffect(() => {
    setErr(null); setCourse(null);
    api.get(`/api/subjects/${id}`)
      .then(r => setCourse(r.data))
      .catch(() => setErr('Course not found'));

    if (currentUser) {
      api.get('/api/user-courses/my-courses').then(({ data }) => {
        const entry = data.find(e => e.subject?._id === id);
        if (entry) setProgress(entry.progress ?? 0);
      });
    }
  }, [id, currentUser]);

  if (err) return <div className="p-10 text-red-600">{err}</div>;
  if (!course) return <div className="p-10">Loading…</div>;

  const Empty = ({ text }) => <p className="text-gray-500 italic">{text}</p>;

  function Roadmap({ list = [] }) {
    if (!list.length) return <Empty text="Road-map not available." />;

    return (
      <div className="relative ml-4 pl-8 border-l-4 border-indigo-200">
        <span className="absolute -left-1 top-0 w-2 h-full bg-gradient-to-b from-indigo-400/70 to-indigo-100 rounded-full" />

        {list.map((s, i) => {
          const Icon = ICONS[i] || FaRoute;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .4, delay: i * .06 }}
              className="relative mb-10 flex items-start group"
            >
              {/* dot */}
              <span className="absolute -left-[39px] flex items-center justify-center w-8 h-8 rounded-full bg-white ring-4 ring-indigo-400 text-indigo-700 shadow group-hover:scale-110 transition">
                <Icon size={16} />
              </span>

              {/* card */}
              <div className="bg-indigo-50/60 backdrop-blur p-4 rounded-lg shadow hover:shadow-lg transition w-full">
                <h4 className="font-semibold text-indigo-800">{s.title}</h4>
                {s.sub && <p className="text-sm text-slate-700 mt-1">{s.sub}</p>}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  /* ---------- Content (only this component changed) ------------------------ */
  function Content({ topics = [], subjectId, onProgressChange = () => { } }) {
    const KEY = `progress:${subjectId}`;
    const [done, setDone] = React.useState([]);   // indices list
    const [loading, setLo] = React.useState(true);

    React.useEffect(() => {
      (async () => {
        try {
          const res = await api.get('/api/user-courses/my-courses');
          const entry = res.data.find(
            (e) => (e.subject?._id || e.subject) === subjectId
          );
          const serverDone = entry?.completedTopics ?? [];

          // ✅ Fresh users – reset local
          if (serverDone.length === 0) {
            localStorage.setItem(KEY, JSON.stringify([]));
            setDone([]);
            onProgressChange(0);
            return;
          }

          // ✅ Merge with local
          const localDone = JSON.parse(localStorage.getItem(KEY) || '[]');
          const merged = Array.from(new Set([...serverDone, ...localDone]));
          setDone(merged);

          // ✅ Sync missing local topics to server
          const unsynced = localDone.filter((i) => !serverDone.includes(i));
          for (const idx of unsynced) {
            await api.post(`/api/user-courses/progress/${subjectId}`, { topic: idx });
          }

          // ✅ Progress %
          const pct = Math.round((merged.length / topics.length) * 100);
          onProgressChange(pct);
          localStorage.setItem(KEY, JSON.stringify(merged));
        } catch (err) {
          console.error('Could not fetch progress', err);
        } finally {
          setLo(false);
        }
      })();
    }, [subjectId, topics.length, onProgressChange]);

    const markComplete = async (idx) => {
      if (done.includes(idx)) return;
      const updated = [...done, idx];
      setDone(updated);
      localStorage.setItem(KEY, JSON.stringify(updated));
      onProgressChange(Math.round((updated.length / topics.length) * 100));

      try {
        const { data } = await api.post(
          `/api/user-courses/progress/${subjectId}`,
          { topic: idx }
        );
        if (data?.progress) {
          onProgressChange(data.progress);
        }
      } catch (err) {
        console.error('Could not save progress', err);
      }
    };

    /* ---------------------------------------------------------------- */
    if (loading) return <p className="text-gray-500 italic">Loading…</p>;
    if (!topics.length) return <p className="text-gray-500 italic">No content yet.</p>;

    return (
      <Tab.Group defaultIndex={0}>
        {/* -------------- tab list (NO inner LayoutGroup) ------------------ */}
        <Tab.List className="flex flex-wrap gap-3 mb-8">
          {topics.map((t, i) => {
            const Icon = ICONS[i] || FaCheckCircle;
            const locked = i > 0 && !done.includes(i - 1);
            return (
              <Tab key={i} disabled={locked} className="relative">
                {({ selected }) => (
                  <div
                    className={cx(
                      'flex items-center gap-2 py-1.5 px-3 text-sm font-medium rounded-md transition',
                      locked && 'opacity-40 cursor-not-allowed',
                      !locked && (selected
                        ? 'text-indigo-900 bg-indigo-100 shadow'
                        : 'text-slate-600 hover:text-indigo-700')
                    )}
                  >
                    <Icon size={14} />
                    {t.title.split('·')[0]}
                    {done.includes(i) && <FaCheckCircle className="text-emerald-500" />}

                    {selected && !locked && (
                      <motion.span
                        layoutId={`topic-pill-${subjectId}`}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="absolute inset-0 -z-10 bg-indigo-50 rounded-md"
                      />
                    )}
                  </div>
                )}
              </Tab>
            );
          })}
        </Tab.List>

        {/* -------------- panels ------------------------------------------- */}
        <Tab.Panels>
          {topics.map((t, i) => {
            const locked = i > 0 && !done.includes(i - 1);
            return (
              <Tab.Panel key={i} className="focus:outline-none">
                {locked ? (
                  <div className="p-8 text-center text-slate-500">
                    🔒 Finish the previous lesson to unlock this one.
                  </div>
                ) : (
                  <LessonCard
                    topic={t}
                    isDone={done.includes(i)}
                    onComplete={() => markComplete(i)}
                  />
                )}
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    );
  }

  /* ---- single lesson ---- */
  function LessonCard({ topic, isDone, onComplete }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border border-gray-200 rounded-2xl overflow-hidden shadow"
      >
        <div className="p-6 space-y-5">
          <h3 className="text-xl font-bold text-indigo-800">{topic.title}</h3>

          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {topic.theory}
          </ReactMarkdown>

          {topic.codeExamples?.map((c, k) => (
            <pre
              key={k}
              className="bg-gray-900 text-white p-4 rounded-lg overflow-auto text-sm"
            ><code>{c}</code></pre>
          ))}

          {topic.videos?.map((v, k) => (
            <div key={k} className="relative w-full rounded-lg overflow-hidden"
              style={{ paddingTop: '52%' }}>
              <iframe src={v} title={`vid-${k}`}
                className="absolute inset-0 w-full h-full" />
            </div>
          ))}

          {!isDone && (
            <button
              onClick={onComplete}
              className="mt-4 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-semibold"
            >
              Mark lesson complete
            </button>
          )}

          {isDone && (
            <span className="inline-flex items-center gap-2 text-emerald-600 font-medium">
              <FaCheckCircle />&nbsp;Completed
            </span>
          )}
        </div>
      </motion.div>
    );
  }

  const getSourceMeta = (url) => {
    if (url.includes('youtube.com')) return { label: 'Video', icon: <FaYoutube className="text-red-500" /> };
    if (url.includes('github.com')) return { label: 'Repo', icon: <FaGithub className="text-gray-800" /> };
    if (url.includes('developer.mozilla.org')) return { label: 'Docs', icon: <FaBook className="text-indigo-700" /> };
    return { label: 'Link', icon: <FaExternalLinkAlt className="text-slate-600" /> };
  };

  const formatDomain = (url) => {
    try {
      const u = new URL(url);
      return u.hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const Sources = ({ items = [] }) => {
    if (!items.length) return <Empty text="No references yet." />;

    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((link, i) => {
          const meta = getSourceMeta(link);
          const domain = formatDomain(link);

          return (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noreferrer"
              className="group relative border border-gray-200 rounded-xl p-5 hover:shadow-lg bg-white transition-all hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all" />

              {/* icon and label */}
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="text-lg">{meta.icon}</div>
                <span className="text-sm font-semibold text-indigo-800">{meta.label}</span>
              </div>

              {/* link */}
              <div className="text-sm text-slate-700 font-medium relative z-10 break-all leading-relaxed">
                {link.length > 80 ? link.slice(0, 80) + '…' : link}
              </div>

              {/* domain tag */}
              <span className="mt-3 inline-block text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full relative z-10">
                {domain}
              </span>
            </a>
          );
        })}
      </div>
    );
  };

  function QuizSection({ subjectId, data = [] }) {
    if (!data.length) return <Empty text="Quiz not ready." />;

    const [answers, setAnswers] = React.useState({});     // { 0:'opt', 1:'opt', … }
    const [result, setResult] = React.useState(null);   // { score, correct[], badge }
    const [badge, setBadge] = React.useState(null);   // 'bronze' | 'silver' | 'gold'

    const medalUI = {
      gold: { label: 'Gold', color: '#FACC15' },   // amber-400
      silver: { label: 'Silver', color: '#A3A3A3' },   // zinc-400
      bronze: { label: 'Bronze', color: '#CD7F32' }    // custom brown
    };

    const pick = (qIdx, val) => setAnswers(prev => ({ ...prev, [qIdx]: val }));

    const submit = async () => {
      try {
        const body = { answers: data.map((_, i) => answers[i] ?? '') };
        const { data: res } = await api.post(
          `/user-courses/${subjectId}/submit`,
          body
        );
        setResult(res);
        if (res.badge && res.badge !== 'none') setBadge(res.badge);
      } catch (err) {
        console.error('Quiz submit failed', err);
      }
    };

    const allAnswered = Object.keys(answers).length === data.length;
    const isDone = !!result;

    return (
      <div className="relative space-y-8">

        {badge && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setBadge(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 cursor-pointer"
          >
            <motion.div
              initial={{ y: -30 }}
              animate={{ y: 0 }}
              className="bg-white rounded-3xl shadow-2xl px-16 py-12 flex flex-col items-center"
            >
              <FaMedal
                size={150}
                color={medalUI[badge].color}
                aria-label={`${medalUI[badge].label} badge earned`}
                title={`${medalUI[badge].label} badge earned`}
                className="drop-shadow-lg"
              />
              <h3 className="text-4xl font-bold text-indigo-700 mt-6 flex items-center gap-2">
                <span style={{ color: medalUI[badge].color }}>
                  {medalUI[badge].label}
                </span>
                <span className="text-indigo-900">Badge</span>
              </h3>
              <p className="mt-2 text-slate-700 text-lg font-medium">
                Your Score: <span className="font-bold">{result?.score}%</span>
              </p>
              <p className="text-slate-500 mt-3 text-sm">(Tap anywhere to close)</p>
            </motion.div>
          </motion.div>
        )}
        {data.map((q, qi) => {
          const correct = result?.correct[qi];
          return (
            <div
              key={qi}
              className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm"
            >
              <p className="font-semibold mb-4">
                {qi + 1}.&nbsp;{q.question}
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {q.options.map((opt, oi) => {
                  const selected = answers[qi] === opt;
                  const postClass =
                    !isDone ? ''
                      : opt === q.answer
                        ? 'ring-2 ring-emerald-500'
                        : selected && !correct
                          ? 'ring-2 ring-red-500'
                          : '';

                  return (
                    <motion.label
                      key={oi}
                      whileTap={{ scale: 0.97 }}
                      className={cx(
                        'flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer',
                        selected
                          ? 'bg-indigo-50 border-indigo-300'
                          : 'bg-gray-50 hover:bg-gray-100 border-transparent',
                        postClass
                      )}
                    >
                      <input
                        type="radio"
                        name={`q${qi}`}
                        value={opt}
                        className="accent-indigo-600 shrink-0"
                        checked={selected}
                        disabled={isDone}
                        onChange={() => pick(qi, opt)}
                      />
                      <span>{opt}</span>
                    </motion.label>
                  );
                })}
              </div>

              {isDone && (
                <p
                  className={cx(
                    'mt-3 font-medium',
                    correct ? 'text-emerald-600' : 'text-red-600'
                  )}
                >
                  {correct ? '✔ Correct' : `✖ Correct: ${q.answer}`}
                </p>
              )}
            </div>
          );
        })}

        {!isDone ? (
          <button
            disabled={!allAnswered}
            onClick={submit}
            className={cx(
              'block ml-auto bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold',
              !allAnswered && 'opacity-40 cursor-not-allowed'
            )}
          >
            Submit ({Object.keys(answers).length}/{data.length})
          </button>
        ) : (
          <p className="text-xl font-semibold text-center mt-8">
            🎉 Final Score: <span className="font-bold text-indigo-700">{result.score}%</span>
            {result.badge !== 'none' && (
              <>
                &nbsp;•&nbsp;
                <span className="capitalize font-bold" style={{ color: medalUI[result.badge].color }}>
                  {medalUI[result.badge].label} Badge
                </span>
              </>
            )}
          </p>
        )}
      </div>
    );
  }

  function ChallengeSection({ list = [], subjectId, onAllComplete = () => { } }) {
    if (!list.length) return <Empty text="No challenges yet." />;
    const [idx, setIdx] = React.useState(0);
    const chall = list[idx];
    const [code, setCode] = React.useState('');
    const [testsOk, setOk] = React.useState(null);
    const [output, setOut] = React.useState('');
    React.useEffect(() => {
      setCode(chall.starterCode || '');
      setOk(null);
      setOut('');
    }, [idx, chall]);

    const run = () => {
      setOut(`
     <style>${chall.starterCss || ''}</style>
     ${code}
   `);
      setOk(null);
    };

    const submit = async () => {
      if (!chall?._id) return alert('Challenge id missing.');
      setOk(null);
      try {
        const { data } = await api.post(`/challenges/${chall._id}/submit`, {
          code,
          css: chall.starterCss || '',
          subjectId
        });

        if (data.passed) {
          setOk(true);
          alert("All tests passed!");
          if (Number(data.totalDone) >= list.length) {
            onAllComplete();
          }
        } else {
          setOk(false);
          alert("❌ Some tests failed:\n" + data.hints.join('\n'));
        }

      } catch (e) {
        console.error(e);
        setOk(false);
        alert("An error occurred while submitting the challenge.");
      }
    };

    const editorOnChange = (val) => setCode(val ?? '');
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-indigo-800">
            Challenge&nbsp;{idx + 1} / {list.length}&nbsp;—&nbsp;{chall.title}
          </h4>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => (idx > 0) && setIdx(i => i - 1)}
              className="px-3 py-1 rounded text-sm bg-slate-200 disabled:opacity-40"
              disabled={idx === 0}>
              ◀ Prev
            </button>
            <button
              onClick={() => (idx < list.length - 1) && setIdx(i => i + 1)}
              className="px-3 py-1 rounded text-sm bg-slate-200 disabled:opacity-40"
              disabled={idx === list.length - 1}>
              Next ▶
            </button>
          </div>
        </div>
        <p className="text-slate-700">{chall.description}</p>
        <Editor
          key={chall._id}                 // ← this fixes the cursor bug
          height="300px"
          defaultLanguage="html"
          theme="vs-dark"
          value={code}
          onChange={val => setCode(val || '')}
          options={{ fontSize: 14, minimap: { enabled: false } }}
        />
        <div className="flex gap-4">
          <button
            onClick={run}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-1.5 rounded">
            ▶ Run
          </button>
          <button
            onClick={submit}
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-5 py-1.5 rounded">
            Submit
          </button>
        </div>
        {testsOk !== null && (
          <p className={testsOk ? 'text-emerald-600' : 'text-red-600 font-medium'}>
            {testsOk ? '🎉 All tests passed!' : '❌ Some tests failed'}
          </p>
        )}
        <iframe
          title="preview"
          className="w-full h-60 border rounded bg-white"
          sandbox=""
          srcDoc={output}
        />
      </div>
    );
  }

  function AssignmentSection({ list = [], subjectId, onDone = () => { } }) {
    if (!list.length) return <Empty text="No assignments yet." />;

    const [idx, setIdx] = useState(0);
    const [zip, setZip] = useState(null);
    const [status, setStatus] = useState(null);      // 'ok' | 'err'
    const [message, setMessage] = useState('');

    const assn = list[idx];

    const upload = async () => {
      if (!zip) return alert('Choose a .zip first');

      const requiredName =
        assn.expectedZipName ||
        `${assn.title.trim().toLowerCase().replace(/\s+/g, '-')}.zip`;

      if (zip.name.toLowerCase() !== requiredName.toLowerCase()) {
        setStatus('err');
        setMessage(`Zip must be named exactly "${requiredName}"`);
        return;
      }

      const fd = new FormData();
      fd.append('file', zip);

      try {
        const { data } = await api.post(`/assignments/${assn._id}/upload`, fd);

        setStatus('ok');
        setMessage(data.message);

        if (data.certificateReady) {
          onDone();                                   // refresh / show confetti
          alert('🎉 All assignments & challenges complete – certificate unlocked!');
          navigate(`/profile`);
        } else if (idx < list.length - 1) {
          // advance to next
          setIdx(i => i + 1);
          setZip(null);
          setStatus(null);
          setMessage('');
          alert('Nice! Next assignment unlocked.');
        }
      } catch (err) {
        setStatus('err');
        console.error('Upload failed', err);
        setMessage(err.response?.data?.error || 'Upload failed');
      }
    };

    return (
      <div className="space-y-5">
        <header className="flex items-center justify-between">
          <h4 className="font-bold text-indigo-800">
            Assignment {idx + 1} / {list.length} — {assn.title}
          </h4>
          <p className="text-sm text-slate-500">
            Due&nbsp;{new Date(assn.dueDate).toLocaleDateString()}
          </p>
        </header>

        <p>{assn.description}</p>

        <input
          type="file"
          accept=".zip"
          onChange={e => {
            setZip(e.target.files[0]);
            setStatus(null);
            setMessage('');
          }}
        />

        <button
          onClick={upload}
          disabled={!zip}
          className="bg-indigo-700 hover:bg-indigo-800 text-white px-5 py-1.5 rounded disabled:opacity-40"
        >
          Upload ZIP
        </button>

        {status && (
          <p className={status === 'ok' ? 'text-emerald-600' : 'text-red-600'}>
            {message}
          </p>
        )}
      </div>
    );
  }

  /* ----------------------------- tab config ------------------------------- */
  const tabs = [
    { name: 'Road-map', comp: <Roadmap list={course.roadmap} /> },
    {
      name: 'Content',
      comp: <Content
        topics={course.topics}
        subjectId={course._id}
        onProgressChange={setProgress}
      />
    },
    { name: 'Sources', comp: <Sources items={course.sources} /> },
    { name: 'Quiz', comp: <QuizSection data={course.quiz} subjectId={course._id} /> },
    {
      name: 'Challenges',
      comp: (
        <ChallengeSection
          list={course.challenges}
          subjectId={course._id}
          onAllComplete={() => setShowCongrats(true)}
          totalChallenges={course.challenges.length}
        />
      )
    },
    {
      name: 'Assignments',
      comp: (
        <AssignmentSection
          list={course.assignments}
          subjectId={course._id}
          onDone={refetchUserCourse}     // ← no arrow needed
        />
      )
    }
  ];

  /* ------------------------------ render ---------------------------------- */
  return (
    <div className="min-h-screen bg-white text-slate-800 px-6 lg:px-20 py-14 font-inter">
      {/* HERO ---------------------------------------------------------------- */}
      <header className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 mb-16">
        {course.imageUrl && (
          <img src={course.imageUrl}
            className="w-full lg:w-[68%] h-80 lg:h-[28rem] object-cover rounded-3xl shadow-xl"
            alt={course.name} />
        )}

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-indigo-800 mb-5">{course.name}</h1>
          <p className="text-md lg:text-md text-slate-600 leading-relaxed mb-6">{course.description}</p>

          <div className="flex items-center gap-6 mb-6">
            <p className="text-2xl font-bold text-emerald-600">₹{course.price}</p>
            {course.reviews && (
              <p className="flex items-center gap-1 text-amber-500 font-semibold">
                ★ {course.reviews}
              </p>
            )}
          </div>

          {currentUser && (
            <div className="text-sm sm:text-base space-y-0.5">
              <p className="font-medium">Enrolled as&nbsp;
                <span className="font-semibold">{currentUser.name}</span></p>
              <p className="text-slate-500">{currentUser.email}</p>

              {progress > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="h-2 w-40 bg-gray-200 rounded-full overflow-hidden">
                    <span className="block h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                  </span>
                  <span className="text-sm font-medium text-slate-700">{progress}% complete</span>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* TABS ---------------------------------------------------------------- */}
      <Tab.Group>
        <LayoutGroup id="course-tabs">
          {/* tab buttons */}
          <Tab.List className="relative flex flex-wrap gap-3 lg:gap-5 mb-10
                               max-w-full overflow-x-auto pb-3 border-b border-gray-200">
            {tabs.map((t) => (
              <Tab key={t.name} className="relative">
                {({ selected }) => (
                  <div className={cx(
                    'py-2 px-4 text-sm lg:text-base font-semibold rounded-md transition',
                    selected ? 'text-indigo-800' : 'text-slate-500 hover:text-indigo-700'
                  )}>
                    {t.name}
                    {selected && (
                      <motion.span layoutId="tab-pill"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        className="absolute inset-0 -z-10 bg-indigo-100 rounded-md shadow-inner" />
                    )}
                  </div>
                )}
              </Tab>
            ))}
          </Tab.List>
        </LayoutGroup>

        {/* panels */}
        <Tab.Panels as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .4 }}
          className="max-w-6xl mx-auto">
          {tabs.map(t => (
            <Tab.Panel key={t.name} className="focus:outline-none">
              <motion.div initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .35 }}>
                {t.comp}
              </motion.div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      {showCongrats && <Celebration onDone={() => setShowCongrats(false)} />}
    </div>
  );
}
