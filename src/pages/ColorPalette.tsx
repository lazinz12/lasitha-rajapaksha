
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Shuffle, PaintBucket } from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";

const ColorPalette = () => {
  const [palette, setPalette] = useState<string[]>([]);
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const { toast } = useToast();

  const generateRandomPalette = () => {
    const colors = [];
    for (let i = 0; i < 5; i++) {
      const hue = Math.floor(Math.random() * 360);
      const saturation = Math.floor(Math.random() * 50) + 50;
      const lightness = Math.floor(Math.random() * 40) + 30;
      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    setPalette(colors);
  };

  const generateFromBase = () => {
    const baseHue = parseInt(baseColor.slice(1), 16);
    const h = Math.floor((baseHue >> 16) * 360 / 255);
    
    const colors = [
      baseColor,
      `hsl(${(h + 30) % 360}, 70%, 50%)`,
      `hsl(${(h + 60) % 360}, 70%, 50%)`,
      `hsl(${(h + 120) % 360}, 70%, 50%)`,
      `hsl(${(h + 180) % 360}, 70%, 50%)`
    ];
    setPalette(colors);
  };

  const generateMonochromatic = () => {
    const lightnesses = [20, 35, 50, 65, 80];
    const colors = lightnesses.map(l => `hsl(220, 50%, ${l}%)`);
    setPalette(colors);
  };

  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      toast({
        title: "Copied",
        description: `Color ${color} copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy color",
        variant: "destructive",
      });
    }
  };

  const copyPalette = async () => {
    if (palette.length === 0) {
      toast({
        title: "Error",
        description: "No palette to copy",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(palette.join(', '));
      toast({
        title: "Copied",
        description: "Entire palette copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy palette",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Color Palette Generator - Create Beautiful Color Schemes | Lasitha Rajapaksha</title>
        <meta name="description" content="Generate beautiful color palettes for your design projects. Create random, complementary, and monochromatic color schemes." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <PaintBucket className="h-8 w-8" />
            Color Palette Generator
          </h1>
          
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Generate Color Palettes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={generateRandomPalette} className="flex items-center gap-2">
                  <Shuffle className="h-4 w-4" />
                  Random Palette
                </Button>
                
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-12 h-10 border rounded"
                  />
                  <Button onClick={generateFromBase} variant="outline" className="flex-1">
                    From Base Color
                  </Button>
                </div>
                
                <Button onClick={generateMonochromatic} variant="outline">
                  Monochromatic
                </Button>
              </div>

              {palette.length > 0 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Generated Palette</h3>
                    <Button onClick={copyPalette} variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy All
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                    {palette.map((color, index) => (
                      <div key={index} className="text-center">
                        <div
                          className="w-full h-24 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => copyColor(color)}
                        />
                        <p className="mt-2 text-sm font-mono">{color}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyColor(color)}
                          className="mt-1 h-6 text-xs"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h4 className="font-semibold mb-2">How to Use:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Click "Random Palette" for inspiration</li>
                    <li>• Choose a base color and generate harmonious colors</li>
                    <li>• Try monochromatic for subtle variations</li>
                    <li>• Click any color to copy it</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Palette Types:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Random:</strong> Completely random color combinations</li>
                    <li>• <strong>Base Color:</strong> Harmonious colors based on your choice</li>
                    <li>• <strong>Monochromatic:</strong> Different shades of the same hue</li>
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

export default ColorPalette;
