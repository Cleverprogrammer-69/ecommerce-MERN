"use client"

import { useState } from "react"
import { Plus, Edit } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DataType {
  id: string
  photo: string
  name: string
  price: number
  stock: number
}

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804"

const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg"

const arr: Array<DataType> = [
  {
    id: "sajknaskd",
    photo: img,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
  },
  {
    id: "sdaskdnkasjdn",
    photo: img2,
    name: "Macbook",
    price: 232223,
    stock: 213,
  },
]

const Products = () => {
  const [products, setProducts] = useState<DataType[]>(arr)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", variant: "destructive" as const }
    if (stock < 10) return { label: "Low Stock", variant: "secondary" as const }
    return { label: "In Stock", variant: "default" as const }
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <p className="text-muted-foreground">Manage your product inventory and pricing</p>
              </div>
              <Button asChild>
                <Link to="/admin/product/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Link>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Product Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Photo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No products found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        products.map((product) => {
                          const stockStatus = getStockStatus(product.stock)
                          return (
                            <TableRow key={product.id}>
                              <TableCell>
                                <Avatar className="h-12 w-12 rounded-md">
                                  <AvatarImage
                                    src={product.photo || "/placeholder.svg"}
                                    alt={product.name}
                                    className="object-cover"
                                  />
                                  <AvatarFallback className="rounded-md">{product.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              </TableCell>
                              <TableCell className="font-medium">
                                <div className="max-w-[200px] truncate">{product.name}</div>
                              </TableCell>
                              <TableCell className="font-mono">{formatPrice(product.price)}</TableCell>
                              <TableCell>
                                <span className="font-medium">{product.stock}</span>
                              </TableCell>
                              <TableCell>
                                <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" asChild>
                                  <Link to={`/admin/product/${product.id}`}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Manage
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Products
