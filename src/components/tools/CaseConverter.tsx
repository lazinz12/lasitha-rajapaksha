
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, Trash2, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CaseConverter = () => {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const convertCase = (type: string) => {
    switch (type) {
      case "upper":
        setText(text.toUpperCase());
        break;
      case "lower":
        setText(text.toLowerCase());
        break;
      case "title":
        setText(
          text
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        );
        break;
      case "sentence":
        setText(
          text
            .toLowerCase()
            .replace(/(^\w|\.\s+\w)/g, (letter) => letter.toUpperCase())
        );
        break;
      case "capitalized":
        setText(
          text
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        );
        break;
      case "alternating":
        setText(
          text
            .split("")
            .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
            .join("")
        );
        break;
      case "inverse":
        setText(
          text
            .split("")
            .map((char) =>
              char === char.toUpperCase()
                ? char.toLowerCase()
                : char.toUpperCase()
            )
            .join("")
        );
        break;
      case "snake":
        setText(
          text
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/[^\w_]/g, "")
        );
        break;
      case "kebab":
        setText(
          text
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "")
        );
        break;
      case "camel":
        setText(
          text
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .replace(/\s+(.)/g, (_, c) => c.toUpperCase())
            .replace(/\s/g, "")
            .replace(/^(.)/, (c) => c.toLowerCase())
        );
        break;
      case "pascal":
        setText(
          text
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .replace(/\s+(.)/g, (_, c) => c.toUpperCase())
            .replace(/\s/g, "")
            .replace(/^(.)/, (c) => c.toUpperCase())
        );
        break;
      case "constant":
        setText(
          text
            .toUpperCase()
            .replace(/\s+/g, "_")
            .replace(/[^\w_]/g, "")
        );
        break;
      default:
        break;
    }
  };

  const copyToClipboard = async () => {
    if (!text) {
      toast({
        title: "Nothing to copy",
        description: "Please enter some text first.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard successfully.",
      });
    } catch (err) {
      console.error('Copy failed:', err);
      toast({
        title: "Error",
        description: "Failed to copy text to clipboard. Please try selecting and copying manually.",
        variant: "destructive",
      });
    }
  };

  const downloadText = () => {
    if (!text) {
      toast({
        title: "Nothing to download",
        description: "Please enter some text first.",
        variant: "destructive",
      });
      return;
    }

    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "converted-text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded!",
      description: "Text has been downloaded successfully.",
    });
  };

  const clearText = () => {
    setText("");
    toast({
      title: "Cleared",
      description: "Text has been cleared.",
    });
  };

  const handleFileUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".txt";
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content);
        toast({
          title: "File loaded",
          description: "Text content loaded successfully.",
        });
      };
      reader.readAsText(file);
    };
    
    input.click();
  };

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert..."
        className="min-h-[200px] text-base md:text-lg font-mono"
      />
      
      <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadText}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleFileUpload}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={clearText}
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Clear
        </Button>
      </div>

      <Tabs defaultValue="common" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="common">Common Cases</TabsTrigger>
          <TabsTrigger value="programming">Programming Cases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="common" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <Button onClick={() => convertCase("upper")}>UPPERCASE</Button>
            <Button onClick={() => convertCase("lower")}>lowercase</Button>
            <Button onClick={() => convertCase("title")}>Title Case</Button>
            <Button onClick={() => convertCase("sentence")}>Sentence case</Button>
            <Button onClick={() => convertCase("capitalized")}>Capitalized Case</Button>
            <Button onClick={() => convertCase("alternating")}>aLtErNaTiNg cAsE</Button>
            <Button onClick={() => convertCase("inverse")}>InVeRsE CaSe</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="programming" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <Button onClick={() => convertCase("snake")}>snake_case</Button>
            <Button onClick={() => convertCase("kebab")}>kebab-case</Button>
            <Button onClick={() => convertCase("camel")}>camelCase</Button>
            <Button onClick={() => convertCase("pascal")}>PascalCase</Button>
            <Button onClick={() => convertCase("constant")}>CONSTANT_CASE</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
