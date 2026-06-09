import { Icon } from "@/components/atoms/Icon";
import "./index.scss";

export const FooterPayments = () => {
  return (
    <ul className="footer-payments">
      <li className="payment-item">
        <Icon svgName="icn-visa" preserveColors />
      </li>
      <li className="payment-item">
        <Icon svgName="icn-mastercard" preserveColors />
      </li>
      <li className="payment-item">
        <Icon svgName="icn-paypal" preserveColors />
      </li>
      <li className="payment-item">
        <Icon svgName="icn-a-pay" preserveColors />
      </li>
      <li className="payment-item">
        <Icon svgName="icn-g-pay" preserveColors />
      </li>
    </ul>
  );
};
