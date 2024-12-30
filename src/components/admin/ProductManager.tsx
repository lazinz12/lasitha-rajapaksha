import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ProductManager = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error fetching products");
      return;
    }

    setProducts(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      price: parseFloat(price),
      image_url: imageUrl,
    };

    if (editingId) {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingId);

      if (error) {
        toast.error("Error updating product");
        return;
      }

      toast.success("Product updated successfully");
    } else {
      const { error } = await supabase
        .from("products")
        .insert([productData]);

      if (error) {
        toast.error("Error creating product");
        return;
      }

      toast.success("Product created successfully");
    }

    setName("");
    setDescription("");
    setPrice("");
    setImageUrl("");
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (product: any) => {
    setName(product.name);
    setDescription(product.description || "");
    setPrice(product.price.toString());
    setImageUrl(product.image_url || "");
    setEditingId(product.id);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Error deleting product");
      return;
    }

    toast.success("Product deleted successfully");
    fetchProducts();
  };

  const addSampleProducts = async () => {
    const sampleProducts = [
      {
        name: "MacBook Pro",
        description: "Powerful laptop for professionals",
        price: 1299.99,
        image_url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      },
      {
        name: "Apple Watch",
        description: "Smart watch with health tracking features",
        price: 399.99,
        image_url: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
      },
      {
        name: "DJI Drone",
        description: "Professional aerial photography drone",
        price: 799.99,
        image_url: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
      },
    ];

    for (const product of sampleProducts) {
      const { error } = await supabase
        .from("products")
        .insert([product]);

      if (error) {
        toast.error(`Error adding sample product: ${product.name}`);
        return;
      }
    }

    toast.success("Sample products added successfully");
    fetchProducts();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <Button onClick={addSampleProducts} variant="outline">
          Add Sample Products
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="number"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Button type="submit">
          {editingId ? "Update Product" : "Create Product"}
        </Button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3">{product.description}</p>
              <div className="mt-2">
                <p className="font-semibold">${product.price.toFixed(2)}</p>
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="mt-2 w-full h-40 object-cover rounded"
                  />
                )}
              </div>
            </CardContent>
            <CardFooter className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(product)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;