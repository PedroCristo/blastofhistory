const Preloader = () => {
  return (
    <div className="preloader-overlay" role="status" aria-label="Loading">
      <div className="preloder-box">
        <img
          src="images/small/blast-of-history-300x300.jpg"
          className="rounded-circle"
          alt="Blast of History Logo"
          height="150"
          width="150" // add width for consistency
        />
        <div className="preloader-spinner"></div>
      </div>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Preloader;
