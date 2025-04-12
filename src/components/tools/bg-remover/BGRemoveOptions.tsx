
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Settings } from "lucide-react";
import { ColorPicker } from "@/components/tools/ColorPicker";

interface BGRemoveOptionsProps {
  backgroundMode: "transparent" | "color" | "blur";
  backgroundColor: string;
  blurAmount: number;
  featherEdges: boolean;
  featherAmount: number;
  enhanceQuality: boolean;
  setBackgroundMode: (value: "transparent" | "color" | "blur") => void;
  setBackgroundColor: (value: string) => void;
  setBlurAmount: (value: number) => void;
  setFeatherEdges: (value: boolean) => void;
  setFeatherAmount: (value: number) => void;
  setEnhanceQuality: (value: boolean) => void;
}

export const BGRemoveOptions: React.FC<BGRemoveOptionsProps> = ({
  backgroundMode,
  backgroundColor,
  blurAmount,
  featherEdges,
  featherAmount,
  enhanceQuality,
  setBackgroundMode,
  setBackgroundColor,
  setBlurAmount,
  setFeatherEdges,
  setFeatherAmount,
  setEnhanceQuality,
}) => {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Background Options */}
        <div>
          <Label className="mb-3 block font-medium">Background Type</Label>
          <Tabs 
            value={backgroundMode} 
            onValueChange={(value) => setBackgroundMode(value as "transparent" | "color" | "blur")}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-3 mb-2">
              <TabsTrigger value="transparent">Transparent</TabsTrigger>
              <TabsTrigger value="color">Solid Color</TabsTrigger>
              <TabsTrigger value="blur">Blurred</TabsTrigger>
            </TabsList>
            <TabsContent value="transparent" className="pt-2">
              <p className="text-sm text-muted-foreground">
                The background will be completely transparent, ideal for using in designs.
              </p>
            </TabsContent>
            <TabsContent value="color" className="pt-2">
              <div className="space-y-2">
                <Label className="text-sm">Background Color</Label>
                <ColorPicker value={backgroundColor} onChange={setBackgroundColor} />
              </div>
            </TabsContent>
            <TabsContent value="blur" className="pt-2 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm">Blur Amount: {blurAmount}px</Label>
                </div>
                <Slider 
                  value={[blurAmount]} 
                  min={1} 
                  max={20} 
                  step={1} 
                  onValueChange={(values) => setBlurAmount(values[0])} 
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Advanced Options */}
        <Collapsible
          open={advancedOpen}
          onOpenChange={setAdvancedOpen}
          className="border rounded-lg p-3"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full cursor-pointer">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="text-sm font-medium">Advanced Options</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${advancedOpen ? "transform rotate-180" : ""}`} />
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="feather-edges" className="text-sm">Feather Edges</Label>
              <Switch 
                id="feather-edges" 
                checked={featherEdges} 
                onCheckedChange={setFeatherEdges} 
              />
            </div>
            
            {featherEdges && (
              <div className="pt-2">
                <div className="flex justify-between">
                  <Label className="text-sm">Feather Amount: {featherAmount}px</Label>
                </div>
                <Slider 
                  value={[featherAmount]} 
                  min={1} 
                  max={10} 
                  step={1} 
                  onValueChange={(values) => setFeatherAmount(values[0])} 
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label htmlFor="enhance-quality" className="text-sm">Enhance Quality</Label>
              <Switch 
                id="enhance-quality" 
                checked={enhanceQuality} 
                onCheckedChange={setEnhanceQuality} 
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
