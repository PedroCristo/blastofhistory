import HeroSection from "../../components/HeroSection";
import VideoCardList from "../../components/VideoCardList";
import Banner1 from "../../components/Banner-1";


function HomePage() {
    return (
    <div>
        <HeroSection />
        <VideoCardList showFeaturedOnly="true" />
        <Banner1 />
    </div>
    )
}

export default HomePage;

