import { useEffect } from "react";
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  useFetcher,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router-dom";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { OtpInput } from "@/components/molecules/OtpInput";
import { CountdownButton } from "@/components/molecules/CountdownButton";
import { PATHS } from "@/routes/paths";
import { VERIFY_OTP_MESSAGES, VERIFY_OTP_API_MESSAGES } from "@/consts/messages";
import { OTP_COOLDOWN_SECONDS, OTP_LENGTH } from "@/consts/config";
import { CheckoutService } from "@/services/checkout.service";
import toast from "react-hot-toast";
import "./index.scss";

// --- RRv7 Loader ---
export const verifyOrderLoader = ({ params }: LoaderFunctionArgs) => {
  const { orderId } = params;
  if (!orderId || isNaN(Number(orderId))) {
    return redirect(PATHS.CHECKOUT);
  }
  
  if (!sessionStorage.getItem("fromCheckout")) {
    return redirect(PATHS.CHECKOUT);
  }
  
  return { orderId };
};

// --- RRv7 Action ---
type VerifyActionData = {
  error?: string;
  intent?: string;
  success?: boolean;
};

export const verifyOrderAction = async ({
  request,
  params,
}: ActionFunctionArgs): Promise<VerifyActionData | Response> => {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;
  const orderId = Number(params.orderId);

  if (intent === "resend") {
    try {
      await CheckoutService.resendOtp(orderId);
      return { success: true, intent: "resend" };
    } catch (error) {
      return { error: VERIFY_OTP_API_MESSAGES.RESEND_ERROR, intent: "resend" };
    }
  }

  // Intent = verify (default)
  const otp = formData.get("otp") as string;

  if (!otp || otp.length !== OTP_LENGTH) {
    return { error: VERIFY_OTP_MESSAGES.ERRORS.REQUIRED };
  }

  try {
    await CheckoutService.verifyOtp(orderId, { otp });
    
    // Clear session storage before redirecting
    sessionStorage.removeItem("fromCheckout");
    sessionStorage.setItem("completedOrderId", String(orderId));
    
    return redirect(PATHS.ORDER_SUCCESS);
  } catch (error) {
    return { error: VERIFY_OTP_API_MESSAGES.VERIFY_ERROR };
  }
};

// --- Component ---
export const VerifyOrderPage = () => {
  const actionData = useActionData() as VerifyActionData | undefined;
  const navigation = useNavigation();
  const fetcher = useFetcher<VerifyActionData>();
  
  const isSubmitting = navigation.state === "submitting" || fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.data?.intent === "resend") {
      if (fetcher.data.success) {
        toast.success(VERIFY_OTP_API_MESSAGES.RESEND_SUCCESS);
      } else if (fetcher.data.error) {
        toast.error(fetcher.data.error);
      }
    }
  }, [fetcher.data]);

  const handleResend = () => {
    fetcher.submit({ intent: "resend" }, { method: "post" });
  };

  return (
    <div className="verify-order container">
      <div className="verify-order__breadcrumb">
        <Breadcrumb
          items={[
            { label: "Home", href: PATHS.HOME },
            { label: "Checkout", href: PATHS.CHECKOUT },
            { label: "Verify Order" },
          ]}
        />
      </div>

      <div className="verify-order__content">
        <div className="verify-order__header">
          <Heading as="h1">{VERIFY_OTP_MESSAGES.TITLE}</Heading>
          <Text as="p" className="verify-order__subtitle">
            {VERIFY_OTP_MESSAGES.SUBTITLE}
          </Text>
        </div>

        <Form method="post" className="verify-order__form">
          <input type="hidden" name="intent" value="verify" />
          <div className="verify-order__input-group">
            <OtpInput disabled={isSubmitting} length={OTP_LENGTH} />
            {actionData?.error && actionData?.intent !== "resend" && (
              <Text as="span" className="verify-order__error">
                {actionData.error}
              </Text>
            )}
          </div>

          <div className="verify-order__actions">
            <Button type="submit" disabled={isSubmitting} fullWidth>
              {isSubmitting
                ? VERIFY_OTP_MESSAGES.BUTTONS.VERIFYING
                : VERIFY_OTP_MESSAGES.BUTTONS.VERIFY}
            </Button>

            <CountdownButton
              onResend={handleResend}
              disabled={isSubmitting}
              initialSeconds={OTP_COOLDOWN_SECONDS}
              fullWidth
            />
          </div>
        </Form>
      </div>
    </div>
  );
};
