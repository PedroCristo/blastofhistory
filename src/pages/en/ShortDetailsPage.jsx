import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoCard from "../../components/VideoCard";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../data/firebaseConfig"; // adjust the path if needed

function ShortsDetailsPage() {
  // Get id param from URL
  const { id: rawId } = useParams();

  // Clean string helper to remove extra quotes and trim spaces
  const cleanString = (str) => {
    if (typeof str === "string") {
      return str.replace(/^"(.*)"$/, "$1").trim();
    }
    return str;
  };

  const id = cleanString(rawId);

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch single video by ID
  useEffect(() => {
    async function fetchVideo() {
      setLoading(true);
      try {
        const docRef = doc(db, "shorts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const videoData = { id: docSnap.id, ...docSnap.data() };
          setVideo(videoData);
          setError(null);
        } else {
          setVideo(null);
          setError(new Error("Video not found"));
        }
      } catch (err) {
        setError(err);
        setVideo(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchVideo();
  }, [id]);

  // Optional: Fetch all videos and log once on mount
  useEffect(() => {
    async function fetchAllVideos() {
      try {
        const querySnapshot = await getDocs(collection(db, "shorts"));
        const allVideos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (err) {
        console.error("Error fetching all videos:", err);
      }
    }

    fetchAllVideos();
  }, []);

  if (loading) return <p>Loading video...</p>;
  if (error) return <p>Error loading video: {error.message}</p>;
  if (!video) return <p>Video not found</p>;

  const paragraphs = video.description?.split("\n\n") || [];

  return (
    <div className="container section shorts-details mt-1">
      <div className="row row-reverse-992px align-items-center">
        {/* Text Section */}
        <div className="col-100 col-md-8">
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
            <p key={i} style={{ marginBottom: "0.75rem" }}>
              {p}
            </p>
          ))}

          {video.additionalInfo && (
            <span className="text-secondary sub-title box-shadow p-4 mt-4 d-inline-block">
              <i class="bi bi-quote interactive-color"></i>{video.additionalInfo}<i class="bi bi-quote interactive-color"></i>
            </span>
          )}
        </div>

        {/* VideoCard Section */}
        <div
          className="video-box col-100 col-md-4 d-flex justify-content-center align-items-center mt-5"
          style={{ minHeight: "100vh" }}
        >
          <VideoCard
            id={video.id}
            cover={video.cover}
            category={video.category}
            year={video.year}
            videoId={video.videoId}
            mode="modal"
            type="shorts"
            mt={true}
            shorts={true}
            detailsPage={true}
            shortsDetails={true}
            videoCardDetails ={false}
          />
        </div>
      </div>
    </div>
  );
}

export default ShortsDetailsPage;
