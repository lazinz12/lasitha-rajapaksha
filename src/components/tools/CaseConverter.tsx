import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
      default:
        break;
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard successfully.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "converted-text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const clearText = () => {
    setText("");
    toast({
      title: "Cleared",
      description: "Text has been cleared.",
    });
  };

  return (
    <div className="p-4 space-y-4 max-w-3xl mx-auto">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert..."
        className="min-h-[200px] text-base md:text-lg"
      />
      
      <div className="flex flex-wrap gap-2 justify-end mb-4">
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
          onClick={clearText}
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        <Button onClick={() => convertCase("upper")}>UPPERCASE</Button>
        <Button onClick={() => convertCase("lower")}>lowercase</Button>
        <Button onClick={() => convertCase("title")}>Title Case</Button>
        <Button onClick={() => convertCase("sentence")}>Sentence case</Button>
        <Button onClick={() => convertCase("capitalized")}>Capitalized Case</Button>
        <Button onClick={() => convertCase("alternating")}>aLtErNaTiNg cAsE</Button>
        <Button onClick={() => convertCase("inverse")}>InVeRsE CaSe</Button>
      </div>
    </div>
  );
};