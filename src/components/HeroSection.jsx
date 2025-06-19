import SubscribeButton from "./extra/BtnSubcribeChanel";

function HeroSection() {
  return (
    <div>
      <div id="heroSection" className="container-100 set-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-12">
              <h1 className="mb-3 title">Blast Of History Channel</h1>
              <h3 className="mb-3">
                Your gateway to thrilling historical stories and true events.
              </h3>
              <p className="mb-3">
                Explore captivating tales from the past that shaped our world
                today.
              </p>
            </div>
            <div className="row d-flex flex-row align-items-center gap-3">
              <div className="col-md-3">
                <a type="button" className="btn">
                  Discover More
                </a>
              </div>
              <div className="col-md-3">
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
