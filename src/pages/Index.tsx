
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
import { GlitchTransmission } from "@/components/animations/GlitchTransmission";
import { NeonTransmission } from "@/components/animations/NeonTransmission";
import { MatrixTransmission } from "@/components/animations/MatrixTransmission";
import { CyberTransmission } from "@/components/animations/CyberTransmission";

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
    <PageTransmission className="min-h-screen relative overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="fixed inset-0 z-[-2]">
        {/* Animated Matrix Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="cyber-grid" />
        </div>
        
        {/* Floating Geometric Shapes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 border border-cyan-400/20 ${
              i % 2 === 0 ? 'rotate-45' : 'rounded-full'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
        
        {/* Scanning Lines */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-20"
          animate={{
            y: ['-100vh', '100vh'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      
      <Header />
      {!isMobile && <CursorEffect />}
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`relative z-10 ${isMobile ? 'space-y-20' : 'space-y-40'}`}
        >
          <SectionContainer id="hero">
            <TransmissionAnimation direction="down" duration={1.2}>
              <NeonTransmission color="cyan">
                <MatrixTransmission lines={6}>
                  <Hero onScrollDown={scrollToNextSection} />
                </MatrixTransmission>
              </NeonTransmission>
            </TransmissionAnimation>
          </SectionContainer>
          
          <SectionContainer id="about">
            <TransmissionAnimation direction="left" delay={0.3}>
              <CyberTransmission>
                <GlitchTransmission intensity="medium">
                  <div className="relative">
                    <About />
                  </div>
                </GlitchTransmission>
              </CyberTransmission>
            </TransmissionAnimation>
          </SectionContainer>
          
          <SectionContainer id="skills">
            <TransmissionAnimation direction="right" delay={0.4}>
              <MatrixTransmission lines={8}>
                <NeonTransmission color="green">
                  <Skills />
                </NeonTransmission>
              </MatrixTransmission>
            </TransmissionAnimation>
          </SectionContainer>
          
          <SectionContainer id="experience">
            <TransmissionAnimation direction="up" delay={0.5}>
              <CyberTransmission>
                <GlitchTransmission intensity="low">
                  <NeonTransmission color="purple">
                    <Experience />
                  </NeonTransmission>
                </GlitchTransmission>
              </CyberTransmission>
            </TransmissionAnimation>
          </SectionContainer>
          
          <SectionContainer id="portfolio">
            <TransmissionAnimation direction="left" delay={0.3}>
              <NeonTransmission color="pink">
                <MatrixTransmission lines={10}>
                  <GlitchTransmission intensity="high">
                    <Portfolio />
                  </GlitchTransmission>
                </MatrixTransmission>
              </NeonTransmission>
            </TransmissionAnimation>
          </SectionContainer>
          
          <SectionContainer id="certifications">
            <TransmissionAnimation direction="right" delay={0.4}>
              <CyberTransmission>
                <NeonTransmission color="green">
                  <MatrixTransmission lines={5}>
                    <Certifications />
                  </MatrixTransmission>
                </NeonTransmission>
              </CyberTransmission>
            </TransmissionAnimation>
          </SectionContainer>
          
          <SectionContainer id="contact">
            <TransmissionAnimation direction="up" delay={0.5}>
              <GlitchTransmission intensity="medium">
                <NeonTransmission color="cyan">
                  <Contact />
                </NeonTransmission>
              </GlitchTransmission>
            </TransmissionAnimation>
          </SectionContainer>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation dots for desktop */}
      {!isMobile && (
        <NeonTransmission color="cyan">
          <NavigationDots sections={SECTIONS} activeSection={activeSection} />
        </NeonTransmission>
      )}
      
      {/* Scroll to top button */}
      <NeonTransmission color="purple">
        <ScrollToTop showScrollButton={showScrollButton} />
      </NeonTransmission>
      
      {/* Quick action buttons */}
      <CyberTransmission>
        <QuickActionButtons />
      </CyberTransmission>
    </PageTransmission>
  );
};

export default Index;
