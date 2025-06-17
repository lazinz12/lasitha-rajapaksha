
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import { PhotoGallery as PhotoGalleryComponent } from "@/components/PhotoGallery";

const PhotoGallery = () => {
  return (
    <>
      <Helmet>
        <title>Photo Gallery - Creative Photography | Lasitha Rajapaksha</title>
        <meta 
          name="description" 
          content="Explore my creative photography portfolio featuring landscapes, portraits, and artistic compositions. Professional photography showcasing visual storytelling and technical expertise." 
        />
        <meta 
          name="keywords" 
          content="photo gallery, photography portfolio, creative photography, landscape photography, portrait photography, visual storytelling, professional photographer" 
        />
        <meta property="og:title" content="Photo Gallery - Creative Photography" />
        <meta property="og:description" content="Explore my creative photography portfolio featuring diverse subjects and artistic compositions." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Photo Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A curated collection of my photography work, capturing moments and telling stories through the lens.
            </p>
          </div>
          <PhotoGalleryComponent />
        </main>
      </div>
    </>
  );
};

export default PhotoGallery;
