import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Download, Upload, Image as ImageIcon } from "lucide-react";

export const ImageConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("png");
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImage = async () => {
    if (!selectedFile || !previewUrl) {
      toast({
        title: "No image selected",
        description: "Please select an image to convert.",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);

    try {
      // Create a canvas element to perform the conversion
      const img = new Image();
      img.src = previewUrl;
      await new Promise((resolve) => (img.onload = resolve));

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      ctx.drawImage(img, 0, 0);

      // Convert to the selected format
      const convertedDataUrl = canvas.toDataURL(`image/${outputFormat}`);

      // Create and trigger download
      const link = document.createElement("a");
      link.href = convertedDataUrl;
      link.download = `converted-image.${outputFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Conversion successful",
        description: "Your image has been converted and downloaded.",
      });
    } catch (error) {
      console.error("Error converting image:", error);
      toast({
        title: "Conversion failed",
        description: "There was an error converting your image.",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Image Converter</h1>
        <p className="text-muted-foreground">
          Convert your images to different formats easily
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-colors"
               onClick={() => fileInputRef.current?.click()}>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground text-center">
              Click to upload or drag and drop<br />
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>

          {previewUrl && (
            <div className="mt-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full h-auto rounded-lg mx-auto"
                style={{ maxHeight: "300px" }}
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="format">Output Format</Label>
            <Select
              value={outputFormat}
              onValueChange={setOutputFormat}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="jpeg">JPEG</SelectItem>
                <SelectItem value="webp">WebP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={convertImage}
            disabled={!selectedFile || isConverting}
            className="w-full"
          >
            {isConverting ? (
              <>Converting...</>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Convert & Download
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};