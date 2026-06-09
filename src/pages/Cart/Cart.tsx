import { useSelector } from "react-redux";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { Heading } from "@/components/atoms/Heading";
import { CartSection } from "@/components/organisms/CartSection";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import type { RootState } from "@/store/store";
import "./Cart.scss";

export const CartPage = () => {
  const breadcrumbs = useBreadcrumbs();
  const { cartItems, deliveryFee, discount } = useSelector(
    (state: RootState) => state.cart,
  );

  return (
    <main className="container">
      <Breadcrumb items={breadcrumbs} />
      <Heading className="cart-page__title" as="h1">
        YOUR CART
      </Heading>

      <CartSection
        items={cartItems}
        deliveryFee={deliveryFee}
        discount={discount}
      />
    </main>
  );
};
