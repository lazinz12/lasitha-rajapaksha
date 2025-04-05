
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Portfolio } from "@/components/Portfolio";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { PhotoGallery } from "@/components/PhotoGallery";
import { CursorEffect } from "@/components/CursorEffect";
import Header from "@/components/Header";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen relative">
      <Header />
      {!isMobile && <CursorEffect />}
      <div className={`${isMobile ? 'space-y-12' : 'space-y-20'}`}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Portfolio />
        <Certifications />
        <Contact />
        <PhotoGallery />
      </div>
    </div>
  );
};

export default Index;
