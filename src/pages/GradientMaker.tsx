
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download, Layers } from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";

const GradientMaker = () => {
  const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#0000ff");
  const [direction, setDirection] = useState("45deg");
  const [gradientType, setGradientType] = useState("linear");
  const { toast } = useToast();

  const generateCSS = () => {
    if (gradientType === "linear") {
      return `background: linear-gradient(${direction}, ${color1}, ${color2});`;
    } else {
      return `background: radial-gradient(circle, ${color1}, ${color2});`;
    }
  };

  const copyCSS = async () => {
    try {
      await navigator.clipboard.writeText(generateCSS());
      toast({
        title: "Copied",
        description: "CSS gradient copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy CSS",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>CSS Gradient Maker - Create Beautiful Gradients | Lasitha Rajapaksha</title>
        <meta name="description" content="Create beautiful CSS gradients with live preview. Generate linear and radial gradients for your web projects." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Layers className="h-8 w-8" />
            Gradient Maker
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Gradient Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Gradient Type:</label>
                  <select
                    value={gradientType}
                    onChange={(e) => setGradientType(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="linear">Linear Gradient</option>
                    <option value="radial">Radial Gradient</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">First Color:</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={color1}
                      onChange={(e) => setColor1(e.target.value)}
                      className="w-16 h-10 border rounded"
                    />
                    <Input
                      value={color1}
                      onChange={(e) => setColor1(e.target.value)}
                      placeholder="#ff0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Second Color:</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={color2}
                      onChange={(e) => setColor2(e.target.value)}
                      className="w-16 h-10 border rounded"
                    />
                    <Input
                      value={color2}
                      onChange={(e) => setColor2(e.target.value)}
                      placeholder="#0000ff"
                    />
                  </div>
                </div>

                {gradientType === "linear" && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Direction:</label>
                    <select
                      value={direction}
                      onChange={(e) => setDirection(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="45deg">45 degrees</option>
                      <option value="90deg">90 degrees (top to bottom)</option>
                      <option value="180deg">180 degrees (bottom to top)</option>
                      <option value="270deg">270 degrees (right to left)</option>
                      <option value="0deg">0 degrees (left to right)</option>
                    </select>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">CSS Code:</label>
                  <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                    {generateCSS()}
                  </div>
                  <Button onClick={copyCSS} className="w-full">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy CSS
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="w-full h-64 rounded-lg border"
                  style={{
                    background: gradientType === "linear" 
                      ? `linear-gradient(${direction}, ${color1}, ${color2})`
                      : `radial-gradient(circle, ${color1}, ${color2})`
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default GradientMaker;
