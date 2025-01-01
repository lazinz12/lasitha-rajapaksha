import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
}

interface BlogPostCardProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}

export const BlogPostCard = ({ post, onEdit, onDelete }: BlogPostCardProps) => {
  return (
    <Card>
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
        <Button variant="outline" size="sm" onClick={() => onEdit(post)}>
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(post.id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};