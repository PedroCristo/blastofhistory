import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  // Function to close the mobile navbar after clicking a nav link
  const handleNavLinkClick = () => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.getElementById("navbarNav");

    if (navbarToggler && navbarCollapse.classList.contains("show")) {
      navbarToggler.click(); // Simulate toggle click
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
