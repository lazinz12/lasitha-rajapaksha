import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Products = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleCheckout = async (product: any) => {
    if (!product.stripe_price_id) {
      toast.error("This product is not available for purchase yet");
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          productId: product.stripe_price_id,
        },
        headers: {
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        }
      });

      if (error) {
        console.error('Checkout error:', error);
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

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Our Products</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products?.map((product) => (
            <Card key={product.id} className="flex flex-col">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
              )}
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>${product.price.toFixed(2)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">{product.description}</p>
              </CardContent>
              <CardFooter className="mt-auto space-x-2">
                <Link to={`/products/${product.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
                <Button className="flex-1" onClick={() => handleCheckout(product)}>
                  Buy Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;