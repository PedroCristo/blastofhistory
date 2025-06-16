import React from "react";
import VideoCard from "./VideoCard";
import videos from "../data/videos";

function VideoCardList({ showFeaturedOnly = false }) {
  // Filter videos if showFeaturedOnly is true
  const filteredVideos = showFeaturedOnly
    ? videos.filter(video => video.featured)
    : videos;

  return (
    <div className="card-list d-flex flex-wrap justify-content-center">
      {filteredVideos.map(video => (
        <div key={video.id} className="col-lg-3 col-md-6 col-sm-12 text-center">
          <VideoCard
            cover={video.cover}
            category={video.category}
            year={video.year}
            videoId={video.videoId} 
          />
        </div>
      ))}
    </div>
  );
}

export default VideoCardList;