import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/subjects/${id}`);
        setCourse(res.data);

        const userRes = await axios.get("/users/profile");
        const isEnrolled = userRes.data.enrolledCourses?.some(c => c.subjectId === id && c.paymentStatus === "Paid");
        setEnrolled(isEnrolled);
      } catch (err) {
        console.error("Error fetching course", err);
      }
    };

    fetchCourse();
  }, [id]);

  const handlePayment = async () => {
    try {
      const res = await axios.post(`/users/enroll/${id}`);
      alert("Payment successful! Course unlocked.");
      setEnrolled(true);
    } catch (err) {
      alert("Payment failed.");
    }
  };

  if (!course) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
      <p className="mb-4 text-gray-300">{course.description}</p>
      <p className="text-green-400 text-lg font-bold mb-6">₹{course.price}</p>

      {!enrolled ? (
        <button
          onClick={handlePayment}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded text-white font-semibold"
        >
          Enroll Now
        </button>
      ) : (
        <div className="bg-white/10 p-4 rounded mt-4">
          <h2 className="text-xl font-semibold mb-2">Course Resources</h2>
          <ul className="list-disc pl-6 text-sm space-y-1">
            {course.resources?.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
