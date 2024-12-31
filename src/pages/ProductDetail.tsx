import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const handleCheckout = async () => {
    if (!product?.stripe_price_id) {
      toast.error("This product is not available for purchase yet");
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          productId: product.stripe_price_id,
        },
      });

      if (error) {
        toast.error("Failed to create checkout session");
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Invalid checkout response");
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error("Failed to initiate checkout");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto py-8">
        <Card>
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-96 object-cover rounded-t-lg"
            />
          )}
          <CardHeader>
            <CardTitle className="text-4xl">{product.name}</CardTitle>
            <CardDescription className="text-2xl font-semibold">
              ${product.price.toFixed(2)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose max-w-none">
              {product.description?.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <Button size="lg" className="w-full" onClick={handleCheckout}>
              Buy Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;