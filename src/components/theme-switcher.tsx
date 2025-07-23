
"use client"

import * as React from "react"
import { Moon, Sun, Palette, Pencil } from "lucide-react"
import { useTheme } from "next-themes"
import { getCustomTheme } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ThemeCreatorDialog } from "./theme-creator-dialog"

export function ThemeSwitcher() {
  const { setTheme } = useTheme()
  const [hasCustomTheme, setHasCustomTheme] = React.useState(false);
  const [isThemeCreatorOpen, setIsThemeCreatorOpen] = React.useState(false);

  React.useEffect(() => {
    // This effect will run on the client side after component mounts
    const checkTheme = () => setHasCustomTheme(!!getCustomTheme());
    checkTheme();

    // Check again when the dialog closes
    if (!isThemeCreatorOpen) {
      checkTheme();
    }
  }, [isThemeCreatorOpen])


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
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setTheme("rose")}>
            <Palette className="mr-2 h-4 w-4" />
            <span>Rose</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("green")}>
            <Palette className="mr-2 h-4 w-4" />
            <span>Green</span>
          </DropdownMenuItem>
          
          {hasCustomTheme && (
              <DropdownMenuItem onClick={() => setTheme("custom")}>
                <Palette className="mr-2 h-4 w-4" />
                <span>My Theme</span>
              </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

           <DropdownMenuItem onClick={() => setIsThemeCreatorOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            <span>{hasCustomTheme ? 'Edit My Theme' : 'Create Custom Theme'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ThemeCreatorDialog 
        isOpen={isThemeCreatorOpen}
        onOpenChange={setIsThemeCreatorOpen}
      />
    </>
  )
}
