import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

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
      <Textarea
        placeholder="Post Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="min-h-[200px]"
      />
      <div className="flex items-center space-x-2">
        <Switch checked={published} onCheckedChange={setPublished} />
        <span>Published</span>
      </div>
      <Button type="submit">
        {isEditing ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
};