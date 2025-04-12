
import React from "react";
import { Sparkles, ImageIcon, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface BGRemovePreviewProps {
  imagePreview: string | null;
  resultUrl: string | null;
  loading: boolean;
}

export const BGRemovePreview: React.FC<BGRemovePreviewProps> = ({
  imagePreview,
  resultUrl,
  loading,
}) => {
  const previewExamples = [
    "/lovable-uploads/7ec82679-39c2-48dc-b5be-df474aec5bb6.png",
    "/lovable-uploads/1181ccfe-63b7-4a81-80cc-d997607c84f8.png"
  ];

  return (
    <div className="space-y-4">
      <Label className="block font-medium">Preview</Label>
      <Card>
        <CardContent className="p-6 min-h-[400px] flex flex-col justify-center">
          {resultUrl ? (
            <div className="relative">
              {loading ? (
                <div className="flex items-center justify-center min-h-[300px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="grid place-items-center p-4" style={{
                  backgroundImage: "linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
                }}>
                  <img
                    src={resultUrl}
                    alt="Background Removed"
                    className="max-w-full h-auto"
                  />
                </div>
              )}
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {loading ? "Processing..." : "Background Removed"}
              </div>
            </div>
          ) : (
            <>
              {imagePreview ? (
                <div className="text-center p-8 text-muted-foreground">
                  <div className="mb-6 border rounded-lg p-4 flex justify-center items-center">
                    <img 
                      src={imagePreview} 
                      alt="Original" 
                      className="max-h-[200px] object-contain" 
                    />
                  </div>
                  <p className="flex items-center justify-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span>Click "Remove Background" to process your image</span>
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center p-8 text-muted-foreground">
                    <ImageIcon className="mx-auto h-12 w-12 mb-4" />
                    <p>Upload an image to remove its background</p>
                  </div>
                  <div className="border-t p-4">
                    <p className="text-sm font-medium mb-2">Examples:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {previewExamples.map((example, index) => (
                        <img 
                          key={index}
                          src={example}
                          alt={`Example ${index + 1}`}
                          className="w-full h-auto rounded border shadow-sm hover:opacity-90 transition-opacity"
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-green-500" /> 
          <span>Remove backgrounds from photos with AI precision</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-green-500" /> 
          <span>Choose transparent, solid color, or blurred backgrounds</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-green-500" /> 
          <span>Advanced options for professional-quality results</span>
        </div>
      </div>
    </div>
  );
};
