import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const res = await axios.get("/users/profile");
        setMyCourses(res.data.enrolledCourses || []);
      } catch (err) {
        console.error("Failed to load enrolled courses", err);
      }
    };

    fetchEnrolled();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">My Enrolled Courses</h1>
      <div className="grid gap-4">
        {myCourses.map((course) => (
          <div key={course.subjectId} className="bg-white/10 p-4 rounded">
            <h2 className="text-lg font-semibold">{course.subjectName}</h2>
            <p className="text-sm text-gray-400">Payment: {course.paymentStatus}</p>
            <p className="text-sm mt-2">Progress: {course.progress || 0}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
