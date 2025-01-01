import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateSlug } from "@/utils/slugUtils";
import { Product } from "@/types/product";

interface ProductFormProps {
  initialProduct?: Product;
  onSubmit: (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  buttonText: string;
}

export const ProductForm = ({ initialProduct, onSubmit, buttonText }: ProductFormProps) => {
  const [name, setName] = useState(initialProduct?.name ?? "");
  const [description, setDescription] = useState(initialProduct?.description ?? "");
  const [price, setPrice] = useState(initialProduct?.price?.toString() ?? "");
  const [imageUrl, setImageUrl] = useState(initialProduct?.image_url ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const timestamp = Date.now();
    
    await onSubmit({
      name,
      description,
      price: parseFloat(price),
      image_url: imageUrl,
      slug: initialProduct?.slug ?? generateSlug(name),
      stripe_price_id: initialProduct?.stripe_price_id
    });

    if (!initialProduct) {
      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
    }
  };

  return (
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
      <Button type="submit">{buttonText}</Button>
    </form>
  );
};