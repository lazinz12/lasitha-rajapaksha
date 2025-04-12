
import React from "react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { ColorPicker } from "@/components/tools/ColorPicker";

interface BackgroundOptionsProps {
  backgroundMode: "transparent" | "color" | "blur";
  backgroundColor: string;
  blurAmount: number;
  onBackgroundModeChange: (value: "transparent" | "color" | "blur") => void;
  onBackgroundColorChange: (value: string) => void;
  onBlurAmountChange: (value: number) => void;
}

export const BackgroundOptions: React.FC<BackgroundOptionsProps> = ({
  backgroundMode,
  backgroundColor,
  blurAmount,
  onBackgroundModeChange,
  onBackgroundColorChange,
  onBlurAmountChange,
}) => {
  return (
    <Tabs defaultValue={backgroundMode} onValueChange={(value) => onBackgroundModeChange(value as "transparent" | "color" | "blur")}>
      <Label className="mb-2 block">Background Type</Label>
      <TabsList className="w-full grid grid-cols-3">
        <TabsTrigger value="transparent">Transparent</TabsTrigger>
        <TabsTrigger value="color">Solid Color</TabsTrigger>
        <TabsTrigger value="blur">Blurred</TabsTrigger>
      </TabsList>
      <TabsContent value="transparent" className="pt-4">
        <p className="text-sm text-muted-foreground">
          The background will be completely transparent, ideal for using in designs.
        </p>
      </TabsContent>
      <TabsContent value="color" className="pt-4">
        <div className="space-y-2">
          <Label>Background Color</Label>
          <ColorPicker value={backgroundColor} onChange={onBackgroundColorChange} />
        </div>
      </TabsContent>
      <TabsContent value="blur" className="pt-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Blur Amount: {blurAmount}px</Label>
          </div>
          <Slider 
            value={[blurAmount]} 
            min={1} 
            max={20} 
            step={1} 
            onValueChange={(values) => onBlurAmountChange(values[0])} 
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};
