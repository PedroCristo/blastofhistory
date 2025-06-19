import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="page-404 set-bg d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: "100vh" }}>
      <div className="content-box mb-4">
        <h1 className="title">404</h1>
        <div className="content-item">
          <h2 className="title">Page Not Found</h2>
        </div>
      </div>

      <div className="btn-box w-25">
        <Link to="/" className="btn w-100" aria-label="Go back to the home page">
          <i className="bi bi-arrow-left me-2"></i> Go Back
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;

