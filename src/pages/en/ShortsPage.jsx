import { useState, useEffect } from "react";
import VideoCard from "../../components/VideoCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../data/firebaseConfig";

// Normalize keys for matching bgImages and titles
function normalizeKey(str = "") {
  return str.toUpperCase().replace(/[\s_]/g, "");
}

// Format for button and title display
function formatLabel(str = "") {
  return str
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Helper function to clean strings of extra quotes and trim
const cleanString = (str) => {
  if (typeof str === "string") {
    return str.replace(/^"(.*)"$/, "$1").trim();
  }
  return str;
};

function ShortsPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Use "category:All" consistently for initial filter state
  const [selectedFilter, setSelectedFilter] = useState("category:All");

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "shorts"));
        const videoData = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((video) => video.show !== false); // Only show videos where show !== false
        setVideos(videoData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  const cleanedVideos = videos.map((video) => ({
    ...video,
    id: video.id,
    category: cleanString(video.category),
    edition: cleanString(video.edition),
    cover: cleanString(video.cover),
    year: video.year,
    videoId: cleanString(video.videoId),
    subTitle: cleanString(video.subTitle),
    title: cleanString(video.title),
  }));

  // Get unique categories from videos
  const categories = [
    "All",
    ...Array.from(new Set(cleanedVideos.map((v) => v.category).filter(Boolean))),
  ];

  // Filtering videos by selectedFilter
  const filteredVideos =
    selectedFilter === "category:All"
      ? cleanedVideos
      : cleanedVideos.filter((video) => {
          const [type, value] = selectedFilter.split(":");
          if (type === "category") {
            return normalizeKey(video.category) === normalizeKey(value);
          }
          if (type === "edition") {
            return normalizeKey(video.edition) === normalizeKey(value);
          }
          return true;
        });

  // Background images for categories and editions
  const bgImages = {
    ALL: "/images/large/blast-of-history-all-2-banner.png",
    WWI: "/images/large/blast-of-history-WW1-banner.png",
    WWII: "/images/large/blast-of-history-ww2-banner.png",
    SKYLEGENDS: "/images/large/blast-of-history-sky-legends-banner.png",
    CRIME: "/images/large/blast-of-history-crime-2-banner.png",
    MISTERY: "/images/large/blast-of-history-mistery-banner.png",
    COLDWAR: "/images/large/blast-of-history-cold-war-banner.png",
    AGEOFEXPLORATION: "/images/large/blast-of-history-age-of-exploration-banner.png",
    // Editions backgrounds (optional)
    BLASTOFHISTORY: "/images/large/blast-of-history-all-2-banner.png",
    SKYLEGENDS: "/images/large/blast-of-history-sky-legends-banner.png",
  };

  // Page titles for categories
  const pageTitles = {
    ALL: "All Shorts",
    WWI: "WWI Shorts",
    WWII: "WWII Shorts",
    MISTERY: "Mistery Shorts",
    SKYLEGENDS: "Sky Legends",
    CRIME: "Crime Shorts",
    AGEOFEXPLORATION: "Age of Exploration Shorts",
  };

  // Determine background key and page title based on selectedFilter
  let backgroundKey = "ALL";
  let pageTitle = "All Shorts";

  if (selectedFilter) {
    const [type, value] = selectedFilter.split(":");
    if (type === "category") {
      backgroundKey = normalizeKey(value);
      pageTitle = pageTitles[backgroundKey] || `${formatLabel(value)} Shorts`;
    } else if (type === "edition") {
      backgroundKey = normalizeKey(value);
      pageTitle = `${formatLabel(value)} Series`;
    }
  }

  const backgroundUrl = bgImages[backgroundKey] || bgImages["ALL"];

  if (loading) return <p className="mt-5">Loading videos...</p>;
  if (error) return <p className="mt-5 mb-5">Error loading videos: {error.message}</p>;

  return (
    <div className="Shorts-page section p-0">
      <section
        className="zoom-background"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll",
        }}
      >
        <div className="zoom-bg-layer" />
        <div className="overlay" />
        <div className="content">
          <h1 className="mb-4 mt-5 interactive-color title">{pageTitle}</h1>
        </div>
      </section>

      <div className="container-xxl buttons-box">
        <div className="row">
          <div className="col-md-12 mt-5 d-flex flex-column align-items-end">
            <h3 className="interactive-color mb-3">Filter by Edition or Category</h3>
            <select
              className="form-select w-auto mt-2"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="category:All">All</option>
              <optgroup label="Categories">
                {categories
                  .filter((cat) => cat !== "All")
                  .map((cat) => (
                    <option key={`cat-${cat}`} value={`category:${cat}`}>
                      {cat}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Editions">
                {["Blast of History", "Sky Legends"].map((ed) => (
                  <option key={`ed-${ed}`} value={`edition:${ed}`}>
                    {ed}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row section video-shorts-container ">
          {filteredVideos.length === 0 ? (
            <h2 className="text-center mt-5 mb-5">No videos found for this search!!</h2>
          ) : (
            filteredVideos.map((video) => (
              <div
                key={video.id}
                className="col-lg-3 col-md-6 col-sm-12 mt-5 d-flex justify-content-center"
                data-aos="fade-u"
              >
                <VideoCard
                  id={video.id}
                  cover={video.cover ? video.cover.trim() : ""}
                  category={video.category}
                  year={video.year}
                  videoId={video.videoId}
                  mode="link"
                  type="shorts"
                  subTitle={video.subTitle}
                  title={video.title}
                  mt={true}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ShortsPage;
