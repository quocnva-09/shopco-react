import { DEFAULT_CURRENCY } from "@/consts/config";

export function formatPrice(
  amount: number,
  currency = DEFAULT_CURRENCY,
): string {
  const maxFractionDigits = amount % 1 === 0 ? 0 : 2;
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: maxFractionDigits,
  }).format(amount);

  return formatted.replace(/\s/g, "");
}

export function formatDate(dateValue: string): string {
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Converts a URL slug to a human-readable title.
 * e.g. "shorts" → "Shorts", "t-shirts" → "T-Shirts"
 *
 * Returns `null` for empty / null input so callers can provide a fallback.
 */
export function formatSlugToTitle(slug: string | null | undefined): string | null {
  if (!slug) return null;
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-")
    .replace(/-/g, (_, offset, str) => {
      // Keep hyphens for compound words (T-Shirts), use space for multi-word slugs
      const prevChar = str[offset - 1];
      return prevChar && prevChar === prevChar.toUpperCase() ? "-" : " ";
    });
}
