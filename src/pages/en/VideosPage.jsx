import { useState } from "react";
import videos from "../../data/videos";
import VideoCard from "../../components/VideoCard";

// Normalize keys for matching bgImages and titles
function normalizeKey(str) {
  return str?.toUpperCase().replace(/[\s_]/g, "");
}

// Format for button and title display
function formatLabel(str) {
  return str
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function VideosPage() {
  // Only include categories that contain at least one video of type "Video"
  const videoCategories = [
    ...new Set(videos.filter((v) => v.type === "Video").map((v) => v.category)),
  ];
  const categories = ["All", ...videoCategories];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const normalizedCategory = normalizeKey(selectedCategory);

  const filteredVideos =
    selectedCategory === "All"
      ? videos.filter((video) => video.type === "Video")
      : videos.filter(
          (video) =>
            video.type === "Video" && video.category === selectedCategory
        );

  const bgImages = {
    ALL: "/images/large/blast-of-history-all-2-banner.png",
    WWI: "/images/large/blast-of-history-WW1-banner.png",
    WWII: "/images/large/blast-of-history-ww2-banner.png",
    SKYLEGENDS: "/images/large/blast-of-history-sky-legends-banner.png",
    CRIME: "/images/large/blast-of-history-crime-2-banner.png",
    MISTERY: "/images/large/blast-of-history-mistery-banner.png",
    COLDWAR: "/images/large/blast-of-history-cold-war-banner.png",
    AGEOFEXPLORATION:
      "/images/large/blast-of-history-age-of-exploration-banner.png",
  };

  const pageTitles = {
    ALL: "All Videos",
    WWI: "WWI Videos",
    WWII: "WWII Videos",
    MISTERY: "Mystery Videos",
    SKYLEGENDS: "Sky Legends Videos",
    CRIME: "Crime Videos",
    AGEOFEXPLORATION: "Age of Exploration Videos",
  };

  const backgroundUrl = bgImages[normalizedCategory] || bgImages["ALL"];
  const pageTitle =
    pageTitles[normalizedCategory] || `${formatLabel(selectedCategory)} Videos`;

  return (
    <div className="Videos-page section p-0">
      <section
        className="zoom-background"
        style={{
          minHeight: "50vh",
          backgroundImage: `url(${backgroundUrl})`,
        }}
      >
        <div className="zoom-bg-layer" />
        <div className="overlay" />
        <div className="content">
          <h1 className="mb-4 interactive-color title">{pageTitle}</h1>
        </div>
      </section>

      <div className="container-xxl d-flex justify-content-center flex-wrap gap-2 buttons-box">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn ${
              selectedCategory === category
                ? "interactive-bg"
                : "btn-outline-primary"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {formatLabel(category)}
          </button>
        ))}
      </div>

      {filteredVideos.length === 0 ? (
        <p className="text-center mt-5">No videos found in this category.</p>
      ) : (
        <div className="row section">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="col-lg-3 col-md-6 col-sm-12 mt-2 mb-5 d-flex justify-content-center"
            >
              <VideoCard
                id={video.id}
                cover={video.cover}
                category={video.category}
                year={video.year}
                videoId={video.videoId}
                type={video.type} // ✅ IMPORTANT
                mode="link"
                mt={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideosPage;
