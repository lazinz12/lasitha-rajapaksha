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

export const BacklinkChecker = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<null | { backlinks: number }>(null);
  const { toast } = useToast();

  const handleCheck = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL to check",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      // For demo purposes, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // In a real implementation, you would make an API call to a backlink checking service
      const mockResults = {
        backlinks: Math.floor(Math.random() * 1000),
      };
      setResults(mockResults);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check backlinks. Please try again.",
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
          <CardTitle>Check Website Backlinks</CardTitle>
          <CardDescription>
            Enter a URL to check its backlinks. This tool helps you analyze the
            number of websites linking to your target URL.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="url"
              placeholder="Enter website URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleCheck}
              disabled={loading}
              className="whitespace-nowrap"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Check Backlinks
            </Button>
          </div>

          {results && (
            <Card className="mt-4">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {results.backlinks.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Backlinks found for this domain
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};