import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Product;
    },
  });

  const handleBuyNow = async () => {
    if (!product?.stripe_price_id) {
      toast.error("This product is not available for purchase");
      return;
    }

    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: {
        productId: product.stripe_price_id,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      }
    });

    if (error) {
      console.error('Checkout error:', error);
      toast.error("Failed to create checkout session");
      return;
    }

    if (data?.url) {
      window.location.href = data.url;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {product.image_url && (
            <div>
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full rounded-lg"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold mb-4">${product.price}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <Button onClick={handleBuyNow} className="w-full">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;