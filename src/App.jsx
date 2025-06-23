import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
import PrivateRoute from "../src/components/Login/PrivateRouts";
import Login from "./pages/login/Login";
import ResetPassword from "./pages/login/ResetPassword";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // Optional wrapper for ResetPassword to handle navigation back
  // or you can handle navigation inside ResetPassword via props
  // but here, assuming ResetPassword accepts an onBack prop to navigate back:
  // If not, just directly render <ResetPassword /> in Route.

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPasswordWrapper />} />{" "}
        {/* New route */}
        <Route path="/" exact element={<HomePage />} />
        <Route path="/contact-page" exact element={<ContactPage />} />
        <Route path="/about-page" exact element={<AboutPage />} />
        <Route path="/shorts-page" exact element={<ShortsPage />} />
        <Route path="/short/:id" element={<ShortsDetailsPage />} />
        <Route path="/videos-page" exact element={<VideosPage />} />
        <Route path="/video/:id" element={<VideoDetailsPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" exact element={<PageNotFound />} />
        {/* Protected Routes */}
        <Route
          path=""
          element={
            <PrivateRoute>
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

// Optional wrapper component to pass navigation function as prop
import { useNavigate } from "react-router-dom";
function ResetPasswordWrapper() {
  const navigate = useNavigate();
  return <ResetPassword onBack={() => navigate("/login")} />;
}

export default App;