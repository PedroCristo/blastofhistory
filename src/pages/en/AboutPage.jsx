import { Helmet } from "react-helmet-async";
import AboutSection from "../../components/AboutSection";

function AboutPage() {
  return (
    <div>
      <Helmet>
        <title>About US - Blast of History</title>
        <meta
          name="description"
          content="Discover the story behind Blast of History, our mission to bring historical events to life, and the team that makes it possible."
        />
        <meta
          name="keywords"
          content="history, blast of history, about us, our story, team"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://blastofhistory.netlify.app/about-page"
        />
      </Helmet>

      <AboutSection />
    </div>
  );
}

export default AboutPage;



