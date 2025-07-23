
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { getCustomTheme, hexToHsl, applyCustomTheme } from "@/lib/utils"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    const customTheme = getCustomTheme();
    if (customTheme) {
       const themeForCss = {
        primary: hexToHsl(customTheme.primary),
        background: hexToHsl(customTheme.background),
        accent: hexToHsl(customTheme.accent),
        foreground: hexToHsl(customTheme.foreground),
      };
      applyCustomTheme(themeForCss);
    }
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
