import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const CaseConverter = () => {
  const [text, setText] = useState("");

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
      default:
        break;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert..."
        className="min-h-[100px]"
      />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => convertCase("upper")}>UPPERCASE</Button>
        <Button onClick={() => convertCase("lower")}>lowercase</Button>
        <Button onClick={() => convertCase("title")}>Title Case</Button>
        <Button onClick={() => convertCase("sentence")}>Sentence case</Button>
      </div>
    </div>
  );
};