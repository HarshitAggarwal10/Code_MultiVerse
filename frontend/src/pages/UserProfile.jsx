import React, { useEffect, useState } from 'react';
import api from '../utils/api'; // axios instance with credentials
import SubjectCard from '../components/SubjectCard'; // Assuming you have a SubjectCard component

export default function UserProfile() {
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);

  useEffect(() => {
    const fetchEnrolledSubjects = async () => {
      try {
        const res = await api.get('/user-courses/my-courses', { withCredentials: true });
        setEnrolledSubjects(res.data);
      } catch (err) {
        console.error('Failed to fetch enrolled subjects:', err);
      }
    };

    fetchEnrolledSubjects();
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-4">My Enrolled Courses</h2>

      {enrolledSubjects.length === 0 ? (
        <p className="text-gray-400">You haven't enrolled in any course yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {enrolledSubjects.map((subject) => (
            <SubjectCard key={subject.subject._id} subject={{
              ...subject.subject,
              paymentStatus: subject.paymentStatus,
            }} />
          ))}
        </div>
      )}
    </div>
  );
}
