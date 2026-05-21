import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import WhyXcalex from "@/components/WhyXcalex";
import Metrics from "@/components/Metrics";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import TechStack from "@/components/TechStack";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Authority from "@/components/Authority";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <WhyXcalex />
      <Metrics />
      <Process />
      <CaseStudies />
      <Portfolio />
      <TechStack />
      <Pricing />
      <Authority />
      <FinalCTA />
      <Footer />
    </main>
  );
}
