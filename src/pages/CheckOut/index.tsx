import { useSelector } from "react-redux";
import {
  useLocation,
  Navigate,
  useNavigation,
  redirect,
  type ActionFunctionArgs,
} from "react-router-dom";
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
import {
  useCheckoutSubmit,
  type CheckoutFormData,
} from "../../hooks/useCheckoutSubmit";
import { CheckoutService } from "@/services/checkout.service";
import type { CheckoutRequest } from "@/types/api/checkout.api";
import { CHECKOUT_MESSAGES, CHECKOUT_API_MESSAGES } from "@/consts/messages";
import { clearCart } from "@/slices/cartSlice";
import "./index.scss";
import store from "@/store/store";

export const checkoutAction = async ({ request }: ActionFunctionArgs) => {
  const data = await request.json();
  const payload: CheckoutRequest = JSON.parse(data.payload);

  try {
    const response = await CheckoutService.placeOrder(payload);

    // Clear the cart directly via store since action runs outside React
    store.dispatch(clearCart());

    // Set flag in sessionStorage to authorize the Verify OTP page load
    sessionStorage.setItem("fromCheckout", "true");

    return redirect(`${PATHS.VERIFY_ORDER}/${response.data.id}`);
  } catch (error) {
    // Returning an error response which can be caught by an ErrorBoundary or useActionData
    throw new Response(CHECKOUT_API_MESSAGES.ORDER_ERROR, { status: 400 });
  }
};

export const CheckOutPage = () => {
  const location = useLocation();
  const breadcrumbs = useBreadcrumbs();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  const { cartItems, deliveryFee, discount } = useSelector(
    (state: RootState) => state.cart,
  );

  const { onSubmit } = useCheckoutSubmit();

  const methods = useForm<CheckoutFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      phoneNumber: "",
      paymentMethod: "cod",
    },
    mode: "onChange",
  });

  const lineItems = buildLineItems(cartItems, deliveryFee, discount);
  const total = lineItems.reduce((sum, item) => sum + item.value, 0);

  if (!location.state?.fromCart) {
    return <Navigate to={PATHS.CART} replace />;
  }

  return (
    <main className="container">
      <Breadcrumb items={breadcrumbs} />
      <Heading className="checkout-page__title" as="h1">
        {CHECKOUT_MESSAGES.TITLE}
      </Heading>

      <div className="checkout-page__layout">
        <div className="checkout-page__left">
          <section className="checkout-cart">
            <ul className="checkout-cart__items" aria-label="Items in your order">
              {cartItems.map((item) => (
                <li key={item.productVariantId}>
                  <CartItem item={item} isReadOnly />
                </li>
              ))}
            </ul>
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

          <CartSummary
            lineItems={lineItems}
            total={total}
            isCheckout
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
};
