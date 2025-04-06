
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface BlogPostFormProps {
  initialTitle?: string;
  initialContent?: string;
  initialPublished?: boolean;
  onSubmit: (data: { title: string; content: string; published: boolean }) => void;
  isEditing?: boolean;
}

export const BlogPostForm = ({
  initialTitle = "",
  initialContent = "",
  initialPublished = false,
  onSubmit,
  isEditing = false,
}: BlogPostFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [published, setPublished] = useState(initialPublished);
  const [editorMode, setEditorMode] = useState<"normal" | "html">("normal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, published });
    if (!isEditing) {
      setTitle("");
      setContent("");
      setPublished(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      
      <Tabs value={editorMode} onValueChange={(value) => setEditorMode(value as "normal" | "html")} className="w-full">
        <TabsList className="mb-2">
          <TabsTrigger value="normal">Normal Mode</TabsTrigger>
          <TabsTrigger value="html">HTML Mode</TabsTrigger>
        </TabsList>
        
        <TabsContent value="normal" className="w-full">
          <Textarea
            placeholder="Post Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="min-h-[200px]"
          />
          <div className="text-xs text-muted-foreground mt-1">
            Use # for main heading, ## for subheading, ### for sub-subheading, and - for bullet points
          </div>
        </TabsContent>
        
        <TabsContent value="html" className="w-full">
          <Textarea
            placeholder="HTML Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="min-h-[200px] font-mono"
          />
          <div className="text-xs text-muted-foreground mt-1">
            Write raw HTML content that will be rendered directly on the blog page
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex items-center space-x-2">
        <Switch checked={published} onCheckedChange={setPublished} id="published-switch" />
        <Label htmlFor="published-switch">Published</Label>
      </div>
      
      <Button type="submit">
        {isEditing ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
};
