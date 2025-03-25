
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const TradingIdeaComments = () => {
  const [comment, setComment] = useState("");

  const handleAddComment = () => {
    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    
    toast.success("Comment added successfully");
    setComment("");
    // In a real app, you would add this to the database
  };

  return (
    <div className="mt-10" id="comments">
      <h3 className="text-xl font-semibold mb-6">Comments</h3>
      
      <div className="space-y-6 mb-8">
        {/* This would be populated with actual comments in a real app */}
        <div className="bg-muted/40 p-4 rounded-md">
          <p className="text-center text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="font-medium">Add a comment</h4>
        <Textarea
          id="comment-section"
          placeholder="Share your thoughts..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button onClick={handleAddComment}>Post Comment</Button>
        </div>
      </div>
    </div>
  );
};

export default TradingIdeaComments;
