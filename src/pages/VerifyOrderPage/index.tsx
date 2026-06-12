import {
  Form,
  redirect,
  useActionData,
  useNavigation,
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
import { VERIFY_OTP_MESSAGES } from "@/consts/messages";
import toast from "react-hot-toast";
import "./index.scss";

// --- RRv7 Loader ---
export const verifyOrderLoader = ({ params }: LoaderFunctionArgs) => {
  const { orderId } = params;
  if (!orderId || isNaN(Number(orderId))) {
    return redirect(PATHS.CHECKOUT);
  }
  return { orderId };
};

// --- RRv7 Action ---
type VerifyActionData = {
  error?: string;
};

export const verifyOrderAction = async ({
  request,
}: ActionFunctionArgs): Promise<VerifyActionData | Response> => {
  const formData = await request.formData();
  const otp = formData.get("otp") as string;

  if (!otp || otp.length !== 6) {
    return { error: VERIFY_OTP_MESSAGES.ERRORS.REQUIRED };
  }

  // --- MOCK API CALL ---
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (otp === "123456") {
    // Success: redirect to order success
    return redirect(PATHS.ORDER_SUCCESS);
  }

  // Error: return the error object
  return { error: VERIFY_OTP_MESSAGES.ERRORS.INVALID_OTP };
};

// --- Component ---
export const VerifyOrderPage = () => {
  const actionData = useActionData() as VerifyActionData | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const handleResend = async () => {
    // Mock resend
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(VERIFY_OTP_MESSAGES.SUCCESS.RESENT);
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
          <div className="verify-order__input-group">
            <OtpInput disabled={isSubmitting} />
            {actionData?.error && (
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
              initialSeconds={60}
              fullWidth
            />
          </div>
        </Form>
      </div>
    </div>
  );
};
