import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../data/firebaseConfig";
import { useEffect, useState } from "react";
import VideoCard from "../../components/VideoCard";

function VideoDetailsPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideo() {
      setLoading(true);
      try {
        const docRef = doc(db, "videos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVideo({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Video not found");
        }
      } catch (err) {
        setError("Error fetching video");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchVideo();
  }, [id]);

  if (loading) return <p>Loading video...</p>;
  if (error) return <p>{error}</p>;
  if (!video) return null;

  const paragraphs = video.description ? video.description.split("\n\n") : [];

  return (
    <div className="container section shorts-details video-container mt-1">
      <div className="row row-reverse-992px align-items-center mt-2">
        {/* Text Section */}
        <div className="col-md-7 col-100">
          <h2 className="interactive-color mb-3 title">{video.title}</h2>
          <h4 className="mb-4 subtitle">{video.subTitle}</h4>
          {/* Info Grid */}
          <div className="d-flex flex-wrap gap-2 mb-4">
            <div className="d-flex align-items-center me-3">
              <i className="bi bi-tags me-1 interactive-color"></i>
              <span>{video.category}</span>
            </div>
            <div className="d-flex align-items-center me-3">
              <i
                className={`bi me-1 interactive-color ${
                  video.type === "Shorts" ? "bi-phone" : "bi-tv"
                }`}
              ></i>
              <span>{video.type}</span>
            </div>
            <div className="d-flex align-items-center me-3">
              <i className="bi bi-calendar-event me-1 interactive-color"></i>
              <span>{video.year}</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-camera-reels me-1 interactive-color"></i>
              <span>{video.edition}</span>
            </div>
          </div>
          {paragraphs.map((p, i) => (
            <p className="paragraph" key={i}>
              {p}
            </p>
          ))}
          {video.additionalInfo && (
            <span className="text-secondary sub-title box-shadow p-4 mt-4 d-inline-block mb-2">
              <i class="bi bi-quote interactive-color"></i>{video.additionalInfo}<i class="bi bi-quote interactive-color"></i>
            </span>
          )}
        </div>

        {/* VideoCard Section */}
        <div
          className="col-md-5 video-box col-100 d-flex justify-content-center align-items-center mt-5"
          style={{ minHeight: "100vh" }}
        >
          <VideoCard
            id={video.id}
            cover={video.cover}
            category={video.category}
            year={video.year}
            videoId={video.videoId}
            mode="modal"
            mt={true}
            videoDetails={true}
            videoCardDetails={true}
            detailsPage={true}
          />
        </div>
      </div>
    </div>
  );
}

export default VideoDetailsPage;
