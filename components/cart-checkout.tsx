"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Trash2, Plus, Minus, ShoppingBag, ExternalLink } from "lucide-react"
import { Navigation } from "./navigation"
import { useCart } from "@/contexts/cart-context"
import { convertUSDToPHP, formatPHP } from "@/utils/currency"

export function CartCheckout() {
  const { items: cartItems, updateQuantity, removeItem, total: cartTotal, itemCount } = useCart()
  const [selectedPlatform, setSelectedPlatform] = useState<"shopee" | "lazada">("shopee")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })

  const subtotalPHP = convertUSDToPHP(cartTotal)
  const taxPHP = subtotalPHP * 0.12 // 12% VAT in Philippines
  const totalPHP = subtotalPHP + taxPHP

  const handleCheckout = () => {
    // In a real app, this would process the order
    const platformName = selectedPlatform === "shopee" ? "Shopee" : "Lazada"
    alert(`Redirecting to ${platformName} for checkout with ${cartItems.length} items totaling ${formatPHP(totalPHP)}`)
  }

  const getAffiliateUrl = (item: any) => {
    return selectedPlatform === "shopee" ? item.affiliateUrlShopee : item.affiliateUrlLazada
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some furniture and décor to get started</p>
            <Button asChild>
              <a href="/builder">Start Decorating</a>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 p-4 max-w-6xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">Review your items and complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Cart Items ({cartItems.length})<Badge variant="secondary">{formatPHP(subtotalPHP)}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.thumbnailUrl || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {formatPHP(convertUSDToPHP(item.price))} each
                      </p>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="font-semibold text-foreground">
                        {formatPHP(convertUSDToPHP(item.price * item.quantity))}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Platform Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Shopping Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedPlatform}
                  onValueChange={(value: "shopee" | "lazada") => setSelectedPlatform(value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="shopee" id="shopee" />
                    <Label htmlFor="shopee" className="flex items-center gap-2">
                      <span>Shopee</span>
                      <Badge variant="secondary">Free Shipping</Badge>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lazada" id="lazada" />
                    <Label htmlFor="lazada" className="flex items-center gap-2">
                      <span>Lazada</span>
                      <Badge variant="secondary">Fast Delivery</Badge>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Summary */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPHP(subtotalPHP)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VAT (12%)</span>
                  <span className="font-medium">{formatPHP(taxPHP)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPHP(totalPHP)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter your delivery address"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Special Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any special delivery instructions"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full"
              size="lg"
              onClick={handleCheckout}
              disabled={!customerInfo.name || !customerInfo.email || !customerInfo.address}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Checkout on {selectedPlatform === "shopee" ? "Shopee" : "Lazada"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              You will be redirected to {selectedPlatform === "shopee" ? "Shopee" : "Lazada"} to complete your purchase
              securely.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
