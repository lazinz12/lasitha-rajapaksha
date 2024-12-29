import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Portfolio } from "@/components/Portfolio";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { CursorEffect } from "@/components/CursorEffect";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <CursorEffect />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Portfolio />
      <Certifications />
      <Contact />
    </div>
  );
};

export default Index;