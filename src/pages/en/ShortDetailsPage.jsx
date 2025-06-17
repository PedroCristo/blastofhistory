import { useParams } from "react-router-dom";
import videos from "../../data/videos";
import VideoCard from "../../components/VideoCard";

function ShortsDetailsPage() {
  // 1. Get the :id param
  const { id } = useParams();

  // 2. Find the matching video
  const video = videos.find((v) => String(v.id) === id);
  if (!video) return <p>Video not found</p>;

  // 3. Split description into paragraphs
  const paragraphs = video.description.split("\n\n");

  return (
    <div className="container section shorts-details">
      <div className="row align-items-center">
        {/* Text Section */}
        <div className="col-md-8">
          <h2 className="interactive-color mb-3 title">{video.title}</h2>
          <h4 className="mb-4 subtitle">{video.subTitle}</h4>
          <h5 className="text-secondary mb-4">
            <span className="me-3">
              <i className="bi bi-tags me-1 interactive-color"></i>
              {video.category}
            </span>
            <span>
              <i className="bi bi-calendar-event me-1 interactive-color"></i>
              <span className="me-2">{video.year}</span>
            </span>
            <span>
              <i className="bi bi-camera-reels interactive-color me-1"></i>
              {video.edition}
            </span>
          </h5>

          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <span className="text-secondary sub-title box-shadow p-4 mt-4 d-inline-block">
            {video.additionalInfo}
          </span>
        </div>

        {/* VideoCard Section */}
        <div
          className="col-md-4 d-flex justify-content-center align-items-center mt-5"
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
          />
        </div>
      </div>
    </div>
  );
}

export default ShortsDetailsPage;
