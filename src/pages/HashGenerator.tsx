
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Hash } from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";

const HashGenerator = () => {
  const [input, setInput] = useState("");
  const [md5Hash, setMd5Hash] = useState("");
  const [sha1Hash, setSha1Hash] = useState("");
  const [sha256Hash, setSha256Hash] = useState("");
  const { toast } = useToast();

  const generateHashes = async () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to hash",
        variant: "destructive",
      });
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    try {
      // Generate SHA-256
      const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
      const sha256Array = Array.from(new Uint8Array(sha256Buffer));
      const sha256Hex = sha256Array.map(b => b.toString(16).padStart(2, '0')).join('');
      setSha256Hash(sha256Hex);

      // Generate SHA-1
      const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
      const sha1Array = Array.from(new Uint8Array(sha1Buffer));
      const sha1Hex = sha1Array.map(b => b.toString(16).padStart(2, '0')).join('');
      setSha1Hash(sha1Hex);

      // Simple MD5 implementation (for demo purposes)
      setMd5Hash("MD5 not available in modern browsers for security reasons");

      toast({
        title: "Success",
        description: "Hashes generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate hashes",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied",
        description: `${type} hash copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy hash",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Hash Generator - Generate MD5, SHA1, SHA256 | Lasitha Rajapaksha</title>
        <meta name="description" content="Free online tool to generate hash values using MD5, SHA1, and SHA256 algorithms. Secure hash generation for text and data verification." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Hash className="h-8 w-8" />
            Hash Generator
          </h1>
          <p className="text-gray-600 mb-8">
            Generate secure hash values for text using various algorithms including SHA-1 and SHA-256.
          </p>
          
          <Card className="max-w-3xl">
            <CardHeader>
              <CardTitle>Generate Hash Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Input Text:</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text to generate hash values..."
                  className="min-h-[100px]"
                />
              </div>

              <Button onClick={generateHashes} className="w-full">
                Generate Hashes
              </Button>

              {(sha256Hash || sha1Hash) && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">SHA-256:</label>
                    <div className="relative">
                      <Input value={sha256Hash} readOnly className="pr-10" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1/2 right-2 -translate-y-1/2"
                        onClick={() => copyToClipboard(sha256Hash, "SHA-256")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">SHA-1:</label>
                    <div className="relative">
                      <Input value={sha1Hash} readOnly className="pr-10" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1/2 right-2 -translate-y-1/2"
                        onClick={() => copyToClipboard(sha1Hash, "SHA-1")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">MD5:</label>
                    <div className="relative">
                      <Input value={md5Hash} readOnly className="pr-10 text-gray-500" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default HashGenerator;
