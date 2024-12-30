import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const BlogManager = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error fetching posts");
      return;
    }

    setPosts(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to perform this action");
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from("blog_posts")
        .update({ title, content, published })
        .eq("id", editingId);

      if (error) {
        toast.error("Error updating post");
        return;
      }

      toast.success("Post updated successfully");
    } else {
      const { error } = await supabase
        .from("blog_posts")
        .insert([{ title, content, published, author_id: user.id }]);

      if (error) {
        toast.error("Error creating post");
        return;
      }

      toast.success("Post created successfully");
    }

    setTitle("");
    setContent("");
    setPublished(false);
    setEditingId(null);
    fetchPosts();
  };

  const handleEdit = (post: any) => {
    setTitle(post.title);
    setContent(post.content);
    setPublished(post.published);
    setEditingId(post.id);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Error deleting post");
      return;
    }

    toast.success("Post deleted successfully");
    fetchPosts();
  };

  const addSamplePosts = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to perform this action");
      return;
    }

    const samplePosts = [
      {
        title: "Top 5 Laptops for Productivity",
        content: "In this comprehensive guide, we'll explore the best laptops for maximizing your productivity. From powerful processors to long-lasting batteries, we'll cover everything you need to know to make an informed decision.",
        published: true,
        author_id: user.id
      },
      {
        title: "The Ultimate Guide to Drone Photography",
        content: "Discover the art of aerial photography with our complete guide to drone photography. Learn about camera settings, composition techniques, and safety guidelines to capture stunning aerial shots.",
        published: true,
        author_id: user.id
      },
      {
        title: "Choosing the Right Smartwatch for Your Lifestyle",
        content: "With so many smartwatch options available, finding the perfect one can be overwhelming. We break down the key features, health tracking capabilities, and design considerations to help you make the right choice.",
        published: true,
        author_id: user.id
      }
    ];

    for (const post of samplePosts) {
      const { error } = await supabase
        .from("blog_posts")
        .insert([post]);

      if (error) {
        toast.error(`Error adding sample post: ${post.title}`);
        return;
      }
    }

    toast.success("Sample posts added successfully");
    fetchPosts();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Button onClick={addSamplePosts} variant="outline">
          Add Sample Posts
        </Button>
      </div>

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
          <Switch
            checked={published}
            onCheckedChange={setPublished}
          />
          <span>Published</span>
        </div>
        <Button type="submit">
          {editingId ? "Update Post" : "Create Post"}
        </Button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3">{post.content}</p>
              <div className="mt-2 text-sm text-gray-500">
                Status: {post.published ? "Published" : "Draft"}
              </div>
            </CardContent>
            <CardFooter className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(post)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;