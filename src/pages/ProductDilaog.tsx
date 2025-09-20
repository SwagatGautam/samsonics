// components/ProductDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart} from "lucide-react"
import { Product } from "@/services/productAPI"
import { Navigate } from "react-router-dom"

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
}

export default function ProductDialog({ open, onOpenChange, product }: ProductDialogProps) {
  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-3xl font-bold font-[Roboto] mt-2">{product.productName}</DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img
                src={product.productImageUrl}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Badges and Category */}
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{product.productName}</Badge>
                {product.hotDeals && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                    Featured Product
                  </Badge>
                )}
              </div>

              {/* Price */}
              <div className="text-2xl font-bold text-primary font-[Roboto]">
                {product.productUnitPrice ? `NRS. ${product.productUnitPrice}` : "N/A"}
              </div>

              {/* Description (optional, might not exist in your API yet) */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.productDescription || "No description available"}
                </p>
              </div>

              {/* Key Features (placeholder, could come from API later) */}
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
                </ul>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 font-[Roboto]">
                {product.productQuantity> 0 ? (
                  product.productQuantity < 10 ? (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-sm text-red-600 font-medium">Low Stock</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm text-green-600 font-medium">In Stock</span>
                    </>
                  )
                ) : (
                  <>
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <span className="text-sm text-gray-600 font-medium">Out of Stock</span>
                  </>

                )}
                <span className="text-sm text-muted-foreground">• Free delivery available</span>
              </div>

              <div className="flex gap-3 pt-4">
                <Button size="lg" className="flex-1 font-[Roboto]">
                  <ShoppingCart className="size-4 mr-2" />
                  Contact for Details
                </Button>
              </div>

              {/* Additional Info */}
              <div className="border-t pt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>SKU:</span>
                  <span className="font-[Roboto]">{product.productId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
