import { useNavigate, Navigate } from "react-router-dom";
import { Image } from "@/components/atoms/Image";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { PATHS } from "@/routes";
import { ORDER_SUCCESS_MESSAGES } from "@/consts/messages";
import "./index.scss";

export const OrderSuccessPage = () => {
  const navigate = useNavigate();

  const completedOrderId = sessionStorage.getItem("completedOrderId");

  // Guard: must arrive via successful verification
  if (!completedOrderId) {
    return <Navigate to={PATHS.HOME} replace />;
  }

  const orderId = Number(completedOrderId);

  return (
    <main className="order-success">
      <Image
        src="images/pic-order-successful.svg"
        alt={ORDER_SUCCESS_MESSAGES.IMAGE_ALT}
        renderWrapper={false}
        className="order-success__image"
        width={280}
        height={280}
      />

      <Heading as="h1" className="order-success__title" showTooltip={false}>
        {ORDER_SUCCESS_MESSAGES.TITLE}
      </Heading>

      <Text as="p" className="order-success__description">
        {ORDER_SUCCESS_MESSAGES.DESCRIPTION(orderId)}
      </Text>

      <Button
        className="order-success__cta"
        onClick={() => navigate(PATHS.HOME)}
      >
        {ORDER_SUCCESS_MESSAGES.CTA}
      </Button>
    </main>
  );
};
