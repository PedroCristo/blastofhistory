import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container py-5 text-white privacy-policy">
      <h1 className="mb-4 interactive-color">Privacy, Cookies & Terms</h1>

      <p>
        <strong>Last updated:</strong> June 21, 2025
      </p>

      <p>
        Welcome to <strong>Blast of History</strong>. This policy explains how
        we handle your data, use cookies, and the terms you agree to by using
        our website.
      </p>

      <h3 className="mt-4 interactive-color">1. Who We Are</h3>
      <p>
        <strong>Blast of History</strong> is a digital storytelling project
        focused on bringing history to life through short-form, dramatic, and
        educational video content. We create engaging narratives that highlight
        key events, unsolved mysteries, and lesser-known moments from the past.
        Our content is designed for modern audiences who enjoy learning history
        in fast, visually immersive formats.
      </p>

      <p>
        You can officially find and follow us on:{" "}
        <a
          href="https://www.youtube.com/@BlastOfHistory"
          className="interactive-color"
          target="_blank"
          rel="noreferrer"
        >
          YouTube
        </a>{" "}
        and{" "}
        <a
          href="https://www.tiktok.com/@BlastOfHistory"
          className="interactive-color"
          target="_blank"
          rel="noreferrer"
        >
          TikTok
        </a>
        .
      </p>

      <p>
        The channel is owned by <strong>Media Creations</strong>, headquartered
        in <strong>Dublin, Ireland</strong>.
      </p>

      <h3 className="mt-4 interactive-color">2. What Data We Collect</h3>
      <p>
        We don’t collect personal data directly. However, third-party services
        may collect:
      </p>
      <ul>
        <li>IP address and browser type</li>
        <li>Device information and location (approximate)</li>
        <li>
          Video interactions (e.g., watching or clicking embedded YouTube
          videos)
        </li>
      </ul>

      <h3 className="mt-4 interactive-color">3. Embedded Content</h3>
      <p>
        Our site features embedded content, mainly YouTube videos. These
        function as if you visited YouTube directly. By viewing them, you're
        subject to{" "}
        <a
          href="https://policies.google.com/privacy"
          className="interactive-color"
          target="_blank"
          rel="noreferrer"
        >
          Google’s Privacy Policy
        </a>
        .
      </p>

      <h3 className="mt-4 interactive-color">4. Cookies</h3>
      <p>
        We use cookies to improve the browsing experience and gather anonymous
        usage data. Cookies may remember user preferences or track page
        interactions.
      </p>
      <p>
        You may disable cookies through your browser settings, but some features
        may not work as expected. By clicking “Accept” on our cookie banner, you
        agree to our cookie usage.
      </p>

      <h3 className="mt-4 interactive-color">5. Your Rights & Choices</h3>
      <ul>
        <li>You may disable cookies at any time.</li>
        <li>
          You may leave the site using the “Leave” button in the cookie banner.
        </li>
        <li>We do not sell or share your data.</li>
        <li>
          Embedded services (YouTube, TikTok) may have their own tracking and
          cookies.
        </li>
      </ul>

      <h3 className="mt-4 interactive-color">6. Terms of Use</h3>
      <p>
        By using this website, you agree not to reproduce, rehost, or alter any
        content without permission. All content, including text, design, and
        video embeds, are intellectual property of Blast of History or credited
        third parties.
      </p>
      <p>
        Any misuse or abuse of content may result in access restrictions or
        legal action.
      </p>

      <h3 className="mt-4 interactive-color">7. Contact Us</h3>
      <p>
        For questions or concerns regarding this Privacy, Cookies, or Terms of
        Use policy, please contact:
        <br />
        <a href="media.info.creations@gmail.com" className="interactive-color">
          media.info.creations@gmail.com
        </a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
