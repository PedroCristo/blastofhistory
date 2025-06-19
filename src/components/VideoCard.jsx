import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPlayer from "react-player";

function VideoCard({
  id,
  type,
  cover,
  category,
  year,
  title,
  videoId,
  videoDetails,
  detailsPage,
  mt = false,
  mode = "modal", // "modal" or "link"
}) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
    type === "video" ? "expanded" : "",
  ].join(" ");

  return (
    <>
      <div className={cardClasses} onClick={handleClick}>
        <img
          src={cover}
          alt="Video Cover"
          className={`img-fluid rounded ${
            type === "shorts" ? "w-75" : "w-100"
          } ${videoDetails === true ? "video-detail-img-big" : ""}`}
        />

        <button
          className="bt btn-light border-0 position-absolute w-50"
          onClick={(e) => {
            e.stopPropagation(); // Prevent button click from bubbling to parent
            handleClick();
          }}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "2rem",
            opacity: 0.8,
          }}
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
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.8)" }}
          tabIndex="-1"
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            style={{ maxWidth: "90vw", maxHeight: "80vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-dark" style={{ height: "90vh" }}>
              <div className="modal-header border-0">
                <button
                  type="button"
                  className="btn-close btn-close-white ms-auto"
                  onClick={closeModal}
                />
              </div>
              <div
                className="modal-body p-0"
                style={{ height: "calc(100% - 56px)" }}
              >
                <div
                  className="ratio mt-5 ratio-16x9"
                  style={{ height: "90%" }}
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

export default VideoCard;
