import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { Heading } from "@/components/atoms/Heading";
import { CartSection } from "@/components/organisms/CartSection";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { useCartSummary } from "@/hooks/useCartSummary";
import "./index.scss";

export const CartPage = () => {
  const breadcrumbs = useBreadcrumbs();
  const { cartItems, lineItems, total } = useCartSummary();

  return (
    <main className="container">
      <Breadcrumb items={breadcrumbs} className="cart-page__breadcrumb" />
      <Heading className="cart-page__title" as="h1">
        YOUR CART
      </Heading>

      <CartSection items={cartItems} lineItems={lineItems} total={total} />
    </main>
  );
};
