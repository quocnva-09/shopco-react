import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PATHS } from "@/routes";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { Heading } from "@/components/atoms/Heading";
import { CartItem } from "@/components/molecules/CartItem";
import { CartSummary } from "@/components/organisms/CartSummary";
import { CheckoutShippingForm } from "@/components/organisms/CheckoutShippingForm";
import { CheckoutPaymentMethod } from "@/components/organisms/CheckoutPaymentMethod";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import type { RootState, AppDispatch } from "@/store/store";
import { buildLineItems } from "@/utils/cart";
import { clearCart } from "@/slices/cartSlice";
import { CheckoutService } from "@/services/checkout.service";
import type { CheckoutRequest } from "@/types/api/checkout.api";
import { CHECKOUT_MESSAGES, CHECKOUT_API_MESSAGES } from "@/consts/messages";
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
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const breadcrumbs = useBreadcrumbs();

  const { cartItems, deliveryFee, discount } = useSelector(
    (state: RootState) => state.cart,
  );

  const [isLoading, setIsLoading] = useState(false);

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
    mode: "onChange",
  });

  const onSubmit = async (data: CheckoutFormData) => {
    const payload: CheckoutRequest = {
      items: cartItems.map((item) => ({
        product_id: item.productId,
        product_variant_id: item.productVariantId,
        color_id: item.variant.colorId,
        size_id: item.variant.sizeId,
        quantity: item.quantity,
      })),
      delivery_fee: deliveryFee,
      discount,
      guest_name: data.fullName,
      guest_phone: data.phoneNumber,
      guest_email: data.email,
      guest_address: data.address,
    };

    try {
      setIsLoading(true);
      const response = await CheckoutService.placeOrder(payload);
      dispatch(clearCart());
      navigate(PATHS.ORDER_SUCCESS, {
        state: { orderId: response.data.id },
        replace: true,
      });
    } catch {
      toast.error(CHECKOUT_API_MESSAGES.ORDER_ERROR);
      navigate(PATHS.CART);
    } finally {
      setIsLoading(false);
    }
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
