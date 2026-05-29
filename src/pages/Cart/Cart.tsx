import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { Divider } from "@/components/atoms/Divider";
import { Heading } from "@/components/atoms/Heading";
import { CartSection } from "@/components/organisms/CartSection";
import "./Cart.scss";
import {
  MOCK_BREADCRUMB_CART,
  MOCK_CART_ITEMS,
  MOCK_CART_SUMMARY,
} from "@/consts/cartData";

export const CartPage = () => {
  return (
    <>
      <main className="container">
        <Divider direction="horizontal" />
        <Breadcrumb items={MOCK_BREADCRUMB_CART} />
        <Heading className="cart-page__title" as="h1">
          YOUR CART
        </Heading>

        <CartSection
          items={MOCK_CART_ITEMS}
          lineItems={MOCK_CART_SUMMARY.lineItems}
          total={MOCK_CART_SUMMARY.total}
        />
      </main>
    </>
  );
};
