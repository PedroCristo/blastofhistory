import { useState } from "react";
import videos from "../../data/videos";
import VideoCard from "../../components/VideoCard";

function ShortsPage() {
  const categories = ["All", ...new Set(videos.map((v) => v.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter((video) => video.category === selectedCategory);

  // Map category to background image URL
  const bgImages = {
    All: "/images/large/blast-of-history-banner-end-slide_1000PX.png",
    WWI: "/images/bg/wwi-bg.jpg",
    WWII: "/images/bg/wwii-bg.jpg",
    // Add more categories and images here
  };

  // Page titles for special cases
  const pageTitles = {
    All: "All Shorts",
    WWI: "WWI Shorts",
    WWII: "WWII Shorts",
    MISTERY: "Mistery Shorts",
  };

  // Helper function to format category names into titles
  function formatPageTitle(category) {
    if (category === "All") return "All Shorts";
    // Capitalize first letter, lowercase the rest + " Shorts"
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() + " Shorts";
  }

  return (
    <div className="Shorts-page">
      <section
        style={{
          minHeight: "50vh",
          padding: "20px",
          backgroundImage: `url(${bgImages[selectedCategory] || bgImages["All"]})`,
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
        <h1 className="mb-4 interactive-color title">
          {pageTitles[selectedCategory] || formatPageTitle(selectedCategory)}
        </h1>
        <div className="overlay"></div>
      </section>

      <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn mb-5 ${
              selectedCategory === category ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="row section">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="col-lg-3 col-md-6 col-sm-12 mb-4 d-flex justify-content-center"
          >
            <VideoCard
              cover={video.cover}
              category={video.category}
              year={video.year}
              videoId={video.videoId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShortsPage;
