import { Helmet } from "react-helmet";
import { QrGenerator as QrGeneratorTool } from "@/components/tools/QrGenerator";
import Header from "@/components/Header";

const QrGeneratorPage = () => {
  return (
    <>
      <Helmet>
        <title>QR Code Generator Tool - Create QR Codes | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online tool to generate QR codes for text, URLs, or any content. Create and download QR codes easily."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">QR Code Generator Tool</h1>
          <p className="text-gray-600 mb-8">
            Generate QR codes for any text or URL. Customize the size and download
            your QR codes in high quality.
          </p>
          <QrGeneratorTool />
        </main>
      </div>
    </>
  );
};

export default QrGeneratorPage;