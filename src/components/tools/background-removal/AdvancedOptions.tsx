
import React from "react";
import { Settings, ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface AdvancedOptionsProps {
  advancedOpen: boolean;
  detectionSensitivity: number;
  featherEdges: boolean;
  featherAmount: number;
  preserveDetails: boolean;
  enhanceQuality: boolean;
  onAdvancedOpenChange: (open: boolean) => void;
  onDetectionSensitivityChange: (value: number) => void;
  onFeatherEdgesChange: (value: boolean) => void;
  onFeatherAmountChange: (value: number) => void;
  onPreserveDetailsChange: (value: boolean) => void;
  onEnhanceQualityChange: (value: boolean) => void;
}

export const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({
  advancedOpen,
  detectionSensitivity,
  featherEdges,
  featherAmount,
  preserveDetails,
  enhanceQuality,
  onAdvancedOpenChange,
  onDetectionSensitivityChange,
  onFeatherEdgesChange,
  onFeatherAmountChange,
  onPreserveDetailsChange,
  onEnhanceQualityChange,
}) => {
  return (
    <Collapsible
      open={advancedOpen}
      onOpenChange={onAdvancedOpenChange}
      className="border rounded-lg p-4"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <h3 className="text-sm font-medium">Advanced Options</h3>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${advancedOpen ? "transform rotate-180" : ""}`} />
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Detection Sensitivity: {detectionSensitivity}%</Label>
          </div>
          <Slider 
            value={[detectionSensitivity]} 
            min={0} 
            max={100} 
            step={1} 
            onValueChange={(values) => onDetectionSensitivityChange(values[0])} 
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="feather-edges">Feather Edges</Label>
            <Switch 
              id="feather-edges" 
              checked={featherEdges} 
              onCheckedChange={onFeatherEdgesChange} 
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
                onValueChange={(values) => onFeatherAmountChange(values[0])} 
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="preserve-details">Preserve Details</Label>
          <Switch 
            id="preserve-details" 
            checked={preserveDetails} 
            onCheckedChange={onPreserveDetailsChange} 
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="enhance-quality">Enhance Quality</Label>
          <Switch 
            id="enhance-quality" 
            checked={enhanceQuality} 
            onCheckedChange={onEnhanceQualityChange} 
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
