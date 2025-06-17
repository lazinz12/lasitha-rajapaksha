
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download, Upload, Braces, Check } from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";

const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const [indentSize, setIndentSize] = useState(2);
  const { toast } = useToast();

  const formatJson = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter some JSON to format",
        variant: "destructive",
      });
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setIsValid(true);
      setError("");
      toast({
        title: "Success",
        description: "JSON formatted successfully",
      });
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax",
        variant: "destructive",
      });
    }
  };

  const minifyJson = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter some JSON to minify",
        variant: "destructive",
      });
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setIsValid(true);
      setError("");
      toast({
        title: "Success",
        description: "JSON minified successfully",
      });
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax",
        variant: "destructive",
      });
    }
  };

  const validateJson = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter some JSON to validate",
        variant: "destructive",
      });
      return;
    }

    try {
      JSON.parse(input);
      setIsValid(true);
      setError("");
      toast({
        title: "Valid JSON",
        description: "Your JSON is valid!",
      });
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : "Invalid JSON");
      toast({
        title: "Invalid JSON",
        description: err instanceof Error ? err.message : "Invalid JSON",
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
        description: "JSON copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy JSON",
        variant: "destructive",
      });
    }
  };

  const downloadJson = () => {
    if (!output) {
      toast({
        title: "Error",
        description: "Nothing to download",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadSampleJson = () => {
    const sample = {
      "name": "John Doe",
      "age": 30,
      "city": "New York",
      "hobbies": ["reading", "swimming", "coding"],
      "address": {
        "street": "123 Main St",
        "zipCode": "10001"
      },
      "isEmployed": true
    };
    setInput(JSON.stringify(sample));
  };

  return (
    <>
      <Helmet>
        <title>JSON Formatter - Format, Validate & Beautify JSON | Lasitha Rajapaksha</title>
        <meta name="description" content="Free online tool to format, validate, and beautify JSON data. Make your JSON readable and fix syntax errors instantly." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Braces className="h-8 w-8" />
            JSON Formatter
          </h1>
          <p className="text-gray-600 mb-8">
            Format, validate, and beautify your JSON data. Perfect for debugging APIs and making JSON readable.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Input JSON</CardTitle>
                <div className="flex gap-2 flex-wrap">
                  <Button onClick={loadSampleJson} variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Load Sample
                  </Button>
                  <Button onClick={validateJson} variant="outline" size="sm">
                    <Check className="h-4 w-4 mr-2" />
                    Validate
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your JSON here..."
                  className="min-h-[400px] font-mono text-sm"
                />
                
                <div className="flex gap-2 items-center">
                  <label className="text-sm font-medium">Indent:</label>
                  <select 
                    value={indentSize} 
                    onChange={(e) => setIndentSize(Number(e.target.value))}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                    <option value={8}>8 spaces</option>
                  </select>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button onClick={formatJson} className="flex-1 sm:flex-none">
                    Format JSON
                  </Button>
                  <Button onClick={minifyJson} variant="outline" className="flex-1 sm:flex-none">
                    Minify JSON
                  </Button>
                </div>

                {!isValid && error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                    <strong>Error:</strong> {error}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Formatted Output</CardTitle>
                <div className="flex gap-2">
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={downloadJson} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={output}
                  readOnly
                  placeholder="Formatted JSON will appear here..."
                  className="min-h-[400px] font-mono text-sm bg-gray-50"
                />
                {isValid && output && (
                  <div className="mt-2 text-sm text-green-600 flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Valid JSON ({output.length} characters)
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>About JSON Formatter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Features:</h4>
                  <ul className="space-y-1">
                    <li>• Format and beautify JSON</li>
                    <li>• Minify JSON for production</li>
                    <li>• Validate JSON syntax</li>
                    <li>• Customizable indentation</li>
                    <li>• Copy and download results</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Use Cases:</h4>
                  <ul className="space-y-1">
                    <li>• Debug API responses</li>
                    <li>• Format configuration files</li>
                    <li>• Validate JSON data</li>
                    <li>• Prepare JSON for documentation</li>
                    <li>• Clean up messy JSON</li>
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

export default JsonFormatter;
