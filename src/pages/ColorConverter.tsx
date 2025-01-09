import { Helmet } from "react-helmet";
import { ColorConverter as ColorConverterTool } from "@/components/tools/ColorConverter";
import Header from "@/components/Header";

const ColorConverterPage = () => {
  return (
    <>
      <Helmet>
        <title>Color Converter Tool - Convert Between Color Formats | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online tool to convert colors between HEX, RGB, and HSL formats. Easy to use color converter with live preview."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Color Converter Tool</h1>
          <p className="text-gray-600 mb-8">
            Convert colors between different formats: HEX, RGB, and HSL. See live preview
            of your colors and easily copy the converted values.
          </p>
          <ColorConverterTool />
        </main>
      </div>
    </>
  );
};

export default ColorConverterPage;