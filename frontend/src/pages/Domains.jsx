// src/pages/Domains.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Tech3DScene from "../components/Model";
import loadRazorpay from "../utils/loadRazorpay";

const RZP_KEY = "rzp_test_DHyKCkAB21NWFU";       // ← keep your key here

export default function Domains() {
  const [domains, setDomains] = useState([]);
  const [subjectsByDomain, setSubjectsByDomain] = useState({});
  const [enrolledSubjects, setEnrolledSubjects] = useState({});
  const navigate = useNavigate();

  /* ───────────────────────── fetch domains / subjects / enrollments ───── */
  useEffect(() => {
    const fetchAll = async () => {
      try {
        /* ① domains */
        const { data: domainList } = await api.get("/api/domains");
        setDomains(domainList);

        /* ② subjects for each domain (in parallel) */
        const subjectPromises = domainList.map((d) =>
          api.get(`/subjects/by-domain/${d._id}`)
        );
        const subjectResults = await Promise.all(subjectPromises);
        const byDomain = {};
        subjectResults.forEach((res, idx) => {
          byDomain[domainList[idx]._id] = res.data;
        });
        setSubjectsByDomain(byDomain);

        /* ③ my courses → keep payment + certificate status */
        const { data: myCourses } = await api.get("/user-courses/my-courses", {
          withCredentials: true,
        });

        const map = {};
        myCourses.forEach((c) => {
          if (c.subject?._id) {
            map[c.subject._id.toString()] = {
              paymentStatus: c.paymentStatus,           // "pending" | "paid"
              certificateStatus: c.certificateStatus,   // "none" | "ready"
            };
          }
        });
        setEnrolledSubjects(map);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAll();
  }, []);

  /* ────────────────────────────── helpers ─────────────────────────────── */
  const getDomainName = (domainId) =>
    domains.find((d) => d._id === domainId)?.name ?? "Unknown Domain";

  const handleEnrollClick = async (subjectId) => {
    try {
      await api.post("/user-courses/enroll", { subjectId });
      setEnrolledSubjects((p) => ({
        ...p,
        [subjectId]: { paymentStatus: "pending", certificateStatus: "none" },
      }));
    } catch (err) {
      if (err.response?.data?.message === "Already enrolled") {
        setEnrolledSubjects((p) => ({
          ...p,
          [subjectId]: { paymentStatus: "paid", certificateStatus: "none" },
        }));
      }
      console.error("Enrollment error:", err?.response?.data || err);
    }
  };

  const handlePaymentClick = async (subject) => {
    const ok = await loadRazorpay();
    if (!ok) return alert("Failed to load Razorpay – check connection");

    try {
      const { data: order } = await api.post("/user-courses/create-order", {
        amount: subject.price,
      });

      const rzp = new window.Razorpay({
        key: RZP_KEY,
        name: "Code MultiVerse",
        description: "Course Purchase",
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        theme: { color: "#6366f1" },
        handler: async (resp) => {
          await api.post("/user-courses/pay", {
            subjectId: subject._id,
            razorpayPaymentId: resp.razorpay_payment_id,
            razorpayOrderId: resp.razorpay_order_id,
            razorpaySignature: resp.razorpay_signature,
          });

          alert("Payment successful!");
          setEnrolledSubjects((p) => ({
            ...p,
            [subject._id]: { paymentStatus: "paid", certificateStatus: "none" },
          }));
        },
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    }
  };

  const handleContinueClick = (subjectId) => navigate(`/course/${subjectId}`);

  /* ────────────────────────────── UI ──────────────────────────────────── */
  return (
    <>
      {/* ----------------------------------------------------------------- */}
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Tech3DScene />
        </div>
        <div className="z-20 px-6 absolute text-center max-w-3xl">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl">
            Explore Domains & Subjects
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Discover immersive tech in CodeMultiVerse — AI, Web, DevOps & more.
          </p>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      <div className="px-6 py-12 max-w-7xl mx-auto">
        {domains.map((domain) => (
          <div key={domain._id} className="mb-16">
            <h2 className="text-4xl font-extrabold text-cyan-400 mb-6 border-b border-gray-600 pb-2">
              🚀 {domain.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {(subjectsByDomain[domain._id] || []).map((subj) => {
                const status = enrolledSubjects[subj._id] || {};
                const isCompleted = status.certificateStatus === "ready";
                const paymentStatus = status.paymentStatus;

                return (
                  <div
                    key={subj._id}
                    className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]
                               text-white rounded-xl overflow-hidden shadow-lg
                               transform transition duration-500 hover:scale-[1.02]"
                  >
                    {/* optional corner badge */}
                    {isCompleted && (
                      <span className="absolute top-2 right-2 bg-green-600 text-xs font-bold px-2 py-1 rounded">
                        Completed
                      </span>
                    )}

                    <img
                      src={
                        subj.imageUrl ||
                        `https://source.unsplash.com/400x250/?${subj.name},technology`
                      }
                      alt={subj.name}
                      className="w-full h-44 object-cover"
                    />

                    <div className="p-5">
                      <h3 className="text-2xl font-bold text-cyan-300">
                        {subj.name}
                      </h3>
                      <p className="text-sm text-gray-300 mb-2">
                        {subj.description || "No description provided."}
                      </p>
                      <p className="text-sm text-gray-400 italic mb-2">
                        📁 Domain: {getDomainName(subj.domain)}
                      </p>
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-yellow-400">
                          ⭐ {subj.reviews || "4.8/5"}
                        </span>
                        <span className="text-green-300">₹{subj.price}</span>
                      </div>

                      {/* ---------------- Button section ---------------- */}
                      {/* ---------------- Button section ---------------- */}
                      {isCompleted ? (
                        <button
                          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                          onClick={() => handleContinueClick(subj._id)}
                        >
                          View Course
                        </button>
                      ) : paymentStatus === "paid" ? (
                        <button
                          className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg"
                          onClick={() => handleContinueClick(subj._id)}
                        >
                          Continue Learning
                        </button>
                      ) : paymentStatus === "pending" ? (
                        <button
                          className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
                          onClick={() => handlePaymentClick(subj)}
                        >
                          Complete Payment
                        </button>
                      ) : (
                        <button
                          className="mt-4 w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg"
                          onClick={() => handleEnrollClick(subj._id)}
                        >
                          Enroll Now
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {subjectsByDomain[domain._id]?.length === 0 && (
              <p className="text-gray-400 italic mt-4">
                No subjects available yet.
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
