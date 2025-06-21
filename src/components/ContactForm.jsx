import React from "react";

function ContactSection() {
  return (
    <section className="container my-5">
      <div className="row contact-form">
        {/* Contact Form */}
        <div className="col-md-6 mb-4" data-aos="fade-up">
          <h3 className="mb-4 title interactive-color">Get in Touch</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input type="text" className="form-control" id="subject"/>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control" id="message" rows="4" required></textarea>
            </div>
            <button type="submit" className="btn box-shadow">Send</button>
          </form>
        </div>

        {/* Contact Info & Socials */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center col-details" data-aos="fade-left">
          <h3 className="mb-4 interactive-color sub-title">Contact</h3>
          <p className="d-flex align-items-center gap-2">
            <i className="bi bi-geo-alt interactive-color"></i>
            Mather South, Mount Merrion, Dublin 4 - Ireland
          </p>
          <p className="d-flex align-items-center gap-2">
            <i className="bi bi-envelope interactive-color"></i>
            media.info.creations@gmail.com
          </p>
          <h4 className="mt-5 mb-3 interactive-color sub-title">Follow Us</h4>
          <div className="d-flex gap-3">
            <a href="https://youtube.com/@blastofhistory" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-youtube interactive-color fs-4"></i>
            </a>
            <a href="https://tiktok.com/@blastofhistory" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-tiktok interactive-color fs-4"></i>
            </a>
            <a href="https://facebook.com/@blastofhistory" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook interactive-color fs-4"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
