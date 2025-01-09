import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ColorConverter = () => {
  const [color, setColor] = useState("#000000");
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 });

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      setRgb({ r, g, b });
      hexToHsl(r, g, b);
    }
  };

  const hexToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    setHsl({
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    hexToRgb(newColor);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Color Converter</CardTitle>
          <CardDescription>
            Convert colors between HEX, RGB, and HSL formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="color">Pick a Color</Label>
              <div className="flex gap-4">
                <Input
                  type="color"
                  value={color}
                  onChange={handleColorChange}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={color}
                  onChange={handleColorChange}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>RGB</Label>
              <div className="p-4 rounded-md bg-muted">
                rgb({rgb.r}, {rgb.g}, {rgb.b})
              </div>
            </div>

            <div className="grid gap-2">
              <Label>HSL</Label>
              <div className="p-4 rounded-md bg-muted">
                hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
              </div>
            </div>

            <div
              className="h-24 rounded-md"
              style={{ backgroundColor: color }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};