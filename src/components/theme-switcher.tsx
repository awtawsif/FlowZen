"use client"

import * as React from "react"
import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

export function ThemeSwitcher() {
  const { setTheme } = useTheme()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center">
            <Palette className="h-4 w-4 mr-2 group-data-[collapsible=icon]:mr-0" />
            <span className="group-data-[collapsible=icon]:hidden">Change Theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Light Themes</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Default</span>
          </DropdownMenuItem>
           <DropdownMenuItem onClick={() => setTheme("rose")}>
            <Palette className="mr-2 h-4 w-4" />
            <span>Rose</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("green")}>
            <Palette className="mr-2 h-4 w-4" />
            <span>Green</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("blue")}>
            <Palette className="mr-2 h-4 w-4" />
            <span>Blue</span>
          </DropdownMenuItem>
           <DropdownMenuItem onClick={() => setTheme("orange")}>
            <Palette className="mr-2 h-4 w-4" />
            <span>Orange</span>
          </DropdownMenuItem>
           <DropdownMenuItem onClick={() => setTheme("zinc")}>
            <Palette className="mr-2 h-4 w-4" />
            <span>Zinc</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Dark Themes</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Default</span>
          </DropdownMenuItem>
           <DropdownMenuItem onClick={() => setTheme("dark-rose")}>
            <Palette className="mr-2 h-4 w-4" />
            <span>Rose</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark-green")}>
            <Palette className="mr-2 h-4 w-4" />
            <span>Green</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark-blue")}>
            <Palette className="mr-2 h-4 w-4" />
            <span>Blue</span>
          </DropdownMenuItem>
           <DropdownMenuItem onClick={() => setTheme("dark-orange")}>
            <Palette className="mr-2 h-4 w-4" />
            <span>Orange</span>
          </DropdownMenuItem>
           <DropdownMenuItem onClick={() => setTheme("dark-zinc")}>
            <Palette className="mr-2 h-4 w-4" />
            <span>Zinc</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
