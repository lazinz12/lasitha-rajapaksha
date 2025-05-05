
import { Helmet } from "react-helmet";
import { ImageConverter } from "@/components/tools/ImageConverter";
import Header from "@/components/Header";

const ImageConverterPage = () => {
  return (
    <>
      <Helmet>
        <title>Image Converter Tool - Convert Image Formats Online | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online tool to convert images between formats like JPG, PNG, WebP, and more. No registration required, with client-side processing for privacy."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Image Converter Tool</h1>
          <div className="prose dark:prose-invert mb-8 max-w-3xl">
            <h2>Why Convert Image Formats?</h2>
            <p>
              Different image formats offer various advantages depending on your needs. 
              Some formats provide better compression, others preserve transparency, and 
              some are better supported across different platforms and browsers.
            </p>
            
            <h2>Benefits of Each Format</h2>
            <ul>
              <li><strong>PNG:</strong> Supports transparency and is ideal for logos, icons, and images with text.</li>
              <li><strong>JPEG:</strong> Great for photographs and complex images with many colors while maintaining small file sizes.</li>
              <li><strong>WebP:</strong> Modern format offering superior compression and quality, perfect for web use.</li>
              <li><strong>GIF:</strong> Supports animation and is widely compatible across platforms.</li>
              <li><strong>BMP:</strong> Uncompressed format that preserves every pixel perfectly.</li>
            </ul>
            
            <h2>How to Use This Tool</h2>
            <ol>
              <li>Upload your image by clicking the upload area or dragging and dropping your file.</li>
              <li>Select your desired output format from the dropdown menu.</li>
              <li>Click "Convert & Download" to process your image.</li>
              <li>Your converted image will automatically download to your device.</li>
            </ol>
            
            <h2>Privacy and Security</h2>
            <p>
              Our Image Converter processes everything locally in your browser. Your images are never uploaded 
              to a server, ensuring complete privacy and security for sensitive images. This also means faster 
              conversions since there's no upload/download time.
            </p>
          </div>
          <ImageConverter />
        </main>
      </div>
    </>
  );
};

export default ImageConverterPage;
