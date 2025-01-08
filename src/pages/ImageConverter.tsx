import { ImageConverter } from "@/components/tools/ImageConverter";
import Header from "@/components/Header";

const ImageConverterPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">
        <ImageConverter />
      </main>
    </div>
  );
};

export default ImageConverterPage;