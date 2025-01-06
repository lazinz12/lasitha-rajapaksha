import { Helmet } from "react-helmet";
import { CaseConverter as CaseConverterTool } from "@/components/tools/CaseConverter";
import Header from "@/components/Header";

const CaseConverterPage = () => {
  return (
    <>
      <Helmet>
        <title>Case Converter Tool - Text Case Conversion | Lasitha Rajapaksha</title>
        <meta name="description" content="Free online tool to convert text between different cases: uppercase, lowercase, title case, and sentence case. Easy to use text case converter." />
        <meta name="keywords" content="case converter, text converter, uppercase converter, lowercase converter, title case, sentence case, text transformation" />
        <meta property="og:title" content="Case Converter Tool - Text Case Conversion" />
        <meta property="og:description" content="Free online tool to convert text between different cases. Convert to uppercase, lowercase, title case, or sentence case instantly." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Case Converter Tool</h1>
          <p className="text-gray-600 mb-8">
            Convert your text to different cases: uppercase, lowercase, title case, or sentence case.
            Simply enter your text and choose the desired conversion.
          </p>
          <CaseConverterTool />
        </main>
      </div>
    </>
  );
};

export default CaseConverterPage;