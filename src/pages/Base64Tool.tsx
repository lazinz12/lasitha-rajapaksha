
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Binary } from "lucide-react";
import Header from "@/components/Header";

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const encodeBase64 = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid input for Base64 encoding",
        variant: "destructive",
      });
    }
  };

  const decodeBase64 = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid Base64 string",
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
        <title>Base64 Encoder Decoder Tool - Encode & Decode Base64 Online | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online Base64 encoder and decoder tool. Convert text to Base64 encoding and decode Base64 strings. Fast, secure, and easy to use Base64 converter for developers."
        />
        <meta
          name="keywords"
          content="base64 encoder, base64 decoder, base64 converter, encode base64, decode base64, base64 tool, online base64, text to base64, base64 to text, developer tools"
        />
        <meta property="og:title" content="Base64 Encoder Decoder Tool - Encode & Decode Base64 Online" />
        <meta property="og:description" content="Free online Base64 encoder and decoder tool for developers. Convert text to Base64 and decode Base64 strings instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lasitharajapaksha.netlify.app/tools/base64" />
        <link rel="canonical" href="https://lasitharajapaksha.netlify.app/tools/base64" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Binary className="h-8 w-8" />
              Base64 Encoder/Decoder
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Encode text to Base64 format or decode Base64 strings back to readable text. 
              Essential tool for web developers, API integration, and data transmission.
            </p>
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Base64 Encoder/Decoder Tool</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Input Text:</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text to encode or Base64 string to decode..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={encodeBase64} className="flex-1">
                  Encode to Base64
                </Button>
                <Button onClick={decodeBase64} className="flex-1" variant="outline">
                  Decode from Base64
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Output:</label>
                <div className="relative">
                  <Textarea
                    value={output}
                    readOnly
                    className="min-h-[100px]"
                    placeholder="Encoded or decoded result will appear here..."
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

export default Base64Tool;
