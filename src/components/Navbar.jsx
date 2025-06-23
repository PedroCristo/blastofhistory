import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../data/firebaseConfig";
import { signOut } from "firebase/auth";
// import useAuth from "../Login/hooks/useAuth"; // Adjust path to your useAuth hook
import { toast } from "react-toastify";

import useAuth from "./Login/UseAuth";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const handleNavLinkClick = () => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.getElementById("navbarNav");

    if (navbarToggler && navbarCollapse.classList.contains("show")) {
      navbarToggler.click();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.info("Logged out successfully", { autoClose: 2000 }); // Show toast for 2 seconds
      // No navigate here — user stays on the current page
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        scrolled ? "navbar-action" : ""
      }`}
    >
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={handleNavLinkClick}>
          <img
            src="images/small/blast-of-history-300x300.jpg"
            className="rounded-circle"
            alt="Blast of History Logo"
            height="90"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list interactive-color fs-2"></i>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link active ${
                  scrolled ? "navlink-action" : ""
                }`}
                to="/"
                onClick={handleNavLinkClick}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${scrolled ? "navlink-action" : ""}`}
                to="/shorts-page"
                onClick={handleNavLinkClick}
              >
                Shorts
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${scrolled ? "navlink-action" : ""}`}
                to="/videos-page"
                onClick={handleNavLinkClick}
              >
                Videos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${scrolled ? "navlink-action" : ""}`}
                to="/about-page"
                onClick={handleNavLinkClick}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${scrolled ? "navlink-action" : ""}`}
                to="/contact-page"
                onClick={handleNavLinkClick}
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${scrolled ? "navlink-action" : ""}`}
                to="/privacy-policy"
                onClick={handleNavLinkClick}
              >
                Policy Privacy
              </Link>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${scrolled ? "navlink-action" : ""}`}
                target="_blank"
                rel="noopener noreferrer"
                href="https://youtube.com/@blastofhistory?sub_confirmation=1"
                onClick={handleNavLinkClick}
              >
                YouTube 🎬
              </a>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <span
                    className={`nav-link interactive-color${
                      scrolled ? "navlink-action" : ""
                    }`}
                    style={{ cursor: "default" }}
                  >
                    Hello, {user.email.split("@")[0]}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link mt-2 ${
                      scrolled ? "navlink-action" : ""
                    }`}
                    onClick={handleLogout}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      padding: 0,
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  className={`nav-link ${scrolled ? "navlink-action" : ""}`}
                  to="/login"
                  onClick={handleNavLinkClick}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
