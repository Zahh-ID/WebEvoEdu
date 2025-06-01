
import type { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

/**
 * Retrieves a Lucide icon component by its string name.
 * @param name The string name of the Lucide icon (e.g., "UsersIcon").
 * @returns The LucideIcon component or HelpCircleIcon as a fallback.
 */
export function getIconComponent(name?: string): LucideIcon {
  if (!name) {
    return LucideIcons.HelpCircleIcon; // Default for undefined or empty name
  }
  // Dynamically access the icon component from the imported LucideIcons module
  const IconComponent = (LucideIcons as Record<string, LucideIcon>)[name];
  return IconComponent || LucideIcons.HelpCircleIcon; // Fallback if name not found
}
