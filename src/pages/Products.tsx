import { useState, useEffect } from "react";
import { Star, Filter } from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { productApi, Product, PaginatedProductResponse, ProductFilter } from "@/services/productAPI.ts";
import { categoryApi, Category } from "@/services/categoryAPI.ts";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(12); // Display 12 products per page
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await categoryApi.getAllCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const filter: ProductFilter = {
          pageNumber,
          pageSize,
          attributeFilters: {},
        };
        if (selectedCategory !== "All") {
          filter.attributeFilters = { categoryId: selectedCategory };
        }
        const response: PaginatedProductResponse = await productApi.getAllProducts(filter);
        setProducts(response.items);
        setTotalCount(response.totalCount);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [pageNumber, selectedCategory]);

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
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
                <SelectItem key={category.categoryId} value={category.categoryId!}>
                  {category.categoryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Showing {products.length} of {totalCount} products</span>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.productId} className="group cursor-pointer hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img 
                      src={product.productImageUrl} 
                      alt={product.productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {categories.find((c) => c.categoryId === product.categoryId)?.categoryName || product.categoryId}
                      </Badge>
                      {product.hotDeals && (
                        <Badge className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300">
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {product.productName}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">
                      {product.productDescription}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {product.productUnitPrice != null ? `NRS. ${product.productUnitPrice}` : "N/A"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (
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

        {/* Pagination */}
        {!isLoading && !error && products.length > 0 && (
          <div className="flex justify-between items-center mt-12">
            <Button
              disabled={pageNumber === 1}
              onClick={() => handlePageChange(pageNumber - 1)}
            >
              Previous
            </Button>
            <span>
              Page {pageNumber} of {Math.ceil(totalCount / pageSize)}
            </span>
            <Button
              disabled={pageNumber * pageSize >= totalCount}
              onClick={() => handlePageChange(pageNumber + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}