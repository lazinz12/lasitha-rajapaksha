
import { Helmet } from "react-helmet";
import { ExifViewer as ExifViewerTool } from "@/components/tools/ExifViewer";
import Header from "@/components/Header";

const ExifViewerPage = () => {
  return (
    <>
      <Helmet>
        <title>EXIF Viewer & Remover - View & Clean Image Metadata | Lasitha Rajapaksha</title>
        <meta name="description" content="Free online tool to view and remove EXIF metadata from your images. Protect your privacy by stripping sensitive information from photos before sharing them." />
        <meta name="keywords" content="exif viewer, exif remover, metadata cleaner, image privacy, remove metadata, photo exif, image security" />
        <meta property="og:title" content="EXIF Viewer & Remover - View & Clean Image Metadata" />
        <meta property="og:description" content="Free online tool to view and remove EXIF metadata from your images. Protect your privacy by stripping personal information from photos." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">EXIF Viewer & Metadata Remover</h1>
          <p className="text-gray-600 mb-8">
            EXIF data can contain sensitive information like your location, device details, and when a photo was taken. 
            This tool lets you view that metadata and create a clean copy of your image with all metadata removed.
          </p>
          <ExifViewerTool />
        </main>
      </div>
    </>
  );
};

export default ExifViewerPage;
