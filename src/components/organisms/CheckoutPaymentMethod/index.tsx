import clsx from "clsx";
import { type ComponentPropsWithoutRef } from "react";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { CHECKOUT_MESSAGES } from "@/consts/messages";
import "./index.scss";

export type CheckoutPaymentMethodProps = ComponentPropsWithoutRef<"section">;

export const CheckoutPaymentMethod = ({
  className,
  ...rest
}: CheckoutPaymentMethodProps) => {
  return (
    <section className={clsx("checkout-payment", className)} {...rest}>
      <Heading as="h2" className="checkout-payment__title" showTooltip={false}>
        {CHECKOUT_MESSAGES.PAYMENT_METHOD}
      </Heading>

      <div className="checkout-payment__list">
        <label className="checkout-payment__option checkout-payment__option--selected">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            className="checkout-payment__radio"
            defaultChecked
          />
          <span className="checkout-payment__custom-radio"></span>
          <Text as="span" className="checkout-payment__label">
            {CHECKOUT_MESSAGES.CASH_ON_DELIVERY}
          </Text>
        </label>
      </div>
    </section>
  );
};
