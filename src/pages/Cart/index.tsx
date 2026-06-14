import { useSelector } from "react-redux";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { Heading } from "@/components/atoms/Heading";
import { CartSection } from "@/components/organisms/CartSection";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { buildLineItems } from "@/utils/cart";
import type { RootState } from "@/store/store";
import "./index.scss";

export const CartPage = () => {
  const breadcrumbs = useBreadcrumbs();
  const { cartItems, deliveryFee, discount } = useSelector(
    (state: RootState) => state.cart,
  );

  // Business logic lives at the page level — CartSection receives pre-computed values
  const lineItems = buildLineItems(cartItems, deliveryFee, discount);
  const total = lineItems.reduce((sum, item) => sum + item.value, 0);

  return (
    <main className="container">
      <Breadcrumb items={breadcrumbs} className="cart-page__breadcrumb"/>
      <Heading className="cart-page__title" as="h1">
        YOUR CART
      </Heading>

      <CartSection
        items={cartItems}
        lineItems={lineItems}
        total={total}
      />
    </main>
  );
};
