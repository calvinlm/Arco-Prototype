"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { ArrowLeft, User, Cable as Cube } from "lucide-react"
import Link from "next/link"
import { convertUSDToPHP, formatPHP } from "@/utils/currency"

interface FloorPlan {
  id: string
  name: string
  type: string
  size: number
  thumbnailUrl: string
  price?: number
}

const mockFloorPlans: FloorPlan[] = [
  {
    id: "1",
    name: "Modern Studio",
    type: "Studio",
    size: 35,
    thumbnailUrl: "/modern-studio-apartment-floor-plan.jpg",
    price: 1200,
  },
  {
    id: "2",
    name: "Urban One Bedroom",
    type: "1BR",
    size: 55,
    thumbnailUrl: "/one-bedroom-apartment-floor-plan.jpg",
    price: 1800,
  },
  {
    id: "3",
    name: "Family Two Bedroom",
    type: "2BR",
    size: 85,
    thumbnailUrl: "/two-bedroom-apartment-floor-plan.jpg",
    price: 2400,
  },
  {
    id: "4",
    name: "Executive Suite",
    type: "2BR",
    size: 95,
    thumbnailUrl: "/executive-apartment-floor-plan.jpg",
    price: 2800,
  },
  {
    id: "5",
    name: "Penthouse",
    type: "3BR",
    size: 120,
    thumbnailUrl: "/penthouse-apartment-floor-plan.jpg",
    price: 3500,
  },
  {
    id: "6",
    name: "Loft Style",
    type: "1BR",
    size: 65,
    thumbnailUrl: "/loft-style-apartment-floor-plan.jpg",
    price: 2000,
  },
]

export function FloorPlanSelection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Main Content */}
      <main className="md:ml-64 pt-16 md:pt-0 pb-16 md:pb-0">
        {/* Header */}
        <header className="bg-white border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="md:hidden">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Choose your floor plan</h1>
                <p className="text-muted-foreground">Select the perfect layout for your space</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Floor Plans Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFloorPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedPlan === plan.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardContent className="p-0">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                    <img
                      src={plan.thumbnailUrl || "/placeholder.svg"}
                      alt={plan.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 left-3" variant="secondary">
                      {plan.type}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-foreground mb-2">{plan.name}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{plan.size} m²</span>
                      {plan.price && <span>From {formatPHP(convertUSDToPHP(plan.price))}/month</span>}
                    </div>
                    <Link href={`/builder?plan=${plan.id}`}>
                      <Button className="w-full" variant={selectedPlan === plan.id ? "default" : "outline"}>
                        Select Plan
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty State (if no plans) */}
        {mockFloorPlans.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Cube className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No floor plans available</h3>
            <p className="text-muted-foreground text-center max-w-md">
              We're working on adding more floor plans. Check back soon for new options.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
