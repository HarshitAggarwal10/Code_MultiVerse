import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
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

function Layout() {
  const location = useLocation();
  const hideLayout = location.pathname === "/auth";

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
        </Routes>
      </div>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;