
import { Helmet } from "react-helmet";
import { PhotoGallery as PhotoGalleryComponent } from "@/components/PhotoGallery";
import Header from "@/components/Header";

const PhotoGallery = () => {
  return (
    <>
      <Helmet>
        <title>Photo Gallery - Lasitha Rajapaksha | Professional Photography Portfolio</title>
        <meta 
          name="description" 
          content="Browse Lasitha Rajapaksha's professional photo gallery showcasing technology, workspace, and career moments. High-quality images from a successful entrepreneur and developer." 
        />
        <meta 
          name="keywords" 
          content="Lasitha Rajapaksha photos, professional photography, entrepreneur photos, developer workspace, technology photos, business photography, portfolio gallery" 
        />
        <meta property="og:title" content="Photo Gallery - Lasitha Rajapaksha | Professional Photography Portfolio" />
        <meta property="og:description" content="Browse professional photos showcasing technology, workspace, and career moments from entrepreneur Lasitha Rajapaksha." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lasitharajapaksha.netlify.app/photo-gallery" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=630&fit=crop" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Professional workspace setup with laptop and technology" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Photo Gallery - Lasitha Rajapaksha" />
        <meta name="twitter:description" content="Professional photo gallery showcasing technology and career moments." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=630&fit=crop" />
        <meta name="twitter:image:alt" content="Professional workspace setup with laptop and technology" />
        <link rel="canonical" href="https://lasitharajapaksha.netlify.app/photo-gallery" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Photo Gallery - Lasitha Rajapaksha",
            "description": "Professional photo gallery showcasing technology, workspace, and career moments",
            "url": "https://lasitharajapaksha.netlify.app/photo-gallery",
            "author": {
              "@type": "Person",
              "name": "Lasitha Rajapaksha",
              "url": "https://lasitharajapaksha.netlify.app"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://lasitharajapaksha.netlify.app"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Photo Gallery",
                  "item": "https://lasitharajapaksha.netlify.app/photo-gallery"
                }
              ]
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Photo Gallery</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore my professional journey through images showcasing technology, workspace, and career milestones.
            </p>
          </div>
          <PhotoGalleryComponent />
        </main>
      </div>
    </>
  );
};

export default PhotoGallery;
