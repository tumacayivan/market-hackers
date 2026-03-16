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
  return (
    <div className="min-h-screen">
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
