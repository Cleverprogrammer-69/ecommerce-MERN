// export const products = [
//   {
//     id: 1,
//     name: "Professional Camera",
//     price: 899.99,
//     originalPrice: 1199.99,
//     image: "/images/camera.jpg",
//     rating: 4.8,
//     reviews: 124,
//     category: "Electronics",
//     isNew: true,
//     discount: 25,
//     stock: 10,
//   },
//   {
//     id: 2,
//     name: "Wireless Headphones",
//     price: 199.99,
//     originalPrice: 249.99,
//     image: "../assets/images/camera-cover.jpg",
//     rating: 4.6,
//     reviews: 89,
//     category: "Audio",
//     isNew: false,
//     discount: 20,
//     stock: 15,
//   },
//   {
//     id: 3,
//     name: "Smart Watch",
//     price: 299.99,
//     originalPrice: 399.99,
//     image: "/assets/images/camera-cover.jpg",
//     rating: 4.7,
//     reviews: 156,
//     category: "Wearables",
//     isNew: true,
//     discount: 25,
//     stock: 5,
//   },
//   {
//     id: 4,
//     name: "Laptop Stand",
//     price: 49.99,
//     originalPrice: 69.99,
//     image: "/assets/images/camera-cover.jpg",
//     rating: 4.5,
//     reviews: 67,
//     category: "Accessories",
//     isNew: false,
//     discount: 29,
//     stock: 20,
//   },
// ];
export type Product = {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviews: number
  category: "headphone" | "camera" | "smartWatch"
  isNew?: boolean
  stock?: number
}

export const products: Product[] = [
  {
    id: "p-1",
    name: "Wireless Headphones X200",
    image: "/wireless-headphones.png",
    price: 149,
    originalPrice: 199,
    discount: 25,
    rating: 4.5,
    reviews: 328,
    category: "headphone",
    isNew: true,
    stock: 18,
  },
  {
    id: "p-2",
    name: "Mirrorless Camera ProLite 4K",
    image: "/placeholder.jpg",
    price: 899,
    originalPrice: 999,
    discount: 10,
    rating: 4.7,
    reviews: 142,
    category: "camera",
    stock: 7,
  },
  {
    id: "p-3",
    name: "Smart Watch Series S",
    image: "/placeholder-user.jpg",
    price: 229,
    rating: 4.2,
    reviews: 502,
    category: "smartWatch",
    isNew: false,
    stock: 0,
  },
  {
    id: "p-4",
    name: "Studio Headphones Reference One",
    image: "/placeholder.jpg",
    price: 299,
    rating: 4.8,
    reviews: 88,
    category: "headphone",
    stock: 11,
  },
  {
    id: "p-5",
    name: "Travel Camera Compact Zoom",
    image: "/placeholder.jpg",
    price: 349,
    rating: 4.1,
    reviews: 63,
    category: "camera",
    stock: 24,
  },
  {
    id: "p-6",
    name: "Fitness Smart Watch Lite",
    image: "/placeholder-user.jpg",
    price: 119,
    rating: 3.9,
    reviews: 210,
    category: "smartWatch",
    isNew: true,
    stock: 46,
  },
]
