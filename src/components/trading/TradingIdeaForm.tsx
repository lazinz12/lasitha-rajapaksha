
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { TrendingUp, Upload, Eye, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { generateSlug } from "@/utils/slugUtils";

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(100, { message: "Title must be less than 100 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(1000, { message: "Description must be less than 1000 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const TradingIdeaForm = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (!imageFile) {
      toast.error("Please upload an image for your trading idea");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create slug from title
      const slug = generateSlug(values.title);
      
      // Upload image to Supabase Storage
      const { data: imageData, error: imageError } = await supabase.storage
        .from('trading-ideas')
        .upload(`${slug}-${Date.now()}`, imageFile);
      
      if (imageError) throw imageError;
      
      // Get the public URL for the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from('trading-ideas')
        .getPublicUrl(imageData.path);
      
      // Submit trading idea to database
      const { error: insertError } = await supabase
        .from('trading_ideas')
        .insert({
          title: values.title,
          description: values.description,
          image_url: publicUrlData.publicUrl,
          slug: slug,
        });
      
      if (insertError) throw insertError;
      
      toast.success("Trading idea submitted successfully!");
      navigate("/trading-ideas");
    } catch (error) {
      console.error("Error submitting trading idea:", error);
      toast.error("Failed to submit trading idea. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Share a Trading Idea
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a catchy title for your trading idea" {...field} />
                  </FormControl>
                  <FormDescription>
                    A clear, descriptive title helps others understand your idea quickly.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormItem className="space-y-2">
              <FormLabel>Chart Image</FormLabel>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md border-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileImage className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF (Max 10MB)</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Chart preview"
                    className="max-h-60 rounded-md object-contain"
                  />
                </div>
              )}
            </FormItem>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain your trading idea, analysis, and potential outcomes..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include your strategy, timeframe, and analysis reasoning.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <CardFooter className="px-0 flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/trading-ideas")}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="gap-1"
                onClick={() => form.handleSubmit(onSubmit)()}
                disabled={!imageFile || isSubmitting}
              >
                <Eye className="h-4 w-4" /> Preview
              </Button>
              <Button
                type="submit"
                className="gap-1"
                disabled={!imageFile || isSubmitting}
              >
                <Upload className="h-4 w-4" /> {isSubmitting ? "Submitting..." : "Publish"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TradingIdeaForm;
