"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { convertUSDToPHP, formatPHP } from "@/utils/currency"

interface Product {
  id: string
  name: string
  price: number
  category: "furniture" | "decor" | "lighting"
  thumbnailUrl: string
  affiliateUrlShopee?: string
  affiliateUrlLazada?: string
  description?: string
}

const mockProducts: Product[] = [
  // Furniture
  {
    id: "f1",
    name: "Modern Sofa",
    price: 899,
    category: "furniture",
    thumbnailUrl: "/modern-sofa-furniture.jpg",
    description: "Comfortable 3-seater sofa",
  },
  {
    id: "f2",
    name: "Dining Table",
    price: 649,
    category: "furniture",
    thumbnailUrl: "/dining-table-furniture.jpg",
    description: "Oak wood dining table for 6",
  },
  {
    id: "f3",
    name: "Office Chair",
    price: 299,
    category: "furniture",
    thumbnailUrl: "/office-chair-furniture.jpg",
    description: "Ergonomic office chair",
  },
  {
    id: "f4",
    name: "Bookshelf",
    price: 199,
    category: "furniture",
    thumbnailUrl: "/bookshelf-furniture.jpg",
    description: "5-tier wooden bookshelf",
  },
  {
    id: "f5",
    name: "Coffee Table",
    price: 349,
    category: "furniture",
    thumbnailUrl: "/coffee-table-furniture.jpg",
    description: "Glass top coffee table",
  },
  {
    id: "f6",
    name: "Bed Frame",
    price: 799,
    category: "furniture",
    thumbnailUrl: "/bed-frame-furniture.jpg",
    description: "Queen size platform bed",
  },

  // Décor
  {
    id: "d1",
    name: "Wall Art",
    price: 89,
    category: "decor",
    thumbnailUrl: "/wall-art-decor.jpg",
    description: "Abstract canvas painting",
  },
  {
    id: "d2",
    name: "Throw Pillows",
    price: 45,
    category: "decor",
    thumbnailUrl: "/throw-pillows-decor.jpg",
    description: "Set of 2 decorative pillows",
  },
  {
    id: "d3",
    name: "Area Rug",
    price: 199,
    category: "decor",
    thumbnailUrl: "/area-rug-decor.jpg",
    description: "Persian style area rug",
  },
  {
    id: "d4",
    name: "Plant Pot",
    price: 29,
    category: "decor",
    thumbnailUrl: "/plant-pot-decor.jpg",
    description: "Ceramic plant pot with stand",
  },
  {
    id: "d5",
    name: "Mirror",
    price: 129,
    category: "decor",
    thumbnailUrl: "/mirror-decor.jpg",
    description: "Round decorative mirror",
  },
  {
    id: "d6",
    name: "Vase",
    price: 59,
    category: "decor",
    thumbnailUrl: "/vase-decor.jpg",
    description: "Ceramic decorative vase",
  },

  // Lighting
  {
    id: "l1",
    name: "Pendant Light",
    price: 159,
    category: "lighting",
    thumbnailUrl: "/pendant-light-lighting.jpg",
    description: "Modern pendant light fixture",
  },
  {
    id: "l2",
    name: "Table Lamp",
    price: 79,
    category: "lighting",
    thumbnailUrl: "/table-lamp-lighting.jpg",
    description: "Minimalist table lamp",
  },
  {
    id: "l3",
    name: "Floor Lamp",
    price: 199,
    category: "lighting",
    thumbnailUrl: "/floor-lamp-lighting.jpg",
    description: "Arc floor lamp with dimmer",
  },
  {
    id: "l4",
    name: "Chandelier",
    price: 449,
    category: "lighting",
    thumbnailUrl: "/chandelier-lighting.jpg",
    description: "Crystal chandelier",
  },
  {
    id: "l5",
    name: "Wall Sconce",
    price: 89,
    category: "lighting",
    thumbnailUrl: "/wall-sconce-lighting.jpg",
    description: "Modern wall sconce",
  },
  {
    id: "l6",
    name: "LED Strip",
    price: 39,
    category: "lighting",
    thumbnailUrl: "/led-strip-lighting.jpg",
    description: "RGB LED strip lights",
  },
]

interface ProductCatalogProps {
  onAddItem: (product: Product) => void
}

export function ProductCatalog({ onAddItem }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("furniture")

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeTab === "all" || product.category === activeTab
    return matchesSearch && matchesCategory
  })

  const getProductsByCategory = (category: string) => {
    return filteredProducts.filter((product) => product.category === category)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-3">Product Catalog</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
          <TabsTrigger value="furniture">Furniture</TabsTrigger>
          <TabsTrigger value="decor">Décor</TabsTrigger>
          <TabsTrigger value="lighting">Lighting</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="furniture" className="h-full mt-4">
            <ProductGrid products={getProductsByCategory("furniture")} onAddItem={onAddItem} />
          </TabsContent>

          <TabsContent value="decor" className="h-full mt-4">
            <ProductGrid products={getProductsByCategory("decor")} onAddItem={onAddItem} />
          </TabsContent>

          <TabsContent value="lighting" className="h-full mt-4">
            <ProductGrid products={getProductsByCategory("lighting")} onAddItem={onAddItem} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

interface ProductGridProps {
  products: Product[]
  onAddItem: (product: Product) => void
}

function ProductGrid({ products, onAddItem }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Search className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
        <p className="text-muted-foreground text-center">Try adjusting your search or browse other categories</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-full px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddItem={onAddItem} />
        ))}
      </div>
    </ScrollArea>
  )
}

interface ProductCardProps {
  product: Product
  onAddItem: (product: Product) => void
}

function ProductCard({ product, onAddItem }: ProductCardProps) {
  return (
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-md">
      <CardContent className="p-0">
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <img
            src={product.thumbnailUrl || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
          />
          <Badge className="absolute top-2 right-2" variant="secondary">
            {formatPHP(convertUSDToPHP(product.price))}
          </Badge>
        </div>
        <div className="p-3">
          <h4 className="font-medium text-sm text-foreground mb-1 line-clamp-1">{product.name}</h4>
          {product.description && (
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
          )}
          <Button size="sm" className="w-full" onClick={() => onAddItem(product)} variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            Add to Room
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
