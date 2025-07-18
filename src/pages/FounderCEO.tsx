import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Calendar, ExternalLink, Linkedin, Twitter, Facebook } from "lucide-react";
import Header from "@/components/Header";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";

const FounderCEOPage = () => {
  // Schema.org structured data for the founder
  const founderSchemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Lasitha Rajapaksha",
    "url": "https://me.compress-go.com/",
    "image": "https://video.compress-go.com/ceo.jpeg",
    "jobTitle": "CEO",
    "description": "Lasitha Rajapaksha is a full-stack web developer and software engineer with expertise in building modern, efficient web applications.",
    "knowsAbout": ["React.js", "TypeScript", "Node.js", "Tailwind CSS", "UI/UX Design", "Full Stack Development"],
    "worksFor": {
      "@type": "Organization",
      "name": "CompressGo",
      "url": "/"
    },
    "alumniOf": "University of ##################",
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
    <>
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
        <meta property="og:image" content="https://video.compress-go.com/ceo.jpeg" />
        <meta property="og:url" content="https://me.compress-go.com/founder" />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lasitha Rajapaksha - Founder & CEO | CompressGo" />
        <meta name="twitter:description" content="Meet Lasitha Rajapaksha, Founder & CEO of CompressGo. Expert full-stack developer and entrepreneur." />
        <meta name="twitter:image" content="https://video.compress-go.com/ceo.jpeg" />
        <link rel="canonical" href="https://me.compress-go.com/founder" />
        <script type="application/ld+json">
          {JSON.stringify(founderSchemaData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Enhanced Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20"
          >
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
            <div className="container relative">
              <div className="max-w-4xl mx-auto text-center">
                <motion.img
                  src="https://video.compress-go.com/ceo.jpeg"
                  alt="Lasitha Rajapaksha - Founder & CEO of CompressGo"
                  className="w-40 h-40 rounded-full mx-auto mb-8 object-cover shadow-2xl ring-4 ring-white/10"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Lasitha Rajapaksha
                  </h1>
                  <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8 font-medium">
                    Founder & CEO of CompressGo | Full Stack Developer
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                    Passionate full-stack web developer and software engineer with expertise in building modern, 
                    efficient web applications. Founder of CompressGo, a privacy-focused file compression platform 
                    serving thousands of users worldwide.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    {socialLinks.map((social) => (
                      <Button key={social.platform} size="lg" variant="outline" asChild className="group">
                        <a href={social.url} target="_blank" rel="noopener noreferrer">
                          <social.icon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                          {social.platform}
                          <ExternalLink className="h-4 w-4 ml-2 opacity-50" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Stats Section */}
          <StatsSection />

          {/* About Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-16"
          >
            <div className="container">
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-3xl text-center">About Lasitha Nimesh Rajapaksha</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
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
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-16 bg-muted/30"
          >
            <div className="container">
              <h2 className="text-4xl font-bold mb-12 text-center">Professional Experience</h2>
              <div className="space-y-8 max-w-4xl mx-auto">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-3 text-xl">
                              <Briefcase className="h-6 w-6 text-primary" />
                              {exp.position}
                            </CardTitle>
                            <p className="text-lg font-semibold text-primary mt-1">{exp.company}</p>
                            <p className="text-muted-foreground flex items-center gap-2 mt-1">
                              <Calendar className="h-4 w-4" />
                              {exp.period}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-6 text-base">{exp.description}</p>
                        <div>
                          <h4 className="font-semibold mb-3 text-lg">Key Achievements:</h4>
                          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="leading-relaxed">{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-16"
          >
            <div className="container">
              <h2 className="text-4xl font-bold mb-12 text-center">Technical Expertise</h2>
              <Card className="max-w-4xl mx-auto">
                <CardContent className="pt-8">
                  <div className="flex flex-wrap gap-3 justify-center">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-base py-2 px-4 hover:bg-primary/10 transition-colors">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* CTA Section */}
          <CTASection />
        </main>
      </div>
    </>
  );
};

export default FounderCEOPage;
