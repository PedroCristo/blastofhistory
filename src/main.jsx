import React, { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";

import "./main.css";
import "./responsive.css";
import "./animations.css";

import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Preloader from "./components/extra/Preloader.jsx";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Root() {
  const location = useLocation();
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Show preloader briefly on route change
    setShowPreloader(true);
    const timeout = setTimeout(() => {
      setShowPreloader(false);
    }, 1000); // enough time to feel like a transition
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      <Navbar />
      {showPreloader ? <Preloader /> : <App />}
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>
);
