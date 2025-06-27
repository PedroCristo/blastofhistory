import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';  
import AOS from "aos";
import "aos/dist/aos.css";
import "./main.css";

import HomePage from "./pages/en/homePage";
import ContactPage from "./pages/en/ContactPage";
import AboutPage from "./pages/en/AboutPage";
import ShortsPage from "./pages/en/ShortsPage";
import ShortsDetailsPage from "./pages/en/ShortDetailsPage";
import VideosPage from "./pages/en/VideosPage";
import VideoDetailsPage from "./pages/en/videoDetailsPage";
import PageNotFound from "./pages/error/404";
import PrivacyPolicy from "./pages/en/PrivacyPolicyPage";
import PrivateRoute from "./components/Login/PrivateRouts"; // simplified relative path
import Login from "./pages/login/Login";
import ResetPassword from "./pages/login/ResetPassword";
import AdminUploader from "./pages/admin/AdminUploader";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Optional wrapper component to pass navigation function as prop
function ResetPasswordWrapper() {
  const navigate = useNavigate();
  return <ResetPassword onBack={() => navigate("/login")} />;
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    window.addEventListener("resize", AOS.refresh);
    return () => {
      window.removeEventListener("resize", AOS.refresh);
    };
  }, []);

  return (
    <HelmetProvider>   {/* Wrap everything here */}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPasswordWrapper />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/contact-page" element={<ContactPage />} />
        <Route path="/about-page" element={<AboutPage />} />
        <Route path="/shorts-page" element={<ShortsPage />} />
        <Route path="/short/:id" element={<ShortsDetailsPage />} />
        <Route path="/videos-page" element={<VideosPage />} />
        <Route path="/video/:id" element={<VideoDetailsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminUploader />
            </PrivateRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={5000} />
    </HelmetProvider>
  );
}

export default App;