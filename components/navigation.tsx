"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Cable as Cube, ShoppingCart, User, Settings, Menu, X } from "lucide-react"

interface NavigationProps {
  cartItemCount?: number
}

export function Navigation({ cartItemCount = 0 }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/builder", label: "Builder", icon: Cube },
    { href: "/cart", label: "Cart", icon: ShoppingCart, badge: cartItemCount },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white border-r border-border flex-col p-6 z-40">
        <div className="mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Cube className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Arco</span>
          </Link>
        </div>

        <div className="space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" className="w-full justify-start h-12 text-left">
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                  {item.badge !== undefined && (
                    <Badge
                      className={`ml-auto min-w-[20px] h-5 flex items-center justify-center px-1.5 ${
                        item.badge === 0 ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-border flex items-center justify-between px-4 z-50">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Cube className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Arco</span>
        </Link>

        <div className="flex items-center space-x-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <Badge
                className={`absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center p-0 text-xs rounded-full ${
                  cartItemCount === 0
                    ? "bg-muted text-muted-foreground border border-border"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {cartItemCount}
              </Badge>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed right-0 top-16 bottom-0 w-64 bg-white border-l border-border p-6">
            <div className="space-y-2">
              {navItems.slice(0, -1).map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start h-12 text-left">
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                      {item.badge !== undefined && (
                        <Badge
                          className={`ml-auto min-w-[20px] h-5 flex items-center justify-center px-1.5 ${
                            item.badge === 0 ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-border flex items-center justify-around z-40">
        {navItems.slice(0, 3).map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              <Icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground mt-1">{item.label}</span>
              {item.badge !== undefined && (
                <Badge
                  className={`absolute top-2 right-1/4 min-w-[16px] h-4 flex items-center justify-center p-0 text-xs rounded-full ${
                    item.badge === 0
                      ? "bg-muted text-muted-foreground border border-border"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
