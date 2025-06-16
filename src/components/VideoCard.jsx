import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPlayer from "react-player";

function VideoCard({ cover, category, year, videoId }) {
  const [showModal, setShowModal] = useState(false);

  const handlePlay = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="video-card position-relative text-center">
      <img
        src={cover}
        alt="Video Cover"
        className="img-fluid rounded w-75"
        onClick={handlePlay}
        style={{ cursor: "pointer" }}
      />
      <button
        className="btn btn-light position-absolute w-25"
        onClick={handlePlay}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "2rem",
          opacity: 0.8,
        }}
      >
        ▶
      </button>
      <div className="video-details">
        <span>
          <i className="bi bi-globe"></i> {category}
        </span>
        <span style={{ marginLeft: "10px" }}>
          <i className="bi bi-calendar"></i> {year}
        </span>
      </div>

      {/* Modal */}
      {showModal && (
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
                ></button>
              </div>
              <div
                className="modal-body p-0"
                style={{ height: "calc(100% - 56px)" }}
              >
                <div
                  className="ratio mt-5 ratio-16x9"
                  style={{ height: "90%" }}
                >
                  {/* <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{ width: "100%", height: "100%" }}
                  ></iframe> */}
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
    </div>
  );
}

export default VideoCard;
