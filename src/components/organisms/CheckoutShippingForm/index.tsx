import { useFormContext, useFormState, type FieldError } from "react-hook-form";
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
        "Wrap it with <FormProvider {...methods}> in the parent page.",
    );
  }

  const { register } = methods;
  const { errors } = useFormState<CheckoutFormData>();

  // Helper to render a standard labeled input field row — mirrors WriteReviewModal's renderInputField.
  // `error` is passed explicitly at the call site (e.g. errors.fullName) so the useFormState
  // Proxy registers a named subscription for that field in the component body.
  const renderField = (
    id: string,
    label: string,
    registerResult: ReturnType<typeof register>,
    error: FieldError | undefined,
    options: { type?: string; placeholder?: string } = {},
  ) => (
    <div className="checkout-form__field">
      <label htmlFor={id} className="checkout-form__label">
        {label}
      </label>
      <Input
        id={id}
        type={options.type}
        placeholder={options.placeholder}
        className={clsx(
          "checkout-form__input",
          error && "checkout-form__input--error",
        )}
        {...registerResult}
      />
      {error && (
        <Text as="span" className="checkout-form__error">
          {error.message}
        </Text>
      )}
    </div>
  );

  return (
    <section className={clsx("checkout-form", className)} {...rest}>
      <Heading as="h2" className="checkout-form__title" showTooltip={false}>
        {CHECKOUT_MESSAGES.SHIPPING_DETAILS}
      </Heading>

      <div className="checkout-form__fields">
        {renderField(
          "fullName",
          CHECKOUT_MESSAGES.LABELS.FULL_NAME,
          register("fullName", checkoutValidationRules.fullName),
          errors.fullName,
          { placeholder: CHECKOUT_MESSAGES.PLACEHOLDERS.FULL_NAME },
        )}

        {renderField(
          "email",
          CHECKOUT_MESSAGES.LABELS.EMAIL,
          register("email", checkoutValidationRules.email),
          errors.email,
          {
            type: "email",
            placeholder: CHECKOUT_MESSAGES.PLACEHOLDERS.EMAIL,
          },
        )}

        {/* Address — textarea, rendered inline (mirrors WriteReviewModal's comment field) */}
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
              {errors.address?.message}
            </Text>
          )}
        </div>

        {renderField(
          "phoneNumber",
          CHECKOUT_MESSAGES.LABELS.PHONE_NUMBER,
          register("phoneNumber", checkoutValidationRules.phoneNumber),
          errors.phoneNumber,
          {
            type: "tel",
            placeholder: CHECKOUT_MESSAGES.PLACEHOLDERS.PHONE_NUMBER,
          },
        )}
      </div>
    </section>
  );
};
