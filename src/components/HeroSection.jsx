import SubscribeButton from "./extra/BtnSubcribeChanel";
import { Link } from "react-router-dom";
import heroVideo from "/videos/video.mp4"; // Adjust path as needed

function HeroSection() {
  return (
    <div>
      <div id="heroSection" className="container-100 set-b">
        <video
          className="hero-video w-100"
          src={heroVideo}
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
