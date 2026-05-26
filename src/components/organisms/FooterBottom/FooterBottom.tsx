import { Text } from "@/components/atoms/Text/Text";
import { FooterPayments } from "@/components/molecules/FooterPayments";
import "./FooterBottom.scss";

export const FooterBottom = () => {
  return (
    <div className="footer-bottom">
      <Text showTooltip={false} className="footer-bottom__copyright">
        Shop.co © 2000-2026, All Rights Reserved
      </Text>
      <FooterPayments />
    </div>
  );
};
