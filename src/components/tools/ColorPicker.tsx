
import React from "react";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <div 
        className="w-8 h-8 rounded-md border" 
        style={{ backgroundColor: value }}
      />
      <Input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 h-8 p-0"
      />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-24"
      />
    </div>
  );
};
