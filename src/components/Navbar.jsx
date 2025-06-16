import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        {/* Logo on the left */}
        <Link className="navbar-brand" to="/">
          <img src="images/small/blast-of-history-300x300.jpg" className="rounded-circle" alt="Blast of History Logo" height="90" />
        </Link>

        {/* Navbar toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links on the right */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shorts-page">Shorts</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/videos">Videos</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-page">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact-page">Contact</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" target="_blank" href="https://youtube.com/@blastofhistory?sub_confirmation=1">Youtube 🎬</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
