import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SeoResultSection } from "./seo/SeoResultSection";
import { AiRecommendations } from "./seo/AiRecommendations";

export const SeoChecker = () => {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [aiRecommendations, setAiRecommendations] = useState<any>(null);
  const { toast } = useToast();

  const handleCheck = async () => {
    if (!url || !keyword) {
      toast({
        title: "Error",
        description: "Please enter both URL and keyword to check",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      // For demo purposes, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const mockResults = {
        title: {
          text: `Your page Title is: "${keyword} - Developer and Forex Trader"`,
          hasKeyword: true,
          score: 100,
        },
        headings: {
          count: 0,
          hasKeyword: false,
          score: -0.5,
        },
        content: {
          wordCount: 0,
          score: -2.7,
        },
        loadingSpeed: {
          time: 1.39,
          score: 95,
          reasons: [
            "Google and all the search engines love the pages that are loading fast because slow loading pages will reduce their scanning speed.",
            "If your website/page loads slowly your visitors will not visit many pages and in most cases will press the back button."
          ]
        },
        robotsTxt: {
          exists: true,
          isValid: true,
          message: "Your robots.txt file was found in your website and it is valid."
        },
        overallScore: 65,
      };
      
      setResults(mockResults);

      // Get AI recommendations
      const { data: aiData, error: aiError } = await supabase.functions.invoke('analyze-seo', {
        body: { url, keyword, results: mockResults }
      });

      if (aiError) throw aiError;
      setAiRecommendations(aiData.recommendations);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze SEO. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>On-Page SEO Checker</CardTitle>
          <CardDescription>
            Enter a URL and your target keyword to analyze the on-page SEO factors
            of any webpage.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4">
            <Input
              type="url"
              placeholder="Enter website URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Enter target keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button
              onClick={handleCheck}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Check SEO
            </Button>
          </div>

          {results && (
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <SeoResultSection icon="success" title="Page Title" score={results.title.score}>
                    <p className="text-gray-700 mb-2">{results.title.text}</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4" />
                      <p className="text-sm">
                        The title contains your keyword{" "}
                        <span className="font-semibold">"{keyword}"</span>
                      </p>
                    </div>
                  </SeoResultSection>

                  <SeoResultSection 
                    icon="success" 
                    title="Page Loading Speed" 
                    score={results.loadingSpeed.score}
                  >
                    <p className="text-gray-700 mb-2">
                      This page took around {results.loadingSpeed.time} seconds to load (fast).
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      {results.loadingSpeed.reasons.map((reason: string, index: number) => (
                        <li key={index} className="text-sm text-gray-600">
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </SeoResultSection>

                  <SeoResultSection icon="success" title="File robots.txt">
                    <p className="text-gray-700 mb-2">
                      {results.robotsTxt.message}
                    </p>
                  </SeoResultSection>

                  {aiRecommendations && (
                    <AiRecommendations recommendations={aiRecommendations} />
                  )}

                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report as PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};