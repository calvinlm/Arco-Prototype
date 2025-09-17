"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "./navigation"
import { Edit, Save, X, Heart, Home, ShoppingBag, Calendar } from "lucide-react"
import { convertUSDToPHP, formatPHP } from "@/utils/currency"

interface SavedDesign {
  id: string
  name: string
  floorPlan: string
  itemCount: number
  totalValue: number
  createdAt: string
  thumbnailUrl: string
}

interface OrderHistory {
  id: string
  date: string
  items: number
  total: number
  status: "completed" | "processing" | "shipped"
  platform: "shopee" | "lazada"
}

const mockSavedDesigns: SavedDesign[] = [
  {
    id: "d1",
    name: "Modern Living Room",
    floorPlan: "Studio Apartment",
    itemCount: 8,
    totalValue: 2450,
    createdAt: "2024-01-15",
    thumbnailUrl: "/modern-studio-apartment-floor-plan.jpg",
  },
  {
    id: "d2",
    name: "Cozy Bedroom Setup",
    floorPlan: "One Bedroom",
    itemCount: 12,
    totalValue: 1890,
    createdAt: "2024-01-10",
    thumbnailUrl: "/one-bedroom-apartment-floor-plan.jpg",
  },
  {
    id: "d3",
    name: "Family Dining Area",
    floorPlan: "Two Bedroom",
    itemCount: 15,
    totalValue: 3200,
    createdAt: "2024-01-05",
    thumbnailUrl: "/two-bedroom-apartment-floor-plan.jpg",
  },
]

const mockOrderHistory: OrderHistory[] = [
  {
    id: "o1",
    date: "2024-01-20",
    items: 5,
    total: 1250,
    status: "completed",
    platform: "shopee",
  },
  {
    id: "o2",
    date: "2024-01-18",
    items: 3,
    total: 680,
    status: "shipped",
    platform: "lazada",
  },
  {
    id: "o3",
    date: "2024-01-15",
    items: 8,
    total: 2100,
    status: "processing",
    platform: "shopee",
  },
]

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "Juan Dela Cruz",
    email: "juan.delacruz@email.com",
    mobile: "+63 912 345 6789",
    address: "123 Street, Creative City, PH 1000",
    bio: "Interior design enthusiast who loves creating beautiful, functional spaces. Always looking for the perfect balance between modern aesthetics and comfort.",
  })

  const [editedInfo, setEditedInfo] = useState(userInfo)

  const handleSave = () => {
    setUserInfo(editedInfo)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedInfo(userInfo)
    setIsEditing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 md:ml-64 md:pt-0 pt-16 pb-16 md:pb-0 p-4 max-w-6xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your account and view your design history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/juan-delacruz.jpg" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{userInfo.name}</CardTitle>
                <p className="text-muted-foreground">{userInfo.email}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEditing ? (
                  <>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Mobile</Label>
                      <p className="text-foreground">{userInfo.mobile}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                      <p className="text-foreground">{userInfo.address}</p>
                    </div>
                    <div>
                    </div>
                      <Label className="text-sm font-medium text-muted-foreground">Bio</Label>
                      <p className="text-foreground text-sm">{userInfo.bio}</p>
                    <Button onClick={() => setIsEditing(true)} className="w-full">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={editedInfo.name}
                        onChange={(e) => setEditedInfo((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedInfo.email}
                        onChange={(e) => setEditedInfo((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile</Label>
                      <Input
                        id="mobile"
                        value={editedInfo.mobile}
                        onChange={(e) => setEditedInfo((prev) => ({ ...prev, mobile: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={editedInfo.address}
                        onChange={(e) => setEditedInfo((prev) => ({ ...prev, address: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={editedInfo.bio}
                        onChange={(e) => setEditedInfo((prev) => ({ ...prev, bio: e.target.value }))}
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSave} className="flex-1">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancel} variant="outline" className="flex-1 bg-transparent">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Activity Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="designs" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="designs">Saved Designs</TabsTrigger>
                <TabsTrigger value="orders">Order History</TabsTrigger>
              </TabsList>

              <TabsContent value="designs" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      Saved Designs ({mockSavedDesigns.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockSavedDesigns.map((design) => (
                      <div key={design.id} className="flex gap-4 p-4 border border-border rounded-lg">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={design.thumbnailUrl || "/placeholder.svg"}
                            alt={design.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground mb-1">{design.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{design.floorPlan}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Home className="w-3 h-3" />
                              {design.itemCount} items
                            </span>
                            <span>{formatPHP(convertUSDToPHP(design.totalValue))}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(design.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      Order History ({mockOrderHistory.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockOrderHistory.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-foreground">Order #{order.id.toUpperCase()}</h3>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                            <Badge variant="outline">
                              {order.platform.charAt(0).toUpperCase() + order.platform.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{new Date(order.date).toLocaleDateString()}</span>
                            <span>{order.items} items</span>
                            <span className="font-medium text-foreground">
                              {formatPHP(convertUSDToPHP(order.total))}
                            </span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
