import { useState } from "react";
import { Star, Filter, X, ShoppingCart, Heart, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { getProducts, getProductsByCategory, getCategoryNames } from "@/services/mockData.ts";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const allProducts = getProducts();
  const categories = getCategoryNames();
  
  const filteredProducts = selectedCategory === "All" 
    ? allProducts 
    : getProductsByCategory(selectedCategory);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Our Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover our wide range of high-quality electronic products from top brands
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 p-6 bg-card rounded-lg border">
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by category:</span>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Showing {filteredProducts.length} products</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 h-full"
              onClick={() => handleProductClick(product)}
            >
              <CardContent className="p-0 h-full flex flex-col">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    {product.featured && (
                      <Badge className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`size-3 ${
                            i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">(4.8)</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      NRS. {product.price}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle add to cart without opening dialog
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Filter className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters to see more products
            </p>
            <Button onClick={() => setSelectedCategory("All")}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More Button (for future pagination) */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        )}
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto p-0">
          {selectedProduct && (
            <>
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-2xl font-bold">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Product Image */}
                  <div className="aspect-square overflow-hidden rounded-lg border">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="space-y-6">
                    {/* Badges and Category */}
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {selectedProduct.category}
                      </Badge>
                      {selectedProduct.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          Featured Product
                        </Badge>
                      )}
                    </div>

                    {/* Price */}
                    <div className="text-3xl font-bold text-primary">
                      NRS. {selectedProduct.price}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`size-4 ${
                              i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">(4.8 out of 5)</span>
                      <span className="text-sm text-muted-foreground">• 142 reviews</span>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h3 className="font-semibold mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          High-quality materials and construction
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          Latest technology and innovative design
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          1-year manufacturer warranty included
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          Fast and reliable performance
                        </li>
                      </ul>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm text-green-600 font-medium">In Stock</span>
                      <span className="text-sm text-muted-foreground">• Free delivery available</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button size="lg" className="flex-1">
                        <ShoppingCart className="size-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="lg">
                        <Heart className="size-4" />
                      </Button>
                      <Button variant="outline" size="lg">
                        <Share2 className="size-4" />
                      </Button>
                    </div>

                    {/* Additional Info */}
                    <div className="border-t pt-4 space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>SKU:</span>
                        <span>{selectedProduct.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span>{selectedProduct.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tags:</span>
                        <span>Electronics, {selectedProduct.category.toLowerCase()}, featured</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}