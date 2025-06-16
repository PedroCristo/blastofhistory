import PropTypes from "prop-types";

function Banner({ title, image1, alt1, text1, image2, alt2, text2 }) {
  return (
    <div>
      <div className="container-fluid banner">
        <div id="banner" className="container banner text-center">
         <h2 className="title box-shadow w-75 pt-2 pb-2 mrgin-0 text-center">{title}</h2>
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center flex-column align-items-center">
              <img className="box-shadow" src={image1} alt={alt1} />
              <span className="w-75 paragraph">{text1}</span>
            </div>
            <div className="col-md-6 d-flex justify-content-center flex-column align-items-center">
              <img className="box-shadow" src={image2} alt={alt2} />
              <span className="w-75 paragraph">{text2}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Banner.propTypes = {
  title: PropTypes.string.isRequired,
  image1: PropTypes.string.isRequired,
  alt1: PropTypes.string.isRequired,
  text1: PropTypes.string.isRequired,
  image2: PropTypes.string.isRequired,
  alt2: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
};

export default Banner;
