
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TradingIdeaFormFields from "./TradingIdeaFormFields";
import { useTradingIdeaForm } from "@/hooks/use-trading-idea-form";

interface TradingIdeaFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    additional_images?: string[] | null;
    published?: boolean;
    slug: string;
  } | null;
  isEdit?: boolean;
}

const TradingIdeaForm = ({ initialData, isEdit = false }: TradingIdeaFormProps) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    imageUrls,
    setImageUrls,
    isSubmitting,
    handleSubmit
  } = useTradingIdeaForm(initialData, isEdit);

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{isEdit ? "Edit Trading Idea" : "Share Your Trading Idea"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <TradingIdeaFormFields
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
          />
          
          <CardFooter className="px-0 pt-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || !title || !description || imageUrls.length === 0}
            >
              {isSubmitting ? "Submitting..." : (isEdit ? "Update" : "Submit")}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default TradingIdeaForm;
