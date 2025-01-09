import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download } from "lucide-react";

export const QrGenerator = () => {
  const [text, setText] = useState("");
  const [qrSize, setQrSize] = useState(200);

  const generateQrCodeUrl = () => {
    const encodedText = encodeURIComponent(text);
    return `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodedText}`;
  };

  const downloadQrCode = async () => {
    if (!text) return;
    
    try {
      const response = await fetch(generateQrCodeUrl());
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>QR Code Generator</CardTitle>
          <CardDescription>
            Generate QR codes for text, URLs, or any other content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="text">Text or URL</Label>
              <Input
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or URL to generate QR code"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size (pixels)</Label>
              <Input
                id="size"
                type="number"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                min="100"
                max="1000"
                step="50"
              />
            </div>

            {text && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img
                    src={generateQrCodeUrl()}
                    alt="Generated QR Code"
                    className="border rounded-lg"
                  />
                </div>
                <Button onClick={downloadQrCode} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download QR Code
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};