
import { Helmet } from "react-helmet";
import { MetadataRemover } from "@/components/tools/MetadataRemover";
import Header from "@/components/Header";

const MetadataRemoverPage = () => {
  return (
    <>
      <Helmet>
        <title>Image Metadata Remover - Remove EXIF Data Online | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online tool to remove metadata and EXIF data from images. Protect your privacy by stripping location, camera, and other sensitive information from photos."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Image Metadata Remover</h1>
          <div className="prose dark:prose-invert mb-8 max-w-3xl">
            <h2>Why Remove Image Metadata?</h2>
            <p>
              Digital images often contain hidden metadata (EXIF data) that can reveal sensitive information 
              about when and where the photo was taken, what device was used, and even GPS coordinates. 
              Removing this data is crucial for protecting your privacy when sharing images online.
            </p>
            
            <h2>What Information Gets Removed?</h2>
            <ul>
              <li><strong>GPS Location:</strong> Exact coordinates where the photo was taken</li>
              <li><strong>Camera Information:</strong> Device model, settings, and serial numbers</li>
              <li><strong>Timestamps:</strong> Exact date and time the photo was captured</li>
              <li><strong>Software Details:</strong> Photo editing software and versions used</li>
              <li><strong>Personal Data:</strong> Author names, copyright information, and comments</li>
            </ul>
            
            <h2>How to Use This Tool</h2>
            <ol>
              <li>Upload your image by clicking "Select Image" or dragging and dropping a file.</li>
              <li>The tool will automatically process your image and create a cleaned version.</li>
              <li>Compare the original and cleaned versions side by side.</li>
              <li>Download the cleaned image with all metadata removed.</li>
              <li>Your cleaned image is ready to share safely online!</li>
            </ol>
            
            <h2>Privacy and Security</h2>
            <p>
              This tool processes everything locally in your browser. Your images are never uploaded 
              to a server, ensuring complete privacy and security. The metadata removal happens 
              instantly on your device, and no data is stored or transmitted.
            </p>
            
            <h2>Supported Formats</h2>
            <p>
              Our metadata remover supports all common image formats including JPEG, PNG, GIF, WebP, 
              BMP, and TIFF. The cleaned image maintains the same quality while removing all embedded metadata.
            </p>
          </div>
          <MetadataRemover />
        </main>
      </div>
    </>
  );
};

export default MetadataRemoverPage;
