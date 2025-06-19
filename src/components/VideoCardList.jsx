import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebaseConfig";
import VideoCard from "./VideoCard";

function VideoCardList({ showFeaturedOnly = false }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to clean strings of extra quotes
  const cleanString = (str) => {
    if (typeof str === "string") {
      return str.replace(/^"(.*)"$/, "$1").trim();
    }
    return str;
  };

  useEffect(() => {
    async function fetchVideos() {
      try {
        const querySnapshot = await getDocs(collection(db, "shorts"));
        const videoData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            category: cleanString(data.category),
            cover: cleanString(data.cover),
            description: cleanString(data.description),
            edition: cleanString(data.edition),
            featured: data.featured,
            show: data.show,
            subTitle: cleanString(data.subTitle),
            title: cleanString(data.title),
            videoId: cleanString(data.videoId),
            year: data.year,
          };
        });
        console.log("Videos fetched from Firestore:", videoData);
        setVideos(videoData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error loading videos: {error.message}</p>;
  if (!videos.length) return <p>No videos found.</p>;

  const filteredVideos = showFeaturedOnly
    ? videos.filter((video) => video.featured === true)
    : videos;

  return (
    <div className="card-list d-flex flex-wrap justify-content-center">
      {filteredVideos.map((video) => {
        const cleanUrl = video.cover ? video.cover.trim() : "";
        return (
          <div
            key={video.id}
            className="col-lg-3 col-md-6 col-sm-12 text-center"
          >
            <VideoCard
              id={video.id}
              cover={cleanUrl}
              category={video.category}
              year={video.year}
              title={video.title}
              videoId={video.videoId}
              type="shorts"
              mode="modal"
            />
          </div>
        );
      })}
    </div>
  );
}

export default VideoCardList;
