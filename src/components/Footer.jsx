function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <footer className="container-fluid set-bg">
        <div className="footer">
          <div className="row">
            <div className="col-md-4">
              <h3 className="mb-5 interactive-color">
                Blast Of History Channel
              </h3>
              <img
                src="images/small/blast-of-history-300x300.jpg"
                className="rounded-circle w-25"
                alt="Blast of History Logo"
                height="90"
                width="90"
                
              />
            </div>
            <div className="col-md-4">
              <h3 className="mb-5 interactive-color">Contact</h3>
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="bi bi-geo-alt interactive-color"></i>
                Mather South, Month Merrion, Dublin 4
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="bi bi-envelope interactive-color"></i>
                media.info.creations@gmail.com
              </p>
            </div>
            <div className="col-md-4">
              <h3 className="mb-5 interactive-color">Follow Us</h3>
              <a
                href="https://www.youtube.com/@blastofhistory"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
                className="mb-2"
              >
                <i className="bi bi-youtube interactive-color"></i> YouTube
              </a>

              <a
                href="https://www.tiktok.com/@blastofhistory"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
                className="mb-2"
              >
                <i className="bi bi-tiktok interactive-color"></i> TikTok
              </a>
              <a
                href="https://www.facebook.com/@blastofhistory"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
                className="mb-2"
              >
                <i className="bi bi-facebook interactive-color"></i> Facebook
              </a>
              <a
                href="https://buymeacoffee.com/mediacreations"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
                className="mb-2"
              >
                <i className="bi bi-cup-straw interactive-color"></i> Buy me a Coffee
              </a>
            </div>
            <hr className="mt-5" />
            <div className="copyright">
              <span
                className="interactive-color"
                style={{ marginRight: "6px" }}
              >
                &copy;
              </span>
              Blast Of History | All rights reserved | {currentYear}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
