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
