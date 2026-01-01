import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import HowItWorksSection from "./components/HowItWorksSection";
import AcademicPreviewSection from "./components/AcademicPreviewSection";
import CommunitySection from "./components/CommunitySection";
import OpportunitiesSection from "./components/OpportunitiesSection";
import FooterSectionWrapper from "./components/FooterSectionWrapper";
import EventsSection from "./components/EventsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <HowItWorksSection />
      <AcademicPreviewSection />
      <CommunitySection />
      <OpportunitiesSection />
      <EventsSection />
      <FooterSectionWrapper />
    </main>
  );
}
