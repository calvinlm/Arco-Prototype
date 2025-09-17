"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ProductCatalog } from "@/components/product-catalog"
import { ViewportControls } from "@/components/viewport-controls"
import { TotalBar } from "@/components/total-bar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useCart } from "@/contexts/cart-context"

interface PlacedItem {
  id: string
  productId: string
  name: string
  price: number
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
}

const mockFloorPlans = {
  "1": { name: "Modern Studio", size: 35 },
  "2": { name: "Urban One Bedroom", size: 55 },
  "3": { name: "Family Two Bedroom", size: 85 },
  "4": { name: "Executive Suite", size: 95 },
  "5": { name: "Penthouse", size: 120 },
  "6": { name: "Loft Style", size: 65 },
}

export function RoomBuilder() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") || "1"
  const { addItem, itemCount } = useCart()
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([])
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"3d" | "top">("3d")

  const currentPlan = mockFloorPlans[planId as keyof typeof mockFloorPlans] || mockFloorPlans["1"]

  const handleAddItem = (product: any) => {
    addItem(product)

    const newItem: PlacedItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      position: { x: Math.random() * 10 - 5, y: 0, z: Math.random() * 10 - 5 },
      rotation: { x: 0, y: Math.random() * 360, z: 0 },
    }
    setPlacedItems([...placedItems, newItem])
  }

  const handleRemoveItem = (itemId: string) => {
    setPlacedItems(placedItems.filter((item) => item.id !== itemId))
    if (selectedItem === itemId) {
      setSelectedItem(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Main Content */}
      <main className="md:ml-64 pt-16 md:pt-0 pb-16 md:pb-0">
        {/* Header */}
        <header className="bg-white border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground">{currentPlan.name}</h1>
                <p className="text-sm text-muted-foreground">{currentPlan.size} m² • Design Mode</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="hidden md:flex">
                {itemCount} items
              </Badge>
              <Button variant={viewMode === "3d" ? "default" : "outline"} size="sm" onClick={() => setViewMode("3d")}>
                3D
              </Button>
              <Button variant={viewMode === "top" ? "default" : "outline"} size="sm" onClick={() => setViewMode("top")}>
                Top
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)]">
          {/* 3D Viewport */}
          <div className="flex-1 relative bg-slate-50 border-r border-border">
            {/* Placeholder 3D Canvas */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
              {placedItems.length === 0 ? (
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-12 h-12 border-2 border-dashed border-muted-foreground rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🏠</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Start designing your space</h3>
                  <p className="text-muted-foreground max-w-md">
                    Drag furniture and décor items from the catalog to place them in your room
                  </p>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  {/* Mock 3D Scene */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-green-50 opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🏠</div>
                      <p className="text-lg font-medium text-foreground">3D View</p>
                      <p className="text-sm text-muted-foreground">{placedItems.length} items placed</p>
                    </div>
                  </div>

                  {/* Placed Items List (Mock) */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 max-w-xs">
                    <h4 className="font-medium text-sm mb-2">Placed Items:</h4>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {placedItems.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between text-xs p-2 rounded cursor-pointer ${
                            selectedItem === item.id ? "bg-primary/10" : "hover:bg-muted"
                          }`}
                          onClick={() => setSelectedItem(item.id)}
                        >
                          <span className="truncate">{item.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 ml-2"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRemoveItem(item.id)
                            }}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Viewport Controls */}
            <ViewportControls className="absolute top-4 right-4" />
          </div>

          {/* Product Catalog Panel */}
          <div className="w-full lg:w-96 bg-white border-t lg:border-t-0 lg:border-l border-border">
            <ProductCatalog onAddItem={handleAddItem} />
          </div>
        </div>

        {/* Bottom Total Bar */}
        <TotalBar />
      </main>
    </div>
  )
}
