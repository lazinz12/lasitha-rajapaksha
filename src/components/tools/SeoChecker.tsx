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
import { Loader2 } from "lucide-react";

export const SeoChecker = () => {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<null | {
    titleScore: number;
    descriptionScore: number;
    keywordDensity: number;
    headingsScore: number;
    overallScore: number;
    suggestions: string[];
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
      
      const mockResults = {
        titleScore: Math.floor(Math.random() * 100),
        descriptionScore: Math.floor(Math.random() * 100),
        keywordDensity: Number((Math.random() * 5).toFixed(2)),
        headingsScore: Math.floor(Math.random() * 100),
        overallScore: Math.floor(Math.random() * 100),
        suggestions: [
          `Add the keyword "${keyword}" to at least one of your H1, H2, or H3 headers for better rankings.`,
          `To rank well for "${keyword}", add the keyword naturally within your page content.`,
          "Create a robots.txt file in your website root with content:\nUser-agent: *\nAllow:",
          "Ensure your meta description includes your target keyword.",
          "Add alt text to images that includes your target keyword where relevant."
        ]
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
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold text-primary">
                      {results.overallScore}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Overall SEO Score
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <p className="font-semibold">Title Optimization</p>
                      <p className="text-lg">{results.titleScore}%</p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <p className="font-semibold">Meta Description</p>
                      <p className="text-lg">{results.descriptionScore}%</p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <p className="font-semibold">Keyword Density</p>
                      <p className="text-lg">{results.keywordDensity}%</p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <p className="font-semibold">Headings Structure</p>
                      <p className="text-lg">{results.headingsScore}%</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Optimization Suggestions</h3>
                    <ul className="space-y-2 list-disc pl-4">
                      {results.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-gray-600">{suggestion}</li>
                      ))}
                    </ul>
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