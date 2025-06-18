
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Calendar, ExternalLink, Linkedin, Twitter, Facebook } from "lucide-react";
import Header from "@/components/Header";
import { GlitchTransmission } from "@/components/animations/GlitchTransmission";
import { NeonTransmission } from "@/components/animations/NeonTransmission";
import { MatrixTransmission } from "@/components/animations/MatrixTransmission";
import { CyberTransmission } from "@/components/animations/CyberTransmission";
import { TransmissionAnimation } from "@/components/animations/TransmissionAnimation";
import { PageTransmission } from "@/components/animations/PageTransmission";

const FounderCEOPage = () => {
  // Schema.org structured data for the founder
  const founderSchemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Lasitha Rajapaksha",
    "url": "https://me.compress-go.com/",
    "image": "/lovable-uploads/a2b6e303-1967-404d-96fd-88120fe20bc3.png",
    "jobTitle": "CEO",
    "description": "Lasitha Rajapaksha is a full-stack web developer and software engineer with expertise in building modern, efficient web applications.",
    "knowsAbout": ["React.js", "TypeScript", "Node.js", "Tailwind CSS", "UI/UX Design", "Full Stack Development"],
    "worksFor": {
      "@type": "Organization",
      "name": "CompressGo",
      "url": "/"
    },
    "alumniOf": "University of Technology",
    "sameAs": ["https://www.linkedin.com/in/lasitha-rajapaksha/", "https://twitter.com/tlasiya", "https://www.facebook.com/lasinsrajj"]
  };

  // Experience data
  const experiences = [{
    company: "CompressGo",
    position: "Founder & CEO",
    period: "2022 - Present",
    description: "Founded and developed CompressGo, a free online platform providing privacy-focused file compression tools.",
    achievements: ["Built entire platform from concept to production", "Implemented client-side processing for enhanced privacy", "Optimized compression algorithms for various file formats"]
  }, {
    company: "Invoice Generator",
    position: "Founder & CEO",
    period: "2024 - Present",
    description: "Led development of enterprise web applications with focus on performance and user experience.",
    achievements: ["Reduced application load time by 40%", "Implemented microservices architecture", "Mentored junior developers"]
  }, {
    company: "Lasins Raj Dev",
    position: "Founder & CEO",
    period: "2022 - Present",
    description: "Developed responsive web interfaces for client projects using modern JavaScript frameworks.",
    achievements: ["Created component library used across multiple projects", "Implemented automated testing processes", "Improved UI/UX for several major clients"]
  }];

  const skills = [
    "React.js", "TypeScript", "Node.js", "Tailwind CSS", "UI/UX Design", 
    "Full Stack Development", "Python", "Django", "JavaScript", "HTML5", 
    "CSS3", "MongoDB", "PostgreSQL", "Git", "Docker"
  ];

  const socialLinks = [
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/lasitha-rajapaksha/", icon: Linkedin },
    { platform: "Twitter", url: "https://twitter.com/tlasiya", icon: Twitter },
    { platform: "Facebook", url: "https://www.facebook.com/lasinsrajj", icon: Facebook }
  ];

  return (
    <PageTransmission>
      <Helmet>
        <title>Lasitha Rajapaksha - Founder & CEO | CompressGo Founder | Full Stack Developer</title>
        <meta
          name="description"
          content="Meet Lasitha Rajapaksha, Founder & CEO of CompressGo. Expert full-stack developer specializing in React, TypeScript, and modern web technologies. Learn about his journey and achievements."
        />
        <meta
          name="keywords"
          content="lasitha, lasitha nimesh, lasitha rajapaksha, lasitha nimesh rajapaksha, compressgo ceo, compressgo founder, compress go ceo, compress go founder, full stack developer, react developer, typescript expert"
        />
        <meta property="og:title" content="Lasitha Rajapaksha - Founder & CEO | CompressGo" />
        <meta property="og:description" content="Meet Lasitha Rajapaksha, Founder & CEO of CompressGo. Expert full-stack developer and entrepreneur." />
        <meta property="og:image" content="/lovable-uploads/a2b6e303-1967-404d-96fd-88120fe20bc3.png" />
        <meta property="og:url" content="https://me.compress-go.com/founder" />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lasitha Rajapaksha - Founder & CEO | CompressGo" />
        <meta name="twitter:description" content="Meet Lasitha Rajapaksha, Founder & CEO of CompressGo. Expert full-stack developer and entrepreneur." />
        <meta name="twitter:image" content="/lovable-uploads/a2b6e303-1967-404d-96fd-88120fe20bc3.png" />
        <link rel="canonical" href="https://me.compress-go.com/founder" />
        <script type="application/ld+json">
          {JSON.stringify(founderSchemaData)}
        </script>
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        {/* Futuristic Background */}
        <div className="fixed inset-0 z-[-2]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
          
          {/* Tech Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
          
          {/* Floating Particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -200, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 2, 0.5],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                delay: i * 0.7,
              }}
            />
          ))}
        </div>
        
        <Header />
        
        <main className="container py-12 relative z-10">
          {/* Hero Section */}
          <TransmissionAnimation direction="down" duration={1.0}>
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="max-w-4xl mx-auto">
                <CyberTransmission>
                  <NeonTransmission color="cyan">
                    <motion.div
                      className="relative inline-block mb-6"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src="/lovable-uploads/a2b6e303-1967-404d-96fd-88120fe20bc3.png"
                        alt="Lasitha Rajapaksha - Founder & CEO of CompressGo"
                        className="w-40 h-40 rounded-full mx-auto object-cover shadow-2xl shadow-cyan-500/30 ring-4 ring-cyan-400/50"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 to-purple-500/20 animate-pulse" />
                    </motion.div>
                  </NeonTransmission>
                </CyberTransmission>
                
                <GlitchTransmission intensity="low">
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent neon-text">
                    Lasitha Rajapaksha
                  </h1>
                </GlitchTransmission>
                
                <MatrixTransmission lines={3}>
                  <h2 className="text-xl md:text-2xl text-green-400 mb-6 font-mono">
                    &gt; Founder & CEO of CompressGo | Full Stack Developer
                  </h2>
                </MatrixTransmission>
                
                <NeonTransmission color="purple">
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                    Passionate full-stack web developer and software engineer with expertise in building modern, 
                    efficient web applications. Founder of CompressGo, a privacy-focused file compression platform 
                    serving thousands of users worldwide.
                  </p>
                </NeonTransmission>
                
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.platform}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <NeonTransmission color="cyan">
                        <Button variant="outline" asChild className="cyber-border hover:bg-cyan-500/10">
                          <a href={social.url} target="_blank" rel="noopener noreferrer">
                            <social.icon className="h-4 w-4 mr-2" />
                            {social.platform}
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </a>
                        </Button>
                      </NeonTransmission>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          </TransmissionAnimation>

          {/* About Section */}
          <TransmissionAnimation direction="left" delay={0.2}>
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <CyberTransmission>
                <Card className="cyber-border bg-background/50 backdrop-blur-xl">
                  <CardHeader>
                    <GlitchTransmission intensity="low">
                      <CardTitle className="text-2xl text-cyan-400">About Lasitha Nimesh Rajapaksha</CardTitle>
                    </GlitchTransmission>
                  </CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none">
                    <MatrixTransmission lines={2}>
                      <div className="space-y-4 text-muted-foreground">
                        <p>
                          Lasitha Rajapaksha is a visionary entrepreneur and accomplished full-stack developer who has made 
                          significant contributions to the web development industry. As the Founder and CEO of CompressGo, 
                          he has revolutionized online file compression by prioritizing user privacy and implementing 
                          client-side processing technologies.
                        </p>
                        <p>
                          With expertise spanning across modern web technologies including React.js, TypeScript, Node.js, 
                          and Tailwind CSS, Lasitha has built scalable applications that serve users globally. His commitment 
                          to creating privacy-focused tools has set new standards in the industry.
                        </p>
                        <p>
                          Beyond CompressGo, Lasitha continues to innovate with projects like Invoice Generator and his 
                          development consultancy, Lasins Raj Dev, helping businesses build efficient, user-centric web solutions.
                        </p>
                      </div>
                    </MatrixTransmission>
                  </CardContent>
                </Card>
              </CyberTransmission>
            </motion.section>
          </TransmissionAnimation>

          {/* Experience Section */}
          <TransmissionAnimation direction="right" delay={0.3}>
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <NeonTransmission color="green">
                <h2 className="text-3xl font-bold mb-8 text-center holographic">Professional Experience</h2>
              </NeonTransmission>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CyberTransmission>
                      <Card className="cyber-border bg-background/30 backdrop-blur-xl hover:bg-background/50 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <GlitchTransmission intensity="low">
                                <CardTitle className="flex items-center gap-2 text-cyan-400">
                                  <Briefcase className="h-5 w-5" />
                                  {exp.position}
                                </CardTitle>
                              </GlitchTransmission>
                              <p className="text-lg font-semibold text-purple-400">{exp.company}</p>
                              <p className="text-sm text-green-400 flex items-center gap-1 font-mono">
                                <Calendar className="h-4 w-4" />
                                {exp.period}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <MatrixTransmission lines={1}>
                            <p className="text-muted-foreground mb-4">{exp.description}</p>
                            <div>
                              <h4 className="font-semibold mb-2 text-cyan-400">Key Achievements:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                {exp.achievements.map((achievement, i) => (
                                  <li key={i}>{achievement}</li>
                                ))}
                              </ul>
                            </div>
                          </MatrixTransmission>
                        </CardContent>
                      </Card>
                    </CyberTransmission>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </TransmissionAnimation>

          {/* Skills Section */}
          <TransmissionAnimation direction="up" delay={0.4}>
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <NeonTransmission color="purple">
                <h2 className="text-3xl font-bold mb-8 text-center holographic">Technical Expertise</h2>
              </NeonTransmission>
              <CyberTransmission>
                <Card className="cyber-border bg-background/30 backdrop-blur-xl">
                  <CardContent className="pt-6">
                    <MatrixTransmission lines={4}>
                      <div className="flex flex-wrap gap-3">
                        {skills.map((skill, index) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <GlitchTransmission intensity="low">
                              <Badge 
                                variant="secondary" 
                                className="text-sm py-2 px-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-300 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300"
                              >
                                {skill}
                              </Badge>
                            </GlitchTransmission>
                          </motion.div>
                        ))}
                      </div>
                    </MatrixTransmission>
                  </CardContent>
                </Card>
              </CyberTransmission>
            </motion.section>
          </TransmissionAnimation>

          {/* Contact Section */}
          <TransmissionAnimation direction="down" delay={0.5}>
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <NeonTransmission color="cyan">
                <Card className="cyber-border bg-background/30 backdrop-blur-xl">
                  <CardHeader>
                    <GlitchTransmission intensity="medium">
                      <CardTitle className="text-2xl text-center text-cyan-400">Get in Touch</CardTitle>
                    </GlitchTransmission>
                  </CardHeader>
                  <CardContent className="text-center">
                    <MatrixTransmission lines={2}>
                      <p className="text-muted-foreground mb-6">
                        Interested in collaborating or learning more about my work? 
                        Feel free to connect with me on social media or explore my projects.
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        {socialLinks.map((social, index) => (
                          <motion.div
                            key={social.platform}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <CyberTransmission>
                              <Button variant="default" asChild className="cyber-border bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400">
                                <a href={social.url} target="_blank" rel="noopener noreferrer">
                                  <social.icon className="h-4 w-4 mr-2" />
                                  Connect on {social.platform}
                                </a>
                              </Button>
                            </CyberTransmission>
                          </motion.div>
                        ))}
                      </div>
                    </MatrixTransmission>
                  </CardContent>
                </Card>
              </NeonTransmission>
            </motion.section>
          </TransmissionAnimation>
        </main>
      </div>
    </PageTransmission>
  );
};

export default FounderCEOPage;
