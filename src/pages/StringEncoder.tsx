
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Type, ArrowRightLeft } from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";

const StringEncoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [encodingType, setEncodingType] = useState("base64");
  const [operation, setOperation] = useState("encode");
  const { toast } = useToast();

  const performOperation = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text",
        variant: "destructive",
      });
      return;
    }

    try {
      let result = "";

      if (operation === "encode") {
        switch (encodingType) {
          case "base64":
            result = btoa(input);
            break;
          case "url":
            result = encodeURIComponent(input);
            break;
          case "html":
            result = input
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#39;");
            break;
          case "hex":
            result = Array.from(input)
              .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
              .join('');
            break;
          case "binary":
            result = Array.from(input)
              .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
              .join(' ');
            break;
          default:
            throw new Error("Unsupported encoding type");
        }
      } else {
        switch (encodingType) {
          case "base64":
            result = atob(input);
            break;
          case "url":
            result = decodeURIComponent(input);
            break;
          case "html":
            result = input
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'");
            break;
          case "hex":
            result = input.match(/.{1,2}/g)
              ?.map(hex => String.fromCharCode(parseInt(hex, 16)))
              .join('') || "";
            break;
          case "binary":
            result = input.split(' ')
              .map(bin => String.fromCharCode(parseInt(bin, 2)))
              .join('');
            break;
          default:
            throw new Error("Unsupported encoding type");
        }
      }

      setOutput(result);
      toast({
        title: "Success",
        description: `Text ${operation}d successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${operation} text. Please check your input.`,
        variant: "destructive",
      });
    }
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

  const swapInputOutput = () => {
    setInput(output);
    setOutput("");
    setOperation(operation === "encode" ? "decode" : "encode");
  };

  return (
    <>
      <Helmet>
        <title>String Encoder/Decoder - Convert Text Formats | Lasitha Rajapaksha</title>
        <meta name="description" content="Free online tool to encode and decode strings in various formats including Base64, URL encoding, HTML entities, and more." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Type className="h-8 w-8" />
            String Encoder/Decoder
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Input</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Encoding Type:</label>
                    <select
                      value={encodingType}
                      onChange={(e) => setEncodingType(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="base64">Base64</option>
                      <option value="url">URL Encoding</option>
                      <option value="html">HTML Entities</option>
                      <option value="hex">Hexadecimal</option>
                      <option value="binary">Binary</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Operation:</label>
                    <select
                      value={operation}
                      onChange={(e) => setOperation(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="encode">Encode</option>
                      <option value="decode">Decode</option>
                    </select>
                  </div>
                </div>

                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Enter text to ${operation}...`}
                  className="min-h-[200px]"
                />
                
                <div className="flex gap-2">
                  <Button onClick={performOperation} className="flex-1">
                    {operation === "encode" ? "Encode" : "Decode"} Text
                  </Button>
                  <Button onClick={swapInputOutput} variant="outline">
                    <ArrowRightLeft className="h-4 w-4" />
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
                  placeholder={`${operation === "encode" ? "Encoded" : "Decoded"} text will appear here...`}
                  className="min-h-[200px] bg-gray-50"
                />
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Encoding Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Encoding Types:</h4>
                  <ul className="space-y-1">
                    <li>• <strong>Base64:</strong> Binary-to-text encoding scheme</li>
                    <li>• <strong>URL:</strong> Percent-encoding for URLs</li>
                    <li>• <strong>HTML:</strong> HTML entity encoding</li>
                    <li>• <strong>Hex:</strong> Hexadecimal representation</li>
                    <li>• <strong>Binary:</strong> Binary representation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Common Use Cases:</h4>
                  <ul className="space-y-1">
                    <li>• Data transmission over HTTP</li>
                    <li>• Storing binary data in text format</li>
                    <li>• URL parameter encoding</li>
                    <li>• HTML content safety</li>
                    <li>• Low-level data analysis</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default StringEncoder;
