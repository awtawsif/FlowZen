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
