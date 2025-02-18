
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

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <CursorEffect />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Portfolio />
      <PhotoGallery />
      <Certifications />
      <Contact />
    </div>
  );
};

export default Index;
