import { Helmet } from "react-helmet";
import { BacklinkChecker as BacklinkCheckerTool } from "@/components/tools/BacklinkChecker";
import Header from "@/components/Header";

const BacklinkCheckerPage = () => {
  return (
    <>
      <Helmet>
        <title>Backlink Checker Tool - Analyze Website Backlinks | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online tool to check and analyze website backlinks. Find out how many websites are linking to your target URL with our backlink checker tool."
        />
        <meta
          name="keywords"
          content="backlink checker, website analysis, SEO tools, link checker, domain authority, website metrics, backlink counter"
        />
        <meta
          property="og:title"
          content="Backlink Checker Tool - Analyze Website Backlinks"
        />
        <meta
          property="og:description"
          content="Free online tool to check and analyze website backlinks. Discover your website's backlink profile easily."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Backlink Checker Tool</h1>
          <p className="text-gray-600 mb-8">
            Analyze the number of backlinks pointing to any website. Enter a URL to
            get started with your backlink analysis.
          </p>
          <BacklinkCheckerTool />
        </main>
      </div>
    </>
  );
};

export default BacklinkCheckerPage;