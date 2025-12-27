import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import HowItWorksSection from "./components/HowItWorksSection";
import AcademicPreviewSection from "./components/AcademicPreviewSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <HowItWorksSection />
      <AcademicPreviewSection />
    </main>
  );
}
