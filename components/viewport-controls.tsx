"use client"

import { Button } from "@/components/ui/button"
import { RotateCcw, RotateCw, ZoomIn, ZoomOut, Undo, Redo, Move3D } from "lucide-react"
import { cn } from "@/lib/utils"

interface ViewportControlsProps {
  className?: string
}

export function ViewportControls({ className }: ViewportControlsProps) {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      {/* Rotation Controls */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <RotateCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ZoomOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Undo/Redo Controls */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Redo className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Move Tool */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Move3D className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
