import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { Divider } from "@/components/atoms/Divider";
import { Heading } from "@/components/atoms/Heading";
import { CartSection } from "@/components/organisms/CartSection";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import "./Cart.scss";
import {
  MOCK_CART_ITEMS,
  MOCK_CART_SUMMARY,
} from "@/consts/cartData";

export const CartPage = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <>
      <main className="container">
        <Divider direction="horizontal" />
        <Breadcrumb items={breadcrumbs} />
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
