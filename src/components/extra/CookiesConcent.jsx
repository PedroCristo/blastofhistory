import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
      setTimeout(() => {
        setVisible(true); // Trigger CSS transition after 5 seconds
      }, 5000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  const leaveSite = () => {
    window.location.href = "https://www.google.com";
  };

  if (!showBanner) return null;

  return (
    <div className={`cookie-banner position-fixed bottom-0 w-100 bg-dark text-white p-3 d-flex flex-column flex-md-row justify-content-between align-items-center z-3 ${visible ? 'show' : ''}`}>
      <div className="mb-2 mb-md-0">
        This website uses cookies to improve the user experience. By clicking Accept, you agree to our cookies policy.{" "}
        <Link to="/privacy-policy" className="interactive-color">Learn more</Link>
      </div>
      <div className="d-flex gap-2">
        <button className="btn w-100 interactive-color" onClick={acceptCookies}>Accept</button>
        <button className="btn btn-outline-light w-100" onClick={leaveSite}>Leave</button>
      </div>
    </div>
  );
};

export default CookieConsent;
