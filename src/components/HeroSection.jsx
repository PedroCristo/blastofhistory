import React from "react";
import SubscribeButton from "./extra/BtnSubcribeChanel";
import { Link } from "react-router-dom";

import heroVideo1 from "/videos/large/video_blast_of_history_age_of_exploration_compressed_yourtube.mp4";
import heroVideo2 from "/videos/large/video_blast_of_history_WW2_compressed_yourtube_format.mp4";
import heroShorts1 from "/videos/small/short_blast_of_history_age_of_exploration_compressed_yourtube.mp4";
import heroShorts2 from "/videos/small/short_blast_of_history_WW2_compressed_yourtube_format.mp4";

function HeroSection() {
  const videos = [heroVideo1, heroVideo2];
  const shorts = [heroShorts1, heroShorts2];

  const [selectedVideo] = React.useState(() => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
  });

  const [selectedShort] = React.useState(() => {
    const randomIndex = Math.floor(Math.random() * shorts.length);
    return shorts[randomIndex];
  });

  return (
    <div>
      <div id="heroSection" className="container-100 set-b">
        <video
          className="hero-video show-desktop w-100"
          src={selectedVideo}
          autoPlay
          loop
          muted
          playsInline
        ></video>
        <video
          className="hero-video show-mobile w-100"
          src={selectedShort}
          autoPlay
          loop
          muted
          playsInline
        ></video>
        <div className="video-overlay"></div>
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <h1 className="mb-3 title">Blast Of History Channel</h1>
              <h3 className="mb-3 w-50">
                Your gateway to thrilling historical stories and true events.
              </h3>
              <p className="mb-3 paragraph">
                Explore captivating tales from the past that shaped our world
                today.
              </p>
            </div>
            <div className="row gap-3">
              <div className="col-md-6 col-lg-4 col-sm-12 d-flex justify-content-center">
                <Link to="./about-page" type="button" className="btn">
                  Discover More
                </Link>
              </div>
              <div className="col-md-6 col-lg-4 col-sm-12 d-flex justify-content-center">
                <SubscribeButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
