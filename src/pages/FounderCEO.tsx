
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Calendar, ExternalLink, Linkedin, Twitter, Facebook } from "lucide-react";
import Header from "@/components/Header";

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
        
        <main className="container py-12">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="max-w-4xl mx-auto">
              <motion.img
                src="https://video.compress-go.com/ceo.jpeg"
                alt="Lasitha Rajapaksha - Founder & CEO of CompressGo"
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Lasitha Rajapaksha
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
                Founder & CEO of CompressGo | Full Stack Developer
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Passionate full-stack web developer and software engineer with expertise in building modern, 
                efficient web applications. Founder of CompressGo, a privacy-focused file compression platform 
                serving thousands of users worldwide.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {socialLinks.map((social) => (
                  <Button key={social.platform} variant="outline" asChild>
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      <social.icon className="h-4 w-4 mr-2" />
                      {social.platform}
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </motion.section>

          {/* About Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">About Lasitha Nimesh Rajapaksha</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
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
          </motion.section>

          {/* Experience Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Professional Experience</h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5" />
                            {exp.position}
                          </CardTitle>
                          <p className="text-lg font-semibold text-primary">{exp.company}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {exp.period}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                      <div>
                        <h4 className="font-semibold mb-2">Key Achievements:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Technical Expertise</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  Interested in collaborating or learning more about my work? 
                  Feel free to connect with me on social media or explore my projects.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {socialLinks.map((social) => (
                    <Button key={social.platform} variant="default" asChild>
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        <social.icon className="h-4 w-4 mr-2" />
                        Connect on {social.platform}
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </main>
      </div>
    </>
  );
};

export default FounderCEOPage;
