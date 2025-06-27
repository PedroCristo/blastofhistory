import { Helmet } from "react-helmet-async";
import ContactSection from "../../components/ContactForm";

function ContactPage() {
  return (
    <div>
      <Helmet>
        <title>Contact Blast of History</title>
        <meta
          name="description"
          content="Get in touch with Blast of History for questions, feedback, or collaborations."
        />
        <meta
          name="keywords"
          content="history, blast of history, contact, feedback, collaboration"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://blastofhistory.netlify.app/contact-page"
        />
      </Helmet>

      <ContactSection />
    </div>
  );
}

export default ContactPage;

