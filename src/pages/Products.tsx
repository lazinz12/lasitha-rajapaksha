import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      return data as Product[];
    },
  });

  const handleBuyNow = async (product: Product) => {
    if (!product.stripe_price_id) {
      toast({
        title: "Error",
        description: "This product is not available for purchase",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          productId: product.stripe_price_id,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Error",
        description: "Failed to create checkout session",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
            )}
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mb-2">${product.price}</p>
            <div className="flex justify-between items-center">
              <Link
                to={`/products/${product.id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                View Details
              </Link>
              <Button onClick={() => handleBuyNow(product)}>Buy Now</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;