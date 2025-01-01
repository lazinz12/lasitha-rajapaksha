import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  return (
    <Card>
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
          onClick={() => onEdit(product)}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};