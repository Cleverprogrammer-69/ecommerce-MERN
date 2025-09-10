import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Eye } from "lucide-react";
type ProductCardProps = {
  productId: number;
  name: string;
  price: number;
  photo: string;
  rating: number;
  reviews: number;
  category: string;
  isNew: boolean;
  discount: number;
  originalPrice: number;
  stock: number;
  handler: () => void;
};
const server = "http://localhost:4000";
const ProductCard = ({
  productId,
  name,
  price,
  photo,
  rating,
  reviews,
  category,
  isNew,
  discount,
  originalPrice,
  stock,
  handler,
}: ProductCardProps) => {
  return (
    <Card
      key={productId}
      className="bg-card group hover:shadow-lg transition-all duration-300 overflow-hidden py-0"
    >
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={photo}
            alt={name}
            className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
            // onError={(e) => {
            //   // Fallback to placeholder if image fails to load
            //   e.currentTarget.src = `/placeholder.svg?height=192&width=300&query=${encodeURIComponent(product.name)}`
            // }}
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {isNew && (
              <Badge className="bg-primary text-primary-foreground">New</Badge>
            )}
            {discount > 0 && <Badge variant="destructive">-{discount}%</Badge>}
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-1 px-4">
        <div className="mb-1">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviews} reviews)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">${price}</span>
          {originalPrice > price && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-2 pt-0">
        <Button
          className="w-full group-hover:bg-primary/90 transition-colors cursor-pointer"
          onClick={() => handler()}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
