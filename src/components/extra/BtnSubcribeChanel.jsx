function SubscribeButton() {
    const subscribeUrl = "https://www.youtube.com/@blastofhistory?sub_confirmation=1";
  
    return (
      <a
        href={subscribeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-danger"
      >
        Subscribe Channel
      </a>
    );
  }
  

  export default SubscribeButton;