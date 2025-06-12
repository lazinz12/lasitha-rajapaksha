
import { Helmet } from "react-helmet";
import { AdvancedMetadataRemover } from "@/components/tools/AdvancedMetadataRemover";
import Header from "@/components/Header";

const MetadataRemoverPage = () => {
  return (
    <>
      <Helmet>
        <title>Advanced Image Metadata Remover - Remove EXIF Data Online | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Advanced free online tool to remove metadata and EXIF data from images. Batch processing, drag & drop, and complete privacy protection by stripping location, camera, and other sensitive information from photos."
        />
        <meta name="keywords" content="metadata remover, EXIF remover, privacy, image cleaner, batch processing" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Advanced Image Metadata Remover
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Protect your privacy with our advanced metadata removal tool. Process multiple images at once with complete security.
            </p>
          </div>
          
          <AdvancedMetadataRemover />
          
          <div className="max-w-4xl mx-auto mt-12">
            <div className="prose dark:prose-invert max-w-none">
              <h2>Why Remove Image Metadata?</h2>
              <p>
                Digital images often contain hidden metadata (EXIF data) that can reveal sensitive information 
                about when and where the photo was taken, what device was used, and even GPS coordinates. 
                Removing this data is crucial for protecting your privacy when sharing images online.
              </p>
              
              <h2>Advanced Features</h2>
              <ul>
                <li><strong>Batch Processing:</strong> Upload and process multiple images simultaneously</li>
                <li><strong>Drag & Drop Interface:</strong> Simply drag images directly into the browser</li>
                <li><strong>Real-time Progress:</strong> Watch your images being processed with live progress indicators</li>
                <li><strong>Side-by-side Comparison:</strong> Compare original and cleaned versions instantly</li>
                <li><strong>Batch Download:</strong> Download all cleaned images at once</li>
                <li><strong>Complete Privacy:</strong> All processing happens locally in your browser</li>
              </ul>
              
              <h2>What Information Gets Removed?</h2>
              <ul>
                <li><strong>GPS Location:</strong> Exact coordinates where the photo was taken</li>
                <li><strong>Camera Information:</strong> Device model, settings, and serial numbers</li>
                <li><strong>Timestamps:</strong> Exact date and time the photo was captured</li>
                <li><strong>Software Details:</strong> Photo editing software and versions used</li>
                <li><strong>Personal Data:</strong> Author names, copyright information, and comments</li>
              </ul>
              
              <h2>Privacy and Security</h2>
              <p>
                This advanced tool processes everything locally in your browser. Your images are never uploaded 
                to a server, ensuring complete privacy and security. The metadata removal happens 
                instantly on your device, and no data is stored or transmitted.
              </p>
              
              <h2>Supported Formats</h2>
              <p>
                Our advanced metadata remover supports all common image formats including JPEG, PNG, GIF, WebP, 
                BMP, and TIFF. Each cleaned image maintains the same quality while removing all embedded metadata.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MetadataRemoverPage;
