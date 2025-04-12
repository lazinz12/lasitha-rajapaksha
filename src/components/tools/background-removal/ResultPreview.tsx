
import React from "react";
import { Wand, Check } from "lucide-react";

interface ResultPreviewProps {
  resultUrl: string | null;
  loading: boolean;
  previewExamples: string[];
}

export const ResultPreview: React.FC<ResultPreviewProps> = ({
  resultUrl,
  loading,
  previewExamples,
}) => {
  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden bg-[#f0f0f0] dark:bg-zinc-800 flex flex-col">
        {resultUrl ? (
          <div className="relative">
            {loading ? (
              <div className="flex items-center justify-center p-8 min-h-[300px]">
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
            <div className="text-center p-8 text-muted-foreground">
              <Wand className="mx-auto h-12 w-12 mb-4" />
              <p>Upload an image and remove its background</p>
            </div>
            <div className="border-t p-4">
              <p className="text-sm font-medium mb-2">Examples:</p>
              <div className="grid grid-cols-2 gap-2">
                {previewExamples.map((example, index) => (
                  <img 
                    key={index}
                    src={example}
                    alt={`Example ${index + 1}`}
                    className="w-full h-auto rounded border shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-green-500" /> 
          <span>Remove backgrounds from photos with precision</span>
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
