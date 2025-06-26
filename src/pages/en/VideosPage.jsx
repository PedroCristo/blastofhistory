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
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

// Clean up string fields
const cleanString = (str) =>
  typeof str === "string" ? str.replace(/^"(.*)"$/, "$1").trim() : str;

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // initial filter state: category:All
  const [selectedFilter, setSelectedFilter] = useState("category:All");

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      try {
        const snap = await getDocs(collection(db, "videos"));
        const data = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((v) => v.show !== false);
        setVideos(data);
      } catch (e) {
        console.error(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  const cleaned = videos
    .filter((v) => (v.type || "").toLowerCase() === "videos")
    .map((v) => ({
      ...v,
      category: cleanString(v.category),
      edition: cleanString(v.edition),
      cover: cleanString(v.cover),
      videoId: cleanString(v.videoId),
      subTitle: cleanString(v.subTitle),
      title: cleanString(v.title),
      year: v.year,
    }));

  // categories list
  const categories = [
    "All",
    ...Array.from(new Set(cleaned.map((v) => v.category).filter(Boolean))),
  ];

  // filter logic
  const filtered =
    selectedFilter === "category:All"
      ? cleaned
      : cleaned.filter((v) => {
          const [type, value] = selectedFilter.split(":");
          return normalizeKey(v[type]) === normalizeKey(value);
        });

  // background images
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
    BLASTOFHISTORY: "/images/large/blast-of-history-all-2-banner.png",
    SKYLEGENDS: "/images/large/blast-of-history-sky-legends-banner.png",
  };

  const pageTitles = {
    ALL: "All Videos",
    WWI: "WWI Videos",
    WWII: "WWII Videos",
    SKYLEGENDS: "Sky Legends Videos",
    CRIME: "Crime Videos",
    MISTERY: "Mystery Videos",
    AGEOFEXPLORATION: "Age of Exploration Videos",
  };

  let backgroundKey = "ALL";
  let pageTitle = "All Videos";

  if (selectedFilter) {
    const [type, value] = selectedFilter.split(":");
    const key = normalizeKey(value);
    backgroundKey = bgImages[key] ? key : "ALL";
    pageTitle =
      type === "category"
        ? pageTitles[key] || `${formatLabel(value)} Videos`
        : `${formatLabel(value)} Series Videos`;
  }

  const backgroundUrl = bgImages[backgroundKey];

  if (loading) return <p className="mt-5">Loading videos...</p>;
  if (error) return <p className="mt-5">Error: {error.message}</p>;

  return (
    <div className="Videos-page section p-0">
      <section
        className="zoom-background"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="zoom-bg-layer" />
        <div className="overlay" />
        <div className="content">
          <h1 className="mb-4 interactive-color title">{pageTitle}</h1>
        </div>
      </section>

      <div className="container-xxl mt-4 mb-4">
        <div className="row">
          <div className="col-md-12 d-flex flex-column align-items-end">
            <h3 className="interactive-color mb-0">
              Filter by Category or Edition
            </h3>
            <select
              className="form-select w-auto mt-2"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="category:All">All</option>
              <optgroup label="Categories">
                {categories
                  .filter((c) => c !== "All")
                  .map((c) => (
                    <option key={c} value={`category:${c}`}>
                      {c}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Editions">
                {["Blast of History", "Sky Legends"].map((ed) => (
                  <option key={ed} value={`edition:${ed}`}>
                    {ed}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row section video-container">
          {filtered.length === 0 ? (
            <h2 className="text-center mt-5 mb-5">No videos found for this search!! </h2>
          ) : (
            filtered.map((video) => (
              <div
                key={video.id}
                className="col-lg-3 col-md-4 col-sm-6 col-12 mt-2 mb-5 d-flex justify-content-center"
                data-aos="fade-up"
              >
                <VideoCard
                  id={video.id}
                  cover={video.cover}
                  category={video.category}
                  year={video.year}
                  videoId={video.videoId}
                  type={video.type}
                  mode="link"
                  detailsPage={true}
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
