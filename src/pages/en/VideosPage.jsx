import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../data/firebaseConfig";
import VideoCard from "../../components/VideoCard";

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

function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "videos"));
        const videoData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched videos:", videoData); // <-- ADD THIS

        setVideos(videoData);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  const cleanedVideos = videos
    .filter((v) => (v.type || "").toLowerCase() === "video")
    .map((video) => ({
      ...video,
      id: video.id,
      category: cleanString(video.category),
      cover: cleanString(video.cover),
      year: video.year,
      videoId: cleanString(video.videoId),
      subTitle: cleanString(video.subTitle),
      title: cleanString(video.title),
    }));

  const videoCategories = [
    ...new Set(cleanedVideos.map((v) => v.category).filter(Boolean)),
  ];
  const categories = ["All", ...videoCategories];
  const normalizedCategory = normalizeKey(selectedCategory);

  const filteredVideos =
    selectedCategory === "All"
      ? cleanedVideos
      : cleanedVideos.filter(
          (video) => normalizeKey(video.category) === normalizedCategory
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

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error loading videos: {error.message}</p>;

  return (
    <div className="Videos-page section p-0">
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
              className="col-lg-3 col-md-6 col-sm-12 mt-2 mb-5 d-flex justify-content-center" data-aos="fade-up"
            >
              <VideoCard
                id={video.id}
                cover={video.cover}
                category={video.category}
                year={video.year}
                videoId={video.videoId}
                type={video.type}
                detailsPage={true}
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
