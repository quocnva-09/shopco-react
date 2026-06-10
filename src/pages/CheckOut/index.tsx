import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { PATHS } from "@/routes";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { Heading } from "@/components/atoms/Heading";
import { CartItem } from "@/components/molecules/CartItem";
import { CartSummary } from "@/components/organisms/CartSummary";
import { CheckoutShippingForm } from "@/components/organisms/CheckoutShippingForm";
import { CheckoutPaymentMethod } from "@/components/organisms/CheckoutPaymentMethod";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import type { RootState } from "@/store/store";
import { buildLineItems } from "@/utils/cart";
import { CHECKOUT_MESSAGES } from "@/consts/messages";
import "./index.scss";

interface CheckoutFormData {
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  paymentMethod: string;
}

export const CheckOutPage = () => {
  const location = useLocation();
  const breadcrumbs = useBreadcrumbs();
  const { cartItems, deliveryFee, discount } = useSelector(
    (state: RootState) => state.cart,
  );

  if (!location.state?.fromCart) {
    return <Navigate to={PATHS.CART} replace />;
  }

  const methods = useForm<CheckoutFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      phoneNumber: "",
      paymentMethod: "cod",
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    console.log("Order Data:", data, "Cart Items:", cartItems);
    // TODO: Dispatch action to place order or call API
    alert("Order placed successfully!");
  };

  const lineItems = buildLineItems(cartItems, deliveryFee, discount);
  const total = lineItems.reduce((sum, item) => sum + item.value, 0);

  return (
    <main className="container">
      <Breadcrumb items={breadcrumbs} />
      <Heading className="checkout-page__title" as="h1">
        {CHECKOUT_MESSAGES.TITLE}
      </Heading>

      <div className="checkout-page__layout">
        <div className="checkout-page__left">
          <section className="checkout-cart">
            <div className="checkout-cart__items">
              {cartItems.map((item) => (
                <CartItem key={item.productVariantId} item={item} isCheckout />
              ))}
            </div>
          </section>
        </div>

        <div className="checkout-page__right">
          <FormProvider {...methods}>
            <form
              id="checkout-form"
              onSubmit={methods.handleSubmit(onSubmit)}
              className="checkout-page__form"
            >
              <CheckoutShippingForm />
              <CheckoutPaymentMethod />
            </form>
          </FormProvider>

          <CartSummary lineItems={lineItems} total={total} isCheckout />
        </div>
      </div>
    </main>
  );
};
