
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Code, ChevronDown, Activity } from "lucide-react";
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
import { Button } from "@/components/ui/button";

const Index = () => {
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  // Track scroll position to update active section and show scroll button
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Show scroll button after scrolling past hero section
      setShowScrollButton(scrollPosition > window.innerHeight / 2);
      
      // Find current section based on scroll position
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  // Scroll to next section function
  const scrollToNextSection = () => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      const nextSectionTop = heroSection.offsetTop + heroSection.offsetHeight;
      window.scrollTo({
        top: nextSectionTop,
        behavior: "smooth",
      });
    }
  };
  
  return (
    <div className="min-h-screen relative">
      <Header />
      {!isMobile && <CursorEffect />}
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`${isMobile ? 'space-y-12' : 'space-y-20'}`}
        >
          <section id="hero">
            <Hero onScrollDown={scrollToNextSection} />
          </section>
          
          <section id="about">
            <About />
          </section>
          
          <section id="skills">
            <Skills />
          </section>
          
          <section id="experience">
            <Experience />
          </section>
          
          <section id="portfolio">
            <Portfolio />
          </section>
          
          <section id="certifications">
            <Certifications />
          </section>
          
          <section id="contact">
            <Contact />
          </section>
          
          <section id="gallery">
            <PhotoGallery />
          </section>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation dots for desktop */}
      {!isMobile && (
        <motion.div 
          className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col items-center space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          {["hero", "about", "skills", "experience", "portfolio", "certifications", "contact", "gallery"].map((section) => (
            <motion.div
              key={section}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                activeSection === section ? "bg-primary w-4 h-4" : "bg-gray-300"
              }`}
              whileHover={{ scale: 1.5 }}
              onClick={() => {
                const element = document.getElementById(section);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              title={section.charAt(0).toUpperCase() + section.slice(1)}
            />
          ))}
        </motion.div>
      )}
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.div
            className="fixed bottom-8 right-8 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="icon"
              className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-white transition-all duration-300"
            >
              <ChevronDown className="h-5 w-5 rotate-180" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Quick action buttons */}
      <motion.div
        className="fixed left-8 bottom-8 z-40 hidden lg:flex flex-col space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <a href="/tools/background-remover">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-white transition-all duration-300"
            title="Background Remover Tool"
          >
            <Code className="h-5 w-5" />
          </Button>
        </a>
        <a href="/trading-ideas">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-white transition-all duration-300"
            title="Trading Ideas"
          >
            <Activity className="h-5 w-5" />
          </Button>
        </a>
        <a href="/blog">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-white transition-all duration-300"
            title="Blog"
          >
            <Briefcase className="h-5 w-5" />
          </Button>
        </a>
      </motion.div>
    </div>
  );
};

export default Index;
