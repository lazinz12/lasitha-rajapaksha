
import { Helmet } from "react-helmet";
import { PhotoGallery as PhotoGalleryComponent } from "@/components/PhotoGallery";
import Header from "@/components/Header";

const PhotoGallery = () => {
  return (
    <>
      <Helmet>
        <title>Photo Gallery - Lasitha Rajapaksha | Professional Portfolio Photos</title>
        <meta 
          name="description" 
          content="Browse through Lasitha Rajapaksha's professional photo gallery showcasing career highlights, workspace setups, and technology focus. High-quality portfolio images." 
        />
        <meta 
          name="keywords" 
          content="Lasitha Rajapaksha photos, professional portfolio, career gallery, workspace photos, technology images, developer photos, forex trader images" 
        />
        <meta property="og:title" content="Photo Gallery - Lasitha Rajapaksha Professional Portfolio" />
        <meta property="og:description" content="Browse through professional photos showcasing Lasitha Rajapaksha's career highlights and workspace." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://lasitharajapaksha.netlify.app/photo-gallery" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Professional Photo Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore my professional journey through this curated collection of photos showcasing 
              my workspace, technology focus, and career highlights.
            </p>
          </div>
          <PhotoGalleryComponent />
        </main>
      </div>
    </>
  );
};

export default PhotoGallery;
