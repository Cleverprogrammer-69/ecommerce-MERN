"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

import type { Product } from "@/lib/products"

export default function ProductCard({ product }: { product: Product }) {
  const { name, image, price, originalPrice, discount, rating, reviews, category, isNew, stock } = product

  const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
  const priceText = formatted.format(price)
  const originalText = originalPrice ? formatted.format(originalPrice) : undefined

  const outOfStock = stock !== undefined && stock <= 0

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative">
          {/* Image */}
          <img src={image || "/placeholder.svg"} alt={name} className="h-48 w-full object-cover" />
          {/* Top-left badges */}
          <div className="absolute left-2 top-2 flex gap-2">
            {isNew ? <Badge className="bg-primary text-primary-foreground">New</Badge> : null}
            {discount ? <Badge variant="secondary">-{discount}%</Badge> : null}
          </div>
          {/* Top-right category */}
          <div className="absolute right-2 top-2">
            <Badge variant="outline" className="bg-background/60 backdrop-blur">
              {category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 p-4">
        <CardTitle className="line-clamp-2 text-base leading-6">{name}</CardTitle>

        <div className="flex items-center gap-2">
          <span className="font-semibold">{priceText}</span>
          {originalText ? <span className="text-muted-foreground line-through text-sm">{originalText}</span> : null}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current" />
            {rating.toFixed(1)}
          </span>
          <span>({reviews} reviews)</span>
        </div>

        {typeof stock === "number" ? (
          <div className={cn("text-xs", outOfStock ? "text-destructive" : "text-muted-foreground")}>
            {outOfStock ? "Out of stock" : `${stock} in stock`}
          </div>
        ) : null}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" disabled={outOfStock}>
          {outOfStock ? "Out of stock" : "Add to cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}
