import { useParams } from "react-router-dom";
import { FaStar, FaRegCheckCircle } from "react-icons/fa";
import {
  FaVideo,
  FaFileAlt,
  FaDownload,
  FaInfinity,
  FaMobileAlt,
  FaTasks,
  FaCertificate,
} from "react-icons/fa";
import { courses } from "../data/courseData";
import back1 from "../images/back1.jpg";

export default function CourseCard() {
  const { slug } = useParams();
  const course = courses.find((c) => c.id === slug);

  if (!course) {
    return (
      <div className="text-center py-20 text-red-600 text-xl font-semibold">
        Course Not Found!
      </div>
    );
  }

  const formattedOverview = course.overview.split("\n\n").map((para, index) => (
    <p key={index} className="mb-4">
      {para}
    </p>
  ));

  const iconMap = {
    videos: <FaVideo className="text-[#1e3a8a] mr-2" />,
    articles: <FaFileAlt className="text-[#1e3a8a] mr-2" />,
    downloadable: <FaDownload className="text-[#1e3a8a] mr-2" />,
    lifetime: <FaInfinity className="text-[#1e3a8a] mr-2" />,
    mobile: <FaMobileAlt className="text-[#1e3a8a] mr-2" />,
    assignments: <FaTasks className="text-[#1e3a8a] mr-2" />,
    certificate: <FaCertificate className="text-[#1e3a8a] mr-2" />,
  };

  const getIconForInclude = (item) => {
    const lower = item.toLowerCase();
    if (lower.includes("video")) return iconMap.videos;
    if (lower.includes("article")) return iconMap.articles;
    if (lower.includes("download")) return iconMap.downloadable;
    if (lower.includes("lifetime")) return iconMap.lifetime;
    if (lower.includes("mobile")) return iconMap.mobile;
    if (lower.includes("assignment")) return iconMap.assignments;
    if (lower.includes("certificate")) return iconMap.certificate;
    return <FaRegCheckCircle className="text-[#1e3a8a] mr-2" />;
  };

  return (
    <>
      <section
        id="about-home"
        className="w-full h-[85vh] bg-cover bg-center flex flex-col justify-center items-center text-center pt-10"
        style={{
          backgroundImage: `linear-gradient(rgba(25, 0, 60, 0.6), rgba(0, 0, 70, 0.7)), url(${back1})`,
        }}
      >
        <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wide drop-shadow-md">
          Enroll in Courses and Skill Up
        </h2>
      </section>

      <section className="w-full py-12 px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-3">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-[70vh] object-cover rounded-xl shadow-md mb-6"
            />

            <div className="flex justify-between items-start mb-6 flex-col md:flex-row">
              <div className="w-full pr-4">
                <h2 className="text-3xl font-bold text-[#1e3a8a] mb-2">{course.title}</h2>
                <div className="flex text-yellow-400">
                  {Array.from({ length: course.rating }, (_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-gray-600 mt-4 text-lg leading-relaxed">{course.description}</p>
              </div>
              <span className="bg-[#1e3a8a] text-white text-lg font-bold px-5 py-3 rounded-xl shadow-md mt-6 md:mt-0">
                {course.price}
              </span>
            </div>

            <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#1e3a8a]">Instructor</h3>
              <div className="flex items-center gap-4">
                <img
                  src={course.instructor.image}
                  alt={course.instructor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#1e3a8a]"
                />
                <div>
                  <h5 className="font-semibold text-lg text-gray-800">
                    {course.instructor.name}
                  </h5>
                  <p className="text-sm text-gray-600">{course.instructor.role}</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4 text-[#1e3a8a]">Course Overview</h3>
              <div className="text-gray-700 leading-relaxed text-base bg-white p-5 rounded-xl shadow-md">
                {formattedOverview}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4 text-[#1e3a8a]">What you will learn</h3>
              <div className="grid grid-cols-1">
                {course.whatYouWillLearn.map((point, index) => (
                  <div key={index} className="flex items-start bg-white p-3 rounded-lg">
                    <FaRegCheckCircle className="text-[#1e3a8a] mt-1 mr-3" />
                    <span className="text-gray-700 text-base">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky top-28 shadow-lg p-6 rounded-xl bg-white h-fit border border-indigo-100">
            <h3 className="text-lg font-bold mb-4 text-[#1e3a8a]">This course includes:</h3>
            <div className="space-y-4">
              {course.includes.map((item, index) => (
                <div key={index} className="text-gray-700 flex items-center text-base">
                  {getIconForInclude(item)}
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href="/auth"
                className="inline-block w-full text-center px-6 py-3 bg-[#1e3a8a] text-white font-semibold rounded hover:bg-[#172554] transition shadow"
              >
                Enroll Course
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
