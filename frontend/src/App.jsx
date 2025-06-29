import { BrowserRouter as Router, Routes, Route, useLocation, NavLink } from "react-router-dom";
import { lazy, Suspense, useContext } from 'react';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import ProtectedRoute from './components/ProtectedRoute';
// import AdminRoute from './components/AdminRoute';
import FloatingMenu from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./components/BlogPost";
import Contact from "./pages/Contact";
import LearnMore from "./pages/LearnMore";
import CoursePage from "./pages/Course";
import CourseCard from "./components/CourseCard";
import AuthPage from "./pages/Auth";
import AuthProvider, { AuthContext } from './context/AuthContext';
import Domains from './pages/Domains';
import CourseDetails from './pages/CourseDetails';
import MyCourses from './pages/MyCourses';
import UserProfile from "./pages/UserProfile";
import CertificatePage from "./components/CertificatePage";

// import AdminApp from './admin/AdminApp';

function Layout() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const hideLayout = location.pathname === "/auth" || location.pathname.startsWith('/certificate');;

  return (
    <>
      {!hideLayout && <Navbar />}
      {!hideLayout && <FloatingMenu />}
      {/* {!hideLayout && user?.isAdmin && (
        <NavLink
          to="/admin"
          className="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          Admin
        </NavLink>
      )} */}

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
          {/* <Route path="/admin" element={
            <AdminRoute>
              <Suspense fallback={<p>Loading…</p>}>
                <AdminApp />
              </Suspense>
            </AdminRoute>
          } /> */}
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