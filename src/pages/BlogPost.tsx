
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { format } from "date-fns";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BlogPost = () => {
  const { slug } = useParams();
  
  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*, profiles(email)")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{post.title} | Lasitha Rajapaksha's Blog</title>
        <meta name="description" content={post.content.substring(0, 160)} />
        <meta name="keywords" content={`${post.title.toLowerCase()}, blog, lasitha rajapaksha, programming, forex trading`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content.substring(0, 160)} />
        <meta property="og:type" content="article" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`/blog/${slug}`} />
      </Helmet>
      
      <Header />
      <div className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-500 mb-8">
            By {post.profiles?.email} on {format(new Date(post.created_at), "MMM dd, yyyy")}
          </div>
          <div className="prose max-w-none">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
