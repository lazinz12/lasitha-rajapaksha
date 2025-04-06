
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*, profiles(email)")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Blog - Lasitha Rajapaksha | Developer & Forex Trader</title>
        <meta name="description" content="Read the latest articles from Lasitha Rajapaksha on programming, trading, and web development." />
        <meta name="keywords" content="blog, programming, forex trading, web development, lasitha rajapaksha" />
        <meta property="og:title" content="Blog - Lasitha Rajapaksha" />
        <meta property="og:description" content="Read the latest articles from Lasitha Rajapaksha on programming, trading, and web development." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="/blog" />
      </Helmet>
      
      <Header />
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  By {post.profiles?.email} on {format(new Date(post.created_at), "MMM dd, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="line-clamp-3">{post.content}</p>
                <Link to={`/blog/${post.slug}`}>
                  <Button variant="outline" className="w-full">Read More</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
