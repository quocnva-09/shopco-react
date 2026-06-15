/**
 * Barrel re-export for all message constants.
 *
 * Import from the specific feature file when adding new consumers:
 *   import { CART_LIMIT_MESSAGES } from "@/consts/messages/cart.messages";
 *
 * The wildcard re-exports below maintain backward compatibility so that
 * existing imports from "@/consts/messages" continue to work unchanged.
 */
export * from "./cart.messages";
export * from "./checkout.messages";
export * from "./review.messages";
export * from "./otp.messages";
export * from "./ui.messages";
