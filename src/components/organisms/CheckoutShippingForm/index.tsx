import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { type ComponentPropsWithoutRef } from "react";
import { Heading } from "@/components/atoms/Heading";
import { Input } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Text";
import { CHECKOUT_MESSAGES } from "@/consts/messages";
import { checkoutValidationRules } from "@/utils/checkOutValidation";
import type { CheckoutFormData } from "@/hooks/useCheckoutSubmit";
import "./index.scss";

export type CheckoutShippingFormProps = ComponentPropsWithoutRef<"section">;

export const CheckoutShippingForm = ({
  className,
  ...rest
}: CheckoutShippingFormProps) => {
  const methods = useFormContext<CheckoutFormData>();

  if (!methods) {
    throw new Error(
      "<CheckoutShippingForm> must be rendered inside a <FormProvider>. " +
      "Wrap it with <FormProvider {...methods}> in the parent page."
    );
  }

  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <section className={clsx("checkout-form", className)} {...rest}>
      <Heading as="h2" className="checkout-form__title" showTooltip={false}>
        {CHECKOUT_MESSAGES.SHIPPING_DETAILS}
      </Heading>

      <div className="checkout-form__fields">
        {/* Full Name */}
        <div className="checkout-form__field">
          <label htmlFor="fullName" className="checkout-form__label">
            {CHECKOUT_MESSAGES.LABELS.FULL_NAME}
          </label>
          <Input
            id="fullName"
            placeholder={CHECKOUT_MESSAGES.PLACEHOLDERS.FULL_NAME}
            className={clsx(
              "checkout-form__input",
              errors.fullName && "checkout-form__input--error",
            )}
            {...register("fullName", checkoutValidationRules.fullName)}
          />
          {errors.fullName && (
            <Text as="span" className="checkout-form__error">
              {errors.fullName.message as string}
            </Text>
          )}
        </div>

        {/* Email */}
        <div className="checkout-form__field">
          <label htmlFor="email" className="checkout-form__label">
            {CHECKOUT_MESSAGES.LABELS.EMAIL}
          </label>
          <Input
            id="email"
            type="email"
            placeholder={CHECKOUT_MESSAGES.PLACEHOLDERS.EMAIL}
            className={clsx(
              "checkout-form__input",
              errors.email && "checkout-form__input--error",
            )}
            {...register("email", checkoutValidationRules.email)}
          />
          {errors.email && (
            <Text as="span" className="checkout-form__error">
              {errors.email.message as string}
            </Text>
          )}
        </div>

        {/* Address */}
        <div className="checkout-form__field">
          <label htmlFor="address" className="checkout-form__label">
            {CHECKOUT_MESSAGES.LABELS.ADDRESS}
          </label>
          <textarea
            id="address"
            placeholder={CHECKOUT_MESSAGES.PLACEHOLDERS.ADDRESS}
            className={clsx(
              "form-input",
              "checkout-form__input",
              "checkout-form__textarea",
              errors.address && "checkout-form__input--error",
            )}
            rows={3}
            {...register("address", checkoutValidationRules.address)}
          />
          {errors.address && (
            <Text as="span" className="checkout-form__error">
              {errors.address.message as string}
            </Text>
          )}
        </div>

        {/* Phone Number */}
        <div className="checkout-form__field">
          <label htmlFor="phoneNumber" className="checkout-form__label">
            {CHECKOUT_MESSAGES.LABELS.PHONE_NUMBER}
          </label>
          <Input
            id="phoneNumber"
            placeholder={CHECKOUT_MESSAGES.PLACEHOLDERS.PHONE_NUMBER}
            className={clsx(
              "checkout-form__input",
              errors.phoneNumber && "checkout-form__input--error",
            )}
            {...register("phoneNumber", checkoutValidationRules.phoneNumber)}
          />
          {errors.phoneNumber && (
            <Text as="span" className="checkout-form__error">
              {errors.phoneNumber.message as string}
            </Text>
          )}
        </div>
      </div>
    </section>
  );
};
