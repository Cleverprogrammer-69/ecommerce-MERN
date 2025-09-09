import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Eye } from "lucide-react";
import ProductCard from "@/components/custom/ProductCard";
// import
// Sample product data
const products = [
  {
    id: 1,
    name: "Professional Camera",
    price: 899.99,
    originalPrice: 1199.99,
    image: "/images/camera.jpg",
    rating: 4.8,
    reviews: 124,
    category: "Electronics",
    isNew: true,
    discount: 25,
    stock: 10,
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    image: "../assets/images/camera-cover.jpg",
    rating: 4.6,
    reviews: 89,
    category: "Audio",
    isNew: false,
    discount: 20,
    stock: 15,
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 299.99,
    originalPrice: 399.99,
    image: "/assets/images/camera-cover.jpg",
    rating: 4.7,
    reviews: 156,
    category: "Wearables",
    isNew: true,
    discount: 25,
    stock: 5,
  },
  {
    id: 4,
    name: "Laptop Stand",
    price: 49.99,
    originalPrice: 69.99,
    image: "/assets/images/camera-cover.jpg",
    rating: 4.5,
    reviews: 67,
    category: "Accessories",
    isNew: false,
    discount: 29,
    stock: 20,
  },
];

const Home = () => {
  const addToCartHandler = () => {
    console.log("Add to cart clicked");
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/camera-cover.jpg)" }}
        >
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            Discover Amazing Products
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-balance opacity-90">
            Find the perfect items for your lifestyle with our curated
            collection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Eye className="mr-2 h-5 w-5" />
              Browse Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Products Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Latest Products
              </h2>
              <p className="text-muted-foreground text-lg">
                Discover our newest arrivals and trending items
              </p>
            </div>
            <Button asChild variant="outline" size="lg">
              <Link to="/products" className="flex items-center gap-2">
                View All Products
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                productId={product.id}
                name={product.name}
                price={product.price}
                photo={product.image}
                rating={product.rating}
                reviews={product.reviews}
                category={product.category}
                isNew={product.isNew}
                discount={product.discount}
                originalPrice={product.originalPrice}
                stock={product.stock} // fallback if not defined
                handler={addToCartHandler}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">
                Free shipping on orders over $50
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-muted-foreground">
                30-day money back guarantee
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Round-the-clock customer support
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
