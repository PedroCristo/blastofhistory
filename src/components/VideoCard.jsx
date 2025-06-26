import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";

function VideoCard({
  id,
  type,
  cover,
  category,
  year,
  title,
  videoId,
  videoDetails,
  videoCardDetails,
  shortsDetails,
  detailsPage,
  mt = false,
  shorts = false,
  mode = "modal", // "modal" or "link"
}) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  const handleClick = () => {
    if (mode === "modal") {
      setShowModal(true);
    } else {
      const routeType = type.toLowerCase() === "shorts" ? "short" : "video";
      navigate(`/${routeType}/${id}`);
    }
  };

  const closeModal = () => setShowModal(false);

  const cardClasses = [
    "video-card",
    "position-relative",
    "text-center",
    mt ? "mt-5" : "",
    type === "Videos" ? "expanded" : "",
    shortsDetails === true ? "video-card-shorts-details" : "",
    videoCardDetails === true ? "video-card-video-details" : "",
  ].join(" ");

  return (
    <>
      <div
        className={cardClasses}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleClick();
        }}
      >
        <img
          src={cover}
          alt={`${title} Video Cover`}
          className={`img-fluid rounded ${
            type === "shorts" ? "w-75" : "w-100"
          } ${shorts ? "shorts-img" : ""} ${
            videoDetails ? "video-detail-img-big" : ""
          }`}
        />

        <button
          className="bt btn-light border-0 position-absolute w-50"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "2rem",
            opacity: 0.8,
          }}
          aria-label={`Play video: ${title}`}
        >
          <img
            className="w-50 translate-image"
            src="/images/small/youtube-logo.png"
            alt="Youtube Logo"
          />
        </button>

        <div className="video-details video-details-top">
          <div className={detailsPage ? "" : "container-title"}>
            <span className="sub-title bebas-neue-regular">
              {(title || "").split(":").map((part, index, arr) => (
                <React.Fragment key={index}>
                  {part.trim()}
                  {index !== arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </span>
          </div>
        </div>

        <div className="video-details">
          <span>
            <i className="bi bi-globe interactive-color"></i> {category}
          </span>
          <span style={{ marginLeft: "10px" }}>
            <i className="bi bi-calendar interactive-color"></i> {year}
          </span>
        </div>
      </div>

      {mode === "modal" && showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 1050,
          }}
          tabIndex={-1}
          onClick={closeModal}
          aria-modal="true"
          role="dialog"
          aria-labelledby={`modal-title-${id}`}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            style={{ maxWidth: "98vw", maxHeight: "80vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-dark" style={{ height: "90vh" }}>
              <div className="modal-header border-0">
                <button
                  type="button"
                  className="btn-close btn-close-white ms-auto"
                  onClick={closeModal}
                  aria-label="Close modal"
                />
              </div>
              <div
                className="modal-body p-0"
                style={{ height: "calc(100% - 56px)" }}
              >
                <div
                  className="ratio mt-1 ratio-16x9"
                  style={{ height: "98%" }}
                >
                  <ReactPlayer
                    url={`https://www.youtube.com/embed/${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

VideoCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  videoDetails: PropTypes.bool,
  detailsPage: PropTypes.bool,
  mt: PropTypes.bool,
  mode: PropTypes.oneOf(["modal", "link"]),
};

VideoCard.defaultProps = {
  videoDetails: false,
  detailsPage: false,
  mt: false,
  mode: "modal",
};

export default VideoCard;
