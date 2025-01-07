import { Helmet } from "react-helmet";
import { SeoChecker as SeoCheckerTool } from "@/components/tools/SeoChecker";
import Header from "@/components/Header";

const SeoCheckerPage = () => {
  return (
    <>
      <Helmet>
        <title>SEO Checker Tool - Analyze On-Page SEO | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online tool to analyze on-page SEO factors. Check your webpage's SEO score, keyword optimization, and get insights to improve your search engine rankings."
        />
        <meta
          name="keywords"
          content="seo checker, on-page seo, keyword analysis, seo score, website analysis, meta tags checker"
        />
        <meta
          property="og:title"
          content="SEO Checker Tool - Analyze On-Page SEO"
        />
        <meta
          property="og:description"
          content="Free online tool to analyze on-page SEO factors and improve your search engine rankings."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">SEO Checker Tool</h1>
          <p className="text-gray-600 mb-8">
            Analyze your webpage's SEO performance and get insights to improve your
            search engine rankings. Enter your URL and target keyword to get
            started.
          </p>
          <SeoCheckerTool />
        </main>
      </div>
    </>
  );
};

export default SeoCheckerPage;