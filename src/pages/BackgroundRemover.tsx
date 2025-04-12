
import React, { useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import { BGRemoveUploader } from "@/components/tools/bg-remover/BGRemoveUploader";
import { BGRemoveOptions } from "@/components/tools/bg-remover/BGRemoveOptions";
import { BGRemovePreview } from "@/components/tools/bg-remover/BGRemovePreview";
import { BGRemoveActionBar } from "@/components/tools/bg-remover/BGRemoveActionBar";
import { useBGRemover } from "@/hooks/use-bg-remover";
import { Progress } from "@/components/ui/progress";

const BackgroundRemover = () => {
  const {
    image,
    imagePreview,
    resultUrl,
    loading,
    progress,
    backgroundMode,
    backgroundColor,
    blurAmount,
    featherEdges,
    featherAmount,
    enhanceQuality,
    setImage,
    setBackgroundMode,
    setBackgroundColor,
    setBlurAmount,
    setFeatherEdges,
    setFeatherAmount,
    setEnhanceQuality,
    processImage,
    downloadImage,
  } = useBGRemover();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8 animate-fade-up">
          <h1 className="text-3xl font-bold mb-2">Image Background Remover</h1>
          <p className="text-muted-foreground">
            Remove backgrounds from your images with AI-powered precision
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <BGRemoveUploader 
              image={image}
              imagePreview={imagePreview}
              setImage={setImage}
            />
            
            <BGRemoveOptions
              backgroundMode={backgroundMode}
              backgroundColor={backgroundColor}
              blurAmount={blurAmount}
              featherEdges={featherEdges}
              featherAmount={featherAmount}
              enhanceQuality={enhanceQuality}
              setBackgroundMode={setBackgroundMode}
              setBackgroundColor={setBackgroundColor}
              setBlurAmount={setBlurAmount}
              setFeatherEdges={setFeatherEdges}
              setFeatherAmount={setFeatherAmount}
              setEnhanceQuality={setEnhanceQuality}
            />
            
            {loading && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Processing image...</span>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}
            
            <BGRemoveActionBar
              hasImage={!!image}
              hasResult={!!resultUrl}
              loading={loading}
              onRemoveBackground={processImage}
              onDownloadImage={downloadImage}
            />
          </div>
          
          <BGRemovePreview 
            imagePreview={imagePreview}
            resultUrl={resultUrl}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundRemover;
