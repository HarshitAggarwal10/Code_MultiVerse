import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import FloatingMenu from "./components/ScrollToTop";
import Blog from "./pages/Blog";
import BlogPost from "./components/BlogPost";
import Contact from "./pages/Contact";
import LearnMore from "./pages/LearnMore";
import CoursePage from "./pages/Course";
import CourseCard from "./components/CourseCard";
import AuthPage from "./pages/Auth";
import AuthProvider from './context/AuthContext';
// import Dashboard from './pages/Dashboard';
import Domains from './pages/Domains';
import CourseDetails from './pages/CourseDetails';
import MyCourses from './pages/MyCourses';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from "./pages/UserProfile";
import CertificatePage from "./components/CertificatePage";

function Layout() {
  const location = useLocation();
  const hideLayout = location.pathname === "/auth" || location.pathname.startsWith('/certificate');;

  return (
    <>
      {!hideLayout && <Navbar />}
      {!hideLayout && <FloatingMenu />}
      <div className={`${!hideLayout ? "pt-20 px-4" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/courses/:slug" element={<CourseCard />} />
          <Route path="/auth" element={<AuthPage />} />
          {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
          <Route path="/domains" element={<Domains />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/certificate/:subjectId" element={<CertificatePage />} />
        </Routes>
      </div>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;