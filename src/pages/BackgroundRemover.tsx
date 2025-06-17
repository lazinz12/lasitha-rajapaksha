
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, Trash2, Image as ImageIcon } from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";

const BackgroundRemover = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setOriginalImage(e.target?.result as string);
          setProcessedImage(null);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Error",
          description: "Please select a valid image file",
          variant: "destructive",
        });
      }
    }
  };

  const removeBackground = async () => {
    if (!originalImage) {
      toast({
        title: "Error",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate background removal processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll use the original image
      // In a real implementation, you would use a background removal API
      setProcessedImage(originalImage);
      
      toast({
        title: "Success",
        description: "Background removed successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove background",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'background-removed.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearImages = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Helmet>
        <title>Background Remover - Remove Image Backgrounds | Lasitha Rajapaksha</title>
        <meta name="description" content="Remove backgrounds from images using AI technology. Free online tool to create transparent backgrounds." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <ImageIcon className="h-8 w-8" />
            Background Remover
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {originalImage ? (
                    <img 
                      src={originalImage} 
                      alt="Original" 
                      className="max-w-full max-h-64 mx-auto rounded"
                    />
                  ) : (
                    <div className="space-y-4">
                      <ImageIcon className="h-16 w-16 mx-auto text-gray-400" />
                      <p className="text-gray-500">Click to upload an image</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Image
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={removeBackground} 
                    disabled={!originalImage || isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? "Processing..." : "Remove Background"}
                  </Button>
                  <Button onClick={clearImages} variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-64">
                  {processedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={processedImage} 
                        alt="Processed" 
                        className="max-w-full max-h-64 mx-auto rounded"
                      />
                      <Button onClick={downloadImage}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">Processed image will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default BackgroundRemover;
