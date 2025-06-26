import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebaseConfig";
import VideoCard from "./VideoCard";
import PropTypes from "prop-types";

function VideoCardList({ showFeaturedOnly = false }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="container-fluid">
      <div className="row card-list d-flex flex-wrap justify-content-center">
        {filteredVideos.map((video) => {
          const cleanUrl = video.cover ? video.cover.trim() : "";
          return (
            <div
              key={video.id}
              className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center"  data-aos="fade-up"
            >
             <VideoCard
                id={video.id}
                cover={video.cover ? video.cover.trim() : ""}
                category={video.category}
                year={video.year}
                videoId={video.videoId}
                mode="link"
                type="shorts"
                title={video.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

VideoCardList.propTypes = {
  showFeaturedOnly: PropTypes.bool,
};

VideoCardList.defaultProps = {
  showFeaturedOnly: false,
};

export default VideoCardList;
