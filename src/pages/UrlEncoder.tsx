
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";

const UrlEncoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const encodeUrl = () => {
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encode URL",
        variant: "destructive",
      });
    }
  };

  const decodeUrl = () => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid URL encoding",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied",
        description: "Text copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>URL Encoder/Decoder - Convert URLs Safely | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online tool to encode and decode URLs. Safely convert special characters for use in URLs and query parameters."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">URL Encoder/Decoder Tool</h1>
          <div className="prose dark:prose-invert mb-8 max-w-3xl">
            <h2>Why Use URL Encoding?</h2>
            <p>
              URLs can only contain a specific set of characters from the ASCII character set. 
              URL encoding converts special characters, such as spaces, punctuation, and non-ASCII 
              characters into a format that can be transmitted over the Internet.
            </p>
            
            <h2>When to Use This Tool</h2>
            <ul>
              <li><strong>Building Web Applications:</strong> Encode parameters for GET requests.</li>
              <li><strong>Working with APIs:</strong> Ensure query parameters are properly formatted.</li>
              <li><strong>Creating Links:</strong> Make sure your URLs work correctly when they contain special characters.</li>
              <li><strong>Debugging:</strong> Decode URL-encoded text to view the original content.</li>
              <li><strong>Internationalization:</strong> Handle non-English characters in URLs properly.</li>
            </ul>
            
            <h2>How URL Encoding Works</h2>
            <p>
              URL encoding replaces unsafe ASCII characters with a "%" followed by two hexadecimal digits. 
              For example, a space is encoded as %20. This ensures that URLs remain valid across all systems.
            </p>
            
            <h2>How to Use</h2>
            <ol>
              <li>Enter text in the input field.</li>
              <li>Click "Encode URL" to convert special characters to URL-safe format.</li>
              <li>Click "Decode URL" to convert URL-encoded text back to its original form.</li>
              <li>Use the copy button to copy the result to your clipboard.</li>
            </ol>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>URL Encoder/Decoder</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Input:</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter URL to encode or decode..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={encodeUrl} className="flex-1">Encode URL</Button>
                <Button onClick={decodeUrl} className="flex-1">Decode URL</Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Output:</label>
                <div className="relative">
                  <Textarea
                    value={output}
                    readOnly
                    className="min-h-[100px]"
                  />
                  {output && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default UrlEncoder;
