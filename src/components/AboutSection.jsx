function AboutSection() {
  return (
    <div className="container my-5 about section">
      <div className="row align-items-center">
        {/* Text Section */}
        <div className="col-md-8">
          <h2 className="interactive-color mb-3 title">
            About Blast of History
          </h2>
          <h4 className="text-mute mb-4 subtile">Uncovering the Untold</h4>
          <p>
            <strong>
              Blast of History is more than just a history channel — it’s a time
              machine.
            </strong>{" "}
            We dive deep into the forgotten corners of the past, unearthing true
            stories that still spark curiosity today. From daring heists to
            unexplained disappearances, from wartime escapes to Cold War spy
            games, each episode brings history back with tension, drama, and
            detail.
          </p>

          <p>
            <strong>
              The idea behind the channel is simple: make history thrilling
              again.
            </strong>{" "}
            Many people think of history as dusty textbooks or boring lectures —
            but real history is filled with mystery, courage, betrayal, and
            survival. With a cinematic approach, dramatic narration, and
            carefully chosen AI visuals, <em>Blast of History</em> turns every
            episode into a short film that leaves you wanting more.
          </p>

          <p>
            <strong>
              Every story we tell is rooted in fact — but delivered with flair.
            </strong>{" "}
            Whether we’re unraveling the enigma of D.B. Cooper, escaping
            Alcatraz, or flying through the skies in WWII dogfights, the goal is
            always the same: to captivate your imagination while teaching you
            something real. We highlight not just events, but the people,
            emotions, and consequences behind them.
          </p>

          <p>
            <strong>
              Our audience isn’t just watching — they’re part of the mystery.
            </strong>{" "}
            Each video ends with a question, inviting viewers to share their
            thoughts, theories, and interpretations. History doesn’t have one
            version — and your voice helps us explore it from all sides. It’s a
            community built around curiosity and discussion.
          </p>

          <p className="mb-5">
            <strong>Blast of History is constantly evolving.</strong> From
            YouTube Shorts to full-length episodes, we are expanding our formats
            and platforms — including TikTok, Instagram, and beyond. Our mission
            is to make history accessible, exciting, and unforgettable for a new
            generation of thinkers, dreamers, and storytellers.
          </p>

          <span className="interactive-color sub-title box-shadow p-3">Blast of History Team</span>
        </div>

        {/* Image Section */}
        <div
          className="col-md-4 d-flex justify-content-center align-items-center mt-5"
          style={{ minHeight: "100vh" }}
        >
          <img
            src="/images/small/vertical/blast_of_history.webp"
            alt="Blast of History visual"
            className="img-fluid rounded box-shadow"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
