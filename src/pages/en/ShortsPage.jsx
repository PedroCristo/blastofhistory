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

function ShortsPage() {
  const categories = ["All", ...new Set(videos.map((v) => v.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const normalizedCategory = normalizeKey(selectedCategory);

  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter((video) => video.category === selectedCategory);

  const bgImages = {
    ALL: "/images/large/blast-of-history-all-banner.png",
    WWI: "/images/large/blast-of-history-WW1-banner.png",
    WWII: "/images/large/blast-of-history-ww2-banner.png",
    SKYLEGENDS: "/images/large/blast-of-history-sky-legends-banner.png",
    CRIME: "/images/large/blast-of-history-crime-2-banner.png",
    MISTERY: "/images/large/blast-of-history-mistery-banner.png",
    AGEOFEXPLORATION: "/images/large/blast-of-history-age-of-exploration-banner.png",
  };

  const pageTitles = {
    ALL: "All Shorts",
    WWI: "WWI Shorts",
    WWII: "WWII Shorts",
    MISTERY: "Mistery Shorts",
    SKYLEGENDS: "Sky Legends Shorts",
    CRIME: "Crime Shorts",
    AGEOFEXPLORATION: "Age of Exploration Shorts",
  };

  const backgroundUrl = bgImages[normalizedCategory] || bgImages["ALL"];
  const pageTitle =
    pageTitles[normalizedCategory] || `${formatLabel(selectedCategory)} Shorts`;

  return (
    <div className="Shorts-page section">
      <section
        style={{
          minHeight: "40vh",
          padding: "20px",
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
        }}
      >
        <h1 className="mb-4 interactive-color title">{pageTitle}</h1>
        <div className="overlay"></div>
      </section>

      <div className="container-xxl d-flex justify-content-center flex-wrap gap-2 buttons-box">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn ${
              selectedCategory === category
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {formatLabel(category)}
          </button>
        ))}
      </div>

      <div className="row section">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="col-lg-3 col-md-6 col-sm-12 mt-5 d-flex justify-content-center"
          >
            <VideoCard
              id={video.id}
              cover={video.cover}
              category={video.category}
              year={video.year}
              videoId={video.videoId}
              mode="link"
              mt={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShortsPage;
