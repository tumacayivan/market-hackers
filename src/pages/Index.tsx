import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import TerminalSection from "@/components/TerminalSection";
import ManifestoSection from "@/components/ManifestoSection";
import PathSection from "@/components/PathSection";
import StatsSection from "@/components/StatsSection";
import ApproachSection from "@/components/ApproachSection";
import GlobalNetworkSection from "@/components/GlobalNetworkSection";
import NeuralNetSection from "@/components/NeuralNetSection";
import ToolsSection from "@/components/ToolsSection";
import SurveillanceSection from "@/components/SurveillanceSection";
import CityGridSection from "@/components/CityGridSection";
import CommunitySection from "@/components/CommunitySection";
import SocialSection from "@/components/SocialSection";
import FAQSection from "@/components/FAQSection";
import JoinSection from "@/components/JoinSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = backgroundAudioRef.current;
    if (!audio) return;

    const tryPlay = async () => {
      try {
        await audio.play();
        return !audio.paused;
      } catch {
        // Browsers can block autoplay with sound until user interacts.
        return false;
      }
    };

    void tryPlay();

    const cleanupListeners = () => {
      window.removeEventListener("click", resumePlayback);
      window.removeEventListener("keydown", resumePlayback);
      window.removeEventListener("touchstart", resumePlayback);
      window.removeEventListener("touchmove", resumePlayback);
      window.removeEventListener("scroll", resumePlayback);
      window.removeEventListener("wheel", resumePlayback);
      window.removeEventListener("pointerdown", resumePlayback);
      document.removeEventListener("visibilitychange", resumePlayback);
    };

    const resumePlayback = async () => {
      const didStart = await tryPlay();
      if (didStart) {
        cleanupListeners();
      }
    };

    window.addEventListener("click", resumePlayback);
    window.addEventListener("keydown", resumePlayback);
    window.addEventListener("touchstart", resumePlayback);
    window.addEventListener("touchmove", resumePlayback, { passive: true });
    window.addEventListener("scroll", resumePlayback, { passive: true });
    window.addEventListener("wheel", resumePlayback, { passive: true });
    window.addEventListener("pointerdown", resumePlayback);
    document.addEventListener("visibilitychange", resumePlayback);

    return () => {
      cleanupListeners();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <audio ref={backgroundAudioRef} autoPlay loop preload="auto">
        <source src="/Market Hackers 3.mp3" type="audio/mpeg" />
      </audio>
      <Navbar />
      <HeroSection />
      <MissionSection />
      <TerminalSection />
      <ManifestoSection />
      <PathSection />
      <StatsSection />
      <GlobalNetworkSection />
      <ApproachSection />
      <NeuralNetSection />
      <ToolsSection />
      <SurveillanceSection />
      <CityGridSection />
      <CommunitySection />
      <SocialSection />
      <FAQSection />
      <JoinSection />
      <FooterSection />
    </div>
  );
};

export default Index;
