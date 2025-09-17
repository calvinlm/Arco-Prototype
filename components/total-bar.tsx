"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { convertUSDToPHP, formatPHP } from "@/utils/currency"

export function TotalBar() {
  const { total, itemCount } = useCart()
  const totalPHP = convertUSDToPHP(total)

  if (itemCount === 0) {
    return null
  }

  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 md:left-64 bg-white border-t border-border p-4 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-sm text-muted-foreground">{itemCount} items</p>
            <p className="text-2xl font-bold text-foreground">{formatPHP(totalPHP)}</p>
          </div>
        </div>
        <Link href="/cart">
          <Button size="lg" className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>View Cart</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
