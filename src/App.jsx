import { useEffect } from "react"; // Import useEffect from React
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

function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,  // Animation duration (in ms)
      easing: 'ease-in-out',  // Animation easing function
      once: true,  // Animation triggers only once
      mirror: false,  // Don't animate when the element scrolls back into view
    });

    // Optionally, refresh AOS after updates
    window.addEventListener('resize', AOS.refresh);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', AOS.refresh);
    };
  }, []); // The empty dependency array ensures this runs only once when the component is mounted

  return (
    <>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/contact-page" exact element={<ContactPage />} />
        <Route path="/about-page" exact element={<AboutPage />} />
        <Route path="/shorts-page" exact element={<ShortsPage />} />
        <Route path="/short/:id" element={<ShortsDetailsPage />} />
        <Route path="/videos-page" exact element={<VideosPage />} />
        <Route path="/video/:id" element={<VideoDetailsPage type="video" />} />´
        <Route path="privacy-policy" element={<PrivacyPolicy/>} />´
        <Route path="*" exact element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
