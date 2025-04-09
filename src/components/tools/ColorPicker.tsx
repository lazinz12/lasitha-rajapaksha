
import React from "react";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, label }) => {
  return (
    <div className="flex items-center gap-3">
      <div 
        className="w-10 h-10 rounded-md border" 
        style={{ backgroundColor: value }}
      />
      <Input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-14 h-10 p-0 overflow-hidden"
        title={label || "Select color"}
      />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-28"
        placeholder="#RRGGBB"
      />
    </div>
  );
};
