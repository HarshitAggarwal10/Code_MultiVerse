import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Tech3DScene from "../components/Model";
import loadRazorpay from '../utils/loadRazorpay';

export default function Domains() {
  const [domains, setDomains] = useState([]);
  const [subjectsByDomain, setSubjectsByDomain] = useState({});
  const [enrolledSubjects, setEnrolledSubjects] = useState({});
  const navigate = useNavigate();
  const RZP_KEY = 'rzp_test_DHyKCkAB21NWFU';

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const domainRes = await api.get('/domains');
        setDomains(domainRes.data);

        const newSubjects = {};
        for (let domain of domainRes.data) {
          const res = await api.get(`/subjects/by-domain/${domain._id}`);
          newSubjects[domain._id] = res.data;
        }
        setSubjectsByDomain(newSubjects);

        const myCoursesRes = await api.get('/user-courses/my-courses');
        const enrolledMap = {};
        myCoursesRes.data.forEach(course => {
          if (course.subject && course.subject._id) {
            enrolledMap[course.subject._id.toString()] = course.paymentStatus;
          }
        });
        setEnrolledSubjects(enrolledMap);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchAll();
  }, []);

  const getDomainName = (domainId) => {
    const domain = domains.find(d => d._id === domainId);
    return domain?.name || "Unknown Domain";
  };

  const handleEnrollClick = async (subjectId) => {
    try {
      await api.post('/user-courses/enroll', { subjectId });
      console.log("Enroll clicked:", subjectId);
      setEnrolledSubjects(prev => ({ ...prev, [subjectId]: "pending" }));
    } catch (err) {
      if (err.response?.data?.message === "Already enrolled") {
        setEnrolledSubjects(prev => ({ ...prev, [subjectId]: "paid" })); // fallback if already enrolled
      }
      console.error("Enrollment error:", err?.response?.data || err);
    }
  };

  const handlePaymentClick = async (subject) => {
    const subjectId = subject._id;
    const amount = subject.price;                  // ₹

    // ① ensure script is present
    const ok = await loadRazorpay();
    if (!ok) {
      alert('Failed to load Razorpay – please check your connection');
      return;
    }

    try {
      // ② create Razorpay order on the server
      const { data: order } = await api.post(
        '/user-courses/create-order',
        { amount }                       // server multiplies by 100
      );

      // ③ open Razorpay checkout
      const rzp = new window.Razorpay({
        key: RZP_KEY,
        name: 'Code MultiVerse',
        description: 'Course Purchase',
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        theme: { color: '#6366f1' },
        handler: async (resp) => {
          /* ④ tell backend the payment succeeded */
          await api.post('/user-courses/pay', {
            subjectId,
            razorpayPaymentId: resp.razorpay_payment_id,
            razorpayOrderId: resp.razorpay_order_id,
            razorpaySignature: resp.razorpay_signature
          });

          alert('✅ Payment successful!');
          setEnrolledSubjects(prev => ({ ...prev, [subjectId]: 'paid' }));
        }
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert('❌ Payment failed. Try again.');
    }
  };

  const handleContinueClick = (subjectId) => {
    navigate(`/course/${subjectId}`);
  };

  return (
    <>
      {/* Header Scene */}
      <div className="relative w-full h-screen bg-black flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0"><Tech3DScene /></div>
        <div className="z-20 px-6 absolute text-center max-w-3xl">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl">
            Explore Domains & Subjects
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Discover immersive tech in CodeMultiVerse — AI, Web, DevOps & more.
          </p>
        </div>
      </div>

      {/* Domain and Subjects */}
      <div className="px-6 py-12 max-w-7xl mx-auto">
        {domains.map((domain) => (
          <div key={domain._id} className="mb-16">
            <h2 className="text-4xl font-extrabold text-cyan-400 mb-6 border-b border-gray-600 pb-2">
              🚀 {domain.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {(subjectsByDomain[domain._id] || []).map((subject) => {
                const paymentStatus = enrolledSubjects[subject._id];

                return (
                  <div
                    key={subject._id}
                    className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white rounded-xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-[1.02]"
                  >
                    <img
                      src={subject.imageUrl || `https://source.unsplash.com/400x250/?${subject.name},technology`}
                      alt={subject.name}
                      className="w-full h-44 object-cover"
                    />
                    <div className="p-5">
                      <h3 className="text-2xl font-bold text-cyan-300">{subject.name}</h3>
                      <p className="text-sm text-gray-300 mb-2">{subject.description || "No description provided."}</p>
                      <p className="text-sm text-gray-400 italic mb-2">
                        📁 Domain: {getDomainName(subject.domain)}
                      </p>
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-yellow-400">⭐ {subject.reviews || "4.8/5"}</span>
                        <span className="text-green-300">₹{subject.price}</span>
                      </div>

                      {paymentStatus === "paid" ? (
                        <button
                          className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg"
                          onClick={() => handleContinueClick(subject._id)}
                        >
                          Continue Learning
                        </button>
                      ) : paymentStatus === "pending" ? (
                        <button
                          className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
                          onClick={() => handlePaymentClick(subject)}
                        >
                          Complete Payment
                        </button>
                      ) : (
                        <button
                          className="mt-4 w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg"
                          onClick={() => handleEnrollClick(subject._id)}
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
              <p className="text-gray-400 italic mt-4">No subjects available yet.</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
