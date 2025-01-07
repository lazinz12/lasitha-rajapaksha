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
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export const SeoChecker = () => {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<null | {
    title: {
      text: string;
      hasKeyword: boolean;
      score: number;
    };
    headings: {
      count: number;
      hasKeyword: boolean;
      score: number;
    };
    content: {
      wordCount: number;
      score: number;
    };
    overallScore: number;
  }>(null);
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
      
      // Simulated analysis results
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
        overallScore: 65,
      };
      setResults(mockResults);
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
                  {/* Title Section */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="text-green-500 h-5 w-5" />
                      <h3 className="text-lg font-semibold">Page Title</h3>
                    </div>
                    <p className="text-gray-700 mb-2">{results.title.text}</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4" />
                      <p className="text-sm">
                        The title contains your keyword{" "}
                        <span className="font-semibold">"{keyword}"</span>
                      </p>
                    </div>
                  </div>

                  {/* Headings Section */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="text-orange-500 h-5 w-5" />
                      <h3 className="text-lg font-semibold">Heading</h3>
                      <span className="text-red-500 text-sm ml-auto">
                        {results.headings.score}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">Your page headers</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4" />
                      <p className="text-sm">
                        Your page have no page headers
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <XCircle className="text-red-500 h-4 w-4" />
                      <p className="text-sm">
                        Your headers don't contain your keyword{" "}
                        <span className="font-semibold">{keyword}</span>, you can add the keyword to at least one of the h1,h2 or h3 headers, this will results in better rankings.
                      </p>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="text-orange-500 h-5 w-5" />
                      <h3 className="text-lg font-semibold">Content</h3>
                      <span className="text-red-500 text-sm ml-auto">
                        {results.content.score}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">Your page content analyze</p>
                    <div className="flex items-center gap-2">
                      <XCircle className="text-red-500 h-4 w-4" />
                      <p className="text-sm">
                        Your page content size is too low, you have only {results.content.wordCount} words per page, try to add more text content per page, the more content per page the better rankings will be.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};