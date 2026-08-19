import { recordPageView, recordWhatsAppClick } from "./adminStore";

/**
 * Tracks a pageview event automatically when a route mounts or path changes.
 */
export function trackPageView(path?: string, title?: string): void {
  try {
    const currentPath = path || (typeof window !== "undefined" ? window.location.pathname : "/");
    const currentTitle = title || (typeof document !== "undefined" ? document.title : "Khokharz Cafe");
    recordPageView(currentPath, currentTitle);
  } catch (error) {
    console.error("Failed to track page view:", error);
  }
}

/**
 * Tracks when a visitor clicks any WhatsApp contact or chat button.
 */
export function trackWhatsAppClick(source: string): void {
  try {
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";
    recordWhatsAppClick(source, currentPath);
  } catch (error) {
    console.error("Failed to track WhatsApp click:", error);
  }
}
