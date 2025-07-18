
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Portfolio } from "@/components/Portfolio";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { CursorEffect } from "@/components/CursorEffect";
import Header from "@/components/Header";
import { useIsMobile } from "@/hooks/use-mobile";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { ScrollToTop } from "@/components/navigation/ScrollToTop";
import { NavigationDots } from "@/components/navigation/NavigationDots";
import { QuickActionButtons } from "@/components/navigation/QuickActionButtons";
import { TransmissionAnimation } from "@/components/animations/TransmissionAnimation";
import { PageTransmission } from "@/components/animations/PageTransmission";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { NewsletterSection } from "@/components/NewsletterSection";

// Array of section IDs for navigation
const SECTIONS = ["hero", "about", "skills", "experience", "portfolio", "certifications", "contact"];

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
    <PageTransmission className="min-h-screen relative">
      <Header />
      {!isMobile && <CursorEffect />}
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`${isMobile ? 'space-y-12' : 'space-y-20'}`}
        >
          <SectionContainer id="hero">
            <TransmissionAnimation direction="down" duration={0.8}>
              <Hero onScrollDown={scrollToNextSection} />
            </TransmissionAnimation>
          </SectionContainer>
          
          {/* Add Stats Section after Hero */}
          <StatsSection />
          
          <SectionContainer id="about">
            <TransmissionAnimation direction="left" delay={0.2}>
              <About />
            </TransmissionAnimation>
          </SectionContainer>
          
          <SectionContainer id="skills">
            <TransmissionAnimation direction="right" delay={0.3}>
              <Skills />
            </TransmissionAnimation>
          </SectionContainer>
          
          <SectionContainer id="experience">
            <TransmissionAnimation direction="up" delay={0.4}>
              <Experience />
            </TransmissionAnimation>
          </SectionContainer>
          
          <SectionContainer id="portfolio">
            <TransmissionAnimation direction="left" delay={0.2}>
              <Portfolio />
            </TransmissionAnimation>
          </SectionContainer>
          
          <SectionContainer id="certifications">
            <TransmissionAnimation direction="right" delay={0.3}>
              <Certifications />
            </TransmissionAnimation>
          </SectionContainer>
          
          {/* Add Case Studies Section */}
          <CaseStudiesSection />
          
          {/* Add Testimonials Section */}
          <TestimonialsSection />
          
          {/* Add Newsletter Section */}
          <NewsletterSection />
          
          <SectionContainer id="contact">
            <TransmissionAnimation direction="up" delay={0.4}>
              <Contact />
            </TransmissionAnimation>
          </SectionContainer>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation dots for desktop */}
      {!isMobile && <NavigationDots sections={SECTIONS} activeSection={activeSection} />}
      
      {/* Scroll to top button */}
      <ScrollToTop showScrollButton={showScrollButton} />
      
      {/* Quick action buttons */}
      <QuickActionButtons />
    </PageTransmission>
  );
};

export default Index;
