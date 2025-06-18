import { useNavigate } from 'react-router-dom';

export default function SubjectCard({ subject }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (subject.paymentStatus === 'paid') {
      navigate(`/course/${subject._id}`);
    } else {
      navigate(`/course/${subject._id}?pay=true`);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-700">
      {/* You can make image dynamic if stored in DB */}
      <img
        src={subject.imageUrl || "https://source.unsplash.com/400x250/?technology,code"}
        alt={subject.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{subject.name}</h3>
        <p className="text-gray-300 text-sm mb-2">{subject.description}</p>
        <p className="text-indigo-400 font-semibold">Price: ₹{subject.price}</p>
        <p className="text-sm text-yellow-400 mb-3">⭐ {subject.reviews || "4.7/5"}</p>
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          onClick={handleClick}
        >
          {subject.paymentStatus === 'paid' ? 'Continue Learning' : 'Enroll Now'}
        </button>
      </div>
    </div>
  );
}
