import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BlogPostForm } from "./BlogPostForm";
import { BlogPostCard } from "./BlogPostCard";
import { generateSlug } from "@/utils/slugUtils";

const BlogManager = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [editingPost, setEditingPost] = useState<any>(null);

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

  const handleSubmit = async (data: { title: string; content: string; published: boolean }) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to perform this action");
      return;
    }

    const slug = generateSlug(data.title);

    if (editingPost) {
      const { error } = await supabase
        .from("blog_posts")
        .update({ ...data, slug })
        .eq("id", editingPost.id);

      if (error) {
        toast.error("Error updating post");
        return;
      }

      toast.success("Post updated successfully");
      setEditingPost(null);
    } else {
      const { error } = await supabase
        .from("blog_posts")
        .insert([{ ...data, author_id: user.id, slug }]);

      if (error) {
        toast.error("Error creating post");
        return;
      }

      toast.success("Post created successfully");
    }

    fetchPosts();
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
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
        content: "In this comprehensive guide, we'll explore the best laptops for maximizing your productivity...",
        published: true,
        author_id: user.id,
        slug: generateSlug("Top 5 Laptops for Productivity")
      },
      {
        title: "The Ultimate Guide to Drone Photography",
        content: "Discover the art of aerial photography with our complete guide to drone photography...",
        published: true,
        author_id: user.id,
        slug: generateSlug("The Ultimate Guide to Drone Photography")
      },
      {
        title: "Choosing the Right Smartwatch for Your Lifestyle",
        content: "With so many smartwatch options available, finding the perfect one can be overwhelming...",
        published: true,
        author_id: user.id,
        slug: generateSlug("Choosing the Right Smartwatch for Your Lifestyle")
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

      <BlogPostForm
        initialTitle={editingPost?.title || ""}
        initialContent={editingPost?.content || ""}
        initialPublished={editingPost?.published || false}
        onSubmit={handleSubmit}
        isEditing={!!editingPost}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard
            key={post.id}
            post={post}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogManager;