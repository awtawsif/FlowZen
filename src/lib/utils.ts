
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const API_KEY_STORAGE_KEY = 'gemini_api_key';

export function getApiKey(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(API_KEY_STORAGE_KEY);
}

export function setApiKey(apiKey: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
}

// A helper function to check for Gemini API errors and provide a user-friendly message.
export function isGeminiError(error: unknown): error is Error {
  if (error instanceof Error) {
    if (error.message.includes('API key not valid')) {
      error.message =
        'Your API key is not valid. Please check it in the settings.';
      return true;
    }
  }
  return false;
}


// --- Custom Theme Utils ---
const CUSTOM_THEME_STORAGE_KEY = 'custom_theme_colors';

export type CustomTheme = {
  primary: string; // hex
  background: string; // hex
  accent: string; // hex
  foreground: string; // hex
}

export type HSLColor = {
  h: number;
  s: number;
  l: number;
};

export function getCustomTheme(): CustomTheme | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const themeJson = localStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
  return themeJson ? JSON.parse(themeJson) : null;
}

export function setCustomTheme(theme: CustomTheme): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(CUSTOM_THEME_STORAGE_KEY, JSON.stringify(theme));
}

export function hexToHsl(hex: string): HSLColor {
    // Prevent errors if hex is undefined or not a string
    if (typeof hex !== 'string') {
      hex = '#000000';
    }
    
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');

    // Parse the r, g, b values
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function applyCustomTheme(theme: {primary: HSLColor, background: HSLColor, accent: HSLColor, foreground: HSLColor}) {
  let style = document.getElementById('custom-theme-style');
  if (!style) {
    style = document.createElement('style');
    style.id = 'custom-theme-style';
    document.head.appendChild(style);
  }

  const foreground = `${theme.foreground.h} ${theme.foreground.s}% ${theme.foreground.l}%`;
  const cardForeground = foreground;
  const primaryForeground = theme.primary.l > 50 ? '240 10% 3.9%' : '0 0% 98%';
  const mutedForeground = theme.background.l > 50 ? '240 3.8% 46.1%' : '240 5% 64.9%';
  const accentForeground = theme.background.l > 50 ? '240 5.9% 10%' : '0 0% 98%';
  const border = theme.background.l > 50 ? '0 0% 89.8%' : '240 3.7% 15.9%';
  

  style.innerHTML = `
    [data-theme="custom"] {
      --background: ${theme.background.h} ${theme.background.s}% ${theme.background.l}%;
      --foreground: ${foreground};
      --card: ${theme.background.h} ${theme.background.s}% ${theme.background.l}%;
      --card-foreground: ${cardForeground};
      --popover: ${theme.background.h} ${theme.background.s}% ${theme.background.l}%;
      --popover-foreground: ${cardForeground};
      --primary: ${theme.primary.h} ${theme.primary.s}% ${theme.primary.l}%;
      --primary-foreground: ${primaryForeground};
      --secondary: ${theme.accent.h} ${theme.accent.s}% ${theme.accent.l}%;
      --secondary-foreground: ${accentForeground};
      --muted: ${theme.accent.h} ${theme.accent.s}% ${theme.accent.l}%;
      --muted-foreground: ${mutedForeground};
      --accent: ${theme.accent.h} ${theme.accent.s}% ${theme.accent.l}%;
      --accent-foreground: ${accentForeground};
      --destructive: 0 84.2% 60.2%;
      --destructive-foreground: 0 0% 98%;
      --border: ${border};
      --input: ${border};
      --ring: ${theme.primary.h} ${theme.primary.s}% ${theme.primary.l}%;
      
      --sidebar-background: ${theme.background.h} ${theme.background.s}% ${theme.background.l}%;
      --sidebar-foreground: ${foreground};
      --sidebar-primary: ${theme.primary.h} ${theme.primary.s}% ${theme.primary.l}%;
      --sidebar-primary-foreground: ${primaryForeground};
      --sidebar-accent: ${theme.accent.h} ${theme.accent.s}% ${theme.accent.l}%;
      --sidebar-accent-foreground: ${accentForeground};
      --sidebar-border: ${border};
      --sidebar-ring: ${theme.primary.h} ${theme.primary.s}% ${theme.primary.l}%;
    }
  `;
}
