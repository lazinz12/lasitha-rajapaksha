
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { slug } = useParams();
  const isMobile = useIsMobile();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*, profiles(email)")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  // Format content into sections based on headings
  const formatContent = (content: string) => {
    if (!content) return [];
    
    // Split content by new lines and filter out empty paragraphs
    return content.split('\n').filter(para => para.trim() !== '');
  };

  const renderLoadingSkeleton = () => (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (isLoading) {
    return renderLoadingSkeleton();
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto py-8 px-4">
          <Card className="text-center p-8">
            <CardTitle className="mb-4">Post Not Found</CardTitle>
            <CardDescription className="mb-6">
              The blog post you're looking for doesn't exist or has been removed.
            </CardDescription>
            <Link to="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const paragraphs = formatContent(post.content);

  return (
    <div className="min-h-screen">
      <Header />
      <div className={`container mx-auto ${isMobile ? 'py-4 px-3' : 'py-8 px-4'}`}>
        <div className="mb-4">
          <Link to="/blog">
            <Button variant="ghost" size={isMobile ? "sm" : "default"} className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
        
        <Card>
          <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
            <CardTitle className={`${isMobile ? 'text-2xl' : 'text-3xl'} mb-2`}>
              {post.title}
            </CardTitle>
            <CardDescription>
              By {post.profiles?.email} on {format(new Date(post.created_at), "MMM dd, yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent className={isMobile ? 'p-4' : 'p-6'}>
            <div className="prose max-w-none">
              {paragraphs.map((paragraph, index) => {
                // Check if paragraph is a heading
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-2xl font-bold mt-6 mb-4">
                      {paragraph.replace('# ', '')}
                    </h1>
                  );
                } else if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-xl font-bold mt-5 mb-3">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-lg font-bold mt-4 mb-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('- ')) {
                  // Bullet list item
                  return (
                    <div key={index} className="flex gap-2 ml-4 mb-2">
                      <span>•</span>
                      <span>{paragraph.replace('- ', '')}</span>
                    </div>
                  );
                } else {
                  // Regular paragraph
                  return (
                    <p key={index} className={`${isMobile ? 'text-sm' : 'text-base'} mb-4 leading-relaxed`}>
                      {paragraph}
                    </p>
                  );
                }
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogPost;
