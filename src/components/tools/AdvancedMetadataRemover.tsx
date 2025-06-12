
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, X, FileImage, Shield, Zap, Info, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProcessedImage {
  id: string;
  original: File;
  originalPreview: string;
  cleanedUrl?: string;
  metadata?: Record<string, any>;
  processingProgress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
}

export const AdvancedMetadataRemover = () => {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const processImage = useCallback(async (image: ProcessedImage) => {
    try {
      // Update status to processing
      setImages(prev => prev.map(img => 
        img.id === image.id ? { ...img, status: 'processing' as const, processingProgress: 10 } : img
      ));

      // Extract basic metadata
      const metadata = {
        "File Name": image.original.name,
        "File Size": `${(image.original.size / 1024).toFixed(2)} KB`,
        "File Type": image.original.type,
        "Last Modified": new Date(image.original.lastModified).toLocaleString(),
        "Dimensions": "Calculating...",
      };

      // Progress update
      setImages(prev => prev.map(img => 
        img.id === image.id ? { ...img, processingProgress: 40, metadata } : img
      ));

      // Create cleaned version
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          setImages(prev => prev.map(item => 
            item.id === image.id ? { ...item, status: 'error' as const } : item
          ));
          return;
        }

        // Update metadata with dimensions
        const updatedMetadata = {
          ...metadata,
          "Dimensions": `${img.naturalWidth} × ${img.naturalHeight} pixels`,
        };

        // Progress update
        setImages(prev => prev.map(item => 
          item.id === image.id ? { ...item, processingProgress: 70, metadata: updatedMetadata } : item
        ));

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const cleanedUrl = URL.createObjectURL(blob);
            setImages(prev => prev.map(item => 
              item.id === image.id ? { 
                ...item, 
                cleanedUrl, 
                status: 'completed' as const, 
                processingProgress: 100 
              } : item
            ));
          }
        }, image.original.type, 0.95);
      };
      
      img.onerror = () => {
        setImages(prev => prev.map(item => 
          item.id === image.id ? { ...item, status: 'error' as const } : item
        ));
      };
      
      img.src = image.originalPreview;
    } catch (error) {
      console.error("Error processing image:", error);
      setImages(prev => prev.map(item => 
        item.id === image.id ? { ...item, status: 'error' as const } : item
      ));
    }
  }, []);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file.`,
          variant: "destructive",
        });
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: `${file.name} exceeds 10MB limit.`,
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        const newImage: ProcessedImage = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          original: file,
          originalPreview: preview,
          processingProgress: 0,
          status: 'uploading',
        };

        setImages(prev => [...prev, newImage]);
        
        // Start processing
        setTimeout(() => {
          processImage(newImage);
        }, 100);
      };
      reader.readAsDataURL(file);
    });
  }, [processImage, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const downloadImage = useCallback((image: ProcessedImage) => {
    if (!image.cleanedUrl) return;
    
    const link = document.createElement('a');
    link.href = image.cleanedUrl;
    link.download = `cleaned_${image.original.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "Your privacy-safe image is being downloaded.",
    });
  }, [toast]);

  const downloadAll = useCallback(() => {
    const completedImages = images.filter(img => img.status === 'completed' && img.cleanedUrl);
    completedImages.forEach(img => downloadImage(img));
    
    if (completedImages.length > 0) {
      toast({
        title: "Batch download started",
        description: `Downloading ${completedImages.length} cleaned images.`,
      });
    }
  }, [images, downloadImage, toast]);

  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove?.originalPreview.startsWith('blob:')) {
        URL.revokeObjectURL(imageToRemove.originalPreview);
      }
      if (imageToRemove?.cleanedUrl) {
        URL.revokeObjectURL(imageToRemove.cleanedUrl);
      }
      return prev.filter(img => img.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    images.forEach(img => {
      if (img.originalPreview.startsWith('blob:')) {
        URL.revokeObjectURL(img.originalPreview);
      }
      if (img.cleanedUrl) {
        URL.revokeObjectURL(img.cleanedUrl);
      }
    });
    setImages([]);
  }, [images]);

  const completedCount = images.filter(img => img.status === 'completed').length;
  const processingCount = images.filter(img => img.status === 'processing').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Stats */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Upload className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Total Images</p>
                  <p className="text-2xl font-bold">{images.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Processing</p>
                  <p className="text-2xl font-bold">{processingCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Completed</p>
                  <p className="text-2xl font-bold">{completedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upload Area */}
      {images.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Advanced Metadata Remover
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                dragActive 
                  ? "border-primary bg-primary/5 scale-105" 
                  : "border-muted-foreground/25 hover:border-muted-foreground/50"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FileImage className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Drop your images here</h3>
                  <p className="text-muted-foreground mb-4">
                    or click to browse and select multiple files
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Select Images
                    </label>
                  </Button>
                </div>
                <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline">JPEG</Badge>
                  <Badge variant="outline">PNG</Badge>
                  <Badge variant="outline">GIF</Badge>
                  <Badge variant="outline">WebP</Badge>
                  <Badge variant="outline">Max 10MB each</Badge>
                </div>
              </div>
            </div>
            
            <Alert className="mt-6">
              <Info className="h-4 w-4" />
              <AlertDescription>
                All processing happens locally in your browser. Your images never leave your device, ensuring complete privacy.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Batch Actions */}
      {images.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                  id="add-more-files"
                />
                <Button asChild variant="outline">
                  <label htmlFor="add-more-files" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Add More Images
                  </label>
                </Button>
                <Button onClick={clearAll} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  onClick={downloadAll} 
                  disabled={completedCount === 0}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download All ({completedCount})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <CardContent className="p-6">
                <Tabs defaultValue="preview" className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <TabsList>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="metadata">Metadata</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center gap-2">
                      {image.status === 'processing' && (
                        <Badge variant="outline" className="animate-pulse">
                          <Zap className="h-3 w-3 mr-1" />
                          Processing
                        </Badge>
                      )}
                      {image.status === 'completed' && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Ready
                        </Badge>
                      )}
                      {image.status === 'error' && (
                        <Badge variant="destructive">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Error
                        </Badge>
                      )}
                      <Button
                        onClick={() => removeImage(image.id)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {image.status === 'processing' && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Processing...</span>
                        <span>{image.processingProgress}%</span>
                      </div>
                      <Progress value={image.processingProgress} className="h-2" />
                    </div>
                  )}

                  <TabsContent value="preview">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          Original Image
                          <Badge variant="destructive">Contains Metadata</Badge>
                        </h4>
                        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                          <img
                            src={image.originalPreview}
                            alt="Original"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          Cleaned Image
                          {image.cleanedUrl && (
                            <Badge variant="secondary">Metadata Removed</Badge>
                          )}
                        </h4>
                        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                          {image.cleanedUrl ? (
                            <img
                              src={image.cleanedUrl}
                              alt="Cleaned"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-center">
                                {image.status === 'processing' && (
                                  <>
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                                    <p className="text-sm text-muted-foreground">Processing...</p>
                                  </>
                                )}
                                {image.status === 'error' && (
                                  <>
                                    <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
                                    <p className="text-sm text-destructive">Processing failed</p>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        {image.cleanedUrl && (
                          <Button
                            onClick={() => downloadImage(image)}
                            className="w-full mt-4"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Cleaned Image
                          </Button>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="metadata">
                    {image.metadata ? (
                      <div className="space-y-4">
                        <h4 className="font-medium">Image Information</h4>
                        <div className="grid gap-3 bg-muted/50 p-4 rounded-lg">
                          {Object.entries(image.metadata).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-2 border-b border-border/50 last:border-0">
                              <span className="font-medium text-muted-foreground">{key}:</span>
                              <span className="text-right font-mono text-sm">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <FileImage className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Metadata will appear here during processing</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
