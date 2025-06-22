import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ContactSection() {
  const [isRecaptchaChecked, setIsRecaptchaChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    message: ""
  });

  const handleRecaptchaChange = () => {
    setIsRecaptchaChecked(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isRecaptchaChecked) {
      toast.error("Please verify you're not a robot.");
      return;
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/media.info.creations@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          ...formData,
          _captcha: "false",
        }),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", subject: "", email: "", message: "" });
        setIsRecaptchaChecked(false);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("Network error. Try again later.");
    }
  };

  return (
    <section className="container my-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="row contact-form">
        {/* Contact Form */}
        <div className="col-md-6 mb-4" data-aos="fade-up">
          <h3 className="mb-4 title interactive-color">Get in Touch</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <ReCAPTCHA
                // sitekey="6Lc6kmkrAAAAAGbmfXrjoMLp2WUG7egEmqTkKLW7"
                sitekey="6LeAuGkrAAAAAE05vIiAYoxIyRw_76r4rVOjC_vQ"
                onChange={handleRecaptchaChange}
                hl="en"
              />
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
