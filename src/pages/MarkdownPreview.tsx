import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download, FileText, Eye } from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";

const MarkdownPreview = () => {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Preview

## What is Markdown?

Markdown is a **lightweight markup language** that you can use to add formatting elements to plaintext text documents.

### Features:
- Easy to read and write
- Converts to HTML
- Widely supported

### Code Example:
\`\`\`javascript
function hello() {
    console.log("Hello, World!");
}
\`\`\`

> This is a blockquote. It's useful for highlighting important information.

### Lists:
1. First item
2. Second item
3. Third item

- Bullet point
- Another bullet
- Last bullet

[Visit our website](https://example.com)

![Sample Image](https://via.placeholder.com/300x200)
`);
  const [previewMode, setPreviewMode] = useState<"split" | "preview">("split");
  const { toast } = useToast();

  // Simple markdown to HTML converter
  const markdownToHtml = (text: string): string => {
    return text
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`(.*?)`/gim, '<code>$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>')
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;" />')
      // Blockquotes
      .replace(/^&gt; (.*$)/gim, '<blockquote>$1</blockquote>')
      // Ordered lists
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
      // Unordered lists
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      // Line breaks
      .replace(/\n/gim, '<br />');
  };

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast({
        title: "Copied",
        description: "Markdown copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy markdown",
        variant: "destructive",
      });
    }
  };

  const copyHtml = async () => {
    try {
      const html = markdownToHtml(markdown);
      await navigator.clipboard.writeText(html);
      toast({
        title: "Copied",
        description: "HTML copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy HTML",
        variant: "destructive",
      });
    }
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadHtml = () => {
    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Markdown Document</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2, h3 { color: #333; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 20px; color: #666; }
        a { color: #0066cc; }
    </style>
</head>
<body>
${markdownToHtml(markdown)}
</body>
</html>`;
    
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>Markdown Preview - Live Markdown Editor | Lasitha Rajapaksha</title>
        <meta name="description" content="Free online tool to edit and preview Markdown in real-time. Create perfectly formatted documents, README files, and documentation easily." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Markdown Preview
          </h1>
          
          <div className="mb-4 flex gap-2 flex-wrap">
            <Button
              onClick={() => setPreviewMode("split")}
              variant={previewMode === "split" ? "default" : "outline"}
            >
              Split View
            </Button>
            <Button
              onClick={() => setPreviewMode("preview")}
              variant={previewMode === "preview" ? "default" : "outline"}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Only
            </Button>
            <Button onClick={copyMarkdown} variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Copy Markdown
            </Button>
            <Button onClick={copyHtml} variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Copy HTML
            </Button>
            <Button onClick={downloadMarkdown} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download MD
            </Button>
            <Button onClick={downloadHtml} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download HTML
            </Button>
          </div>

          <div className={`grid gap-6 ${previewMode === "split" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
            {(previewMode === "split") && (
              <Card>
                <CardHeader>
                  <CardTitle>Markdown Editor</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    placeholder="Enter your markdown here..."
                    className="min-h-[500px] font-mono text-sm"
                  />
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose max-w-none min-h-[500px] p-4 border rounded"
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(markdown) }}
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    lineHeight: '1.6'
                  }}
                />
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Markdown Syntax Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Basic Syntax:</h4>
                  <ul className="space-y-1 font-mono">
                    <li># Heading 1</li>
                    <li>## Heading 2</li>
                    <li>**Bold text**</li>
                    <li>*Italic text*</li>
                    <li>`Inline code`</li>
                    <li>[Link](url)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Advanced:</h4>
                  <ul className="space-y-1 font-mono">
                    <li>```code block```</li>
                    <li>> Blockquote</li>
                    <li>- List item</li>
                    <li>1. Numbered list</li>
                    <li>![Image](url)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default MarkdownPreview;
