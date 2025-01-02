import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { ProductForm } from "./ProductForm";
import { ProductCard } from "./ProductCard";
import { generateSlug } from "@/utils/slugUtils";

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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

  const handleSubmit = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingProduct) {
      const { error } = await supabase
        .from("products")
        .update({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          image_url: productData.image_url,
          slug: generateSlug(productData.name)
        })
        .eq("id", editingProduct.id);

      if (error) {
        toast.error("Error updating product");
        return;
      }

      toast.success("Product updated successfully");
      setEditingProduct(null);
    } else {
      const { error } = await supabase
        .from("products")
        .insert([{
          ...productData,
          slug: generateSlug(productData.name)
        }]);

      if (error) {
        toast.error("Error creating product");
        return;
      }

      toast.success("Product created successfully");
    }

    fetchProducts();
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
        slug: generateSlug("MacBook Pro")
      },
      {
        name: "Apple Watch",
        description: "Smart watch with health tracking features",
        price: 399.99,
        image_url: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
        slug: generateSlug("Apple Watch")
      },
      {
        name: "DJI Drone",
        description: "Professional aerial photography drone",
        price: 799.99,
        image_url: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
        slug: generateSlug("DJI Drone")
      },
    ];

    const { error } = await supabase
      .from("products")
      .insert(sampleProducts);

    if (error) {
      toast.error("Error adding sample products");
      return;
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

      <ProductForm
        initialProduct={editingProduct}
        onSubmit={handleSubmit}
        buttonText={editingProduct ? "Update Product" : "Create Product"}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={setEditingProduct}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductManager;