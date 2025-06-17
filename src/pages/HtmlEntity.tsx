
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Code } from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";

const HtmlEntity = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const encode = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to encode",
        variant: "destructive",
      });
      return;
    }

    const encoded = input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/\u00A0/g, "&nbsp;");
    
    setOutput(encoded);
    toast({
      title: "Success",
      description: "Text encoded successfully",
    });
  };

  const decode = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter some HTML entities to decode",
        variant: "destructive",
      });
      return;
    }

    const decoded = input
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, "\u00A0");
    
    setOutput(decoded);
    toast({
      title: "Success",
      description: "HTML entities decoded successfully",
    });
  };

  const copyToClipboard = async () => {
    if (!output) {
      toast({
        title: "Error",
        description: "Nothing to copy",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied",
        description: "Result copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy result",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>HTML Entity Encoder/Decoder - Convert HTML Entities | Lasitha Rajapaksha</title>
        <meta name="description" content="Free tool to encode and decode HTML entities. Convert special characters for safe web display." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Code className="h-8 w-8" />
            HTML Entity Encoder/Decoder
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Input</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text or HTML entities..."
                  className="min-h-[200px]"
                />
                <div className="flex gap-2">
                  <Button onClick={encode} className="flex-1">
                    Encode to HTML Entities
                  </Button>
                  <Button onClick={decode} variant="outline" className="flex-1">
                    Decode HTML Entities
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Output</CardTitle>
                <Button onClick={copyToClipboard} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={output}
                  readOnly
                  placeholder="Result will appear here..."
                  className="min-h-[200px] bg-gray-50"
                />
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Common HTML Entities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <strong>&amp;</strong> → &amp;amp;
                </div>
                <div>
                  <strong>&lt;</strong> → &amp;lt;
                </div>
                <div>
                  <strong>&gt;</strong> → &amp;gt;
                </div>
                <div>
                  <strong>"</strong> → &amp;quot;
                </div>
                <div>
                  <strong>'</strong> → &amp;#39;
                </div>
                <div>
                  <strong>space</strong> → &amp;nbsp;
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default HtmlEntity;
