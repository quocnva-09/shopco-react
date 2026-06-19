import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { FooterSocials } from "@/components/molecules/FooterSocials";
import { FooterNavColumn } from "@/components/molecules/FooterNavColumn";
import "./index.scss";

const COMPANY_LINKS = [
  { label: "About", href: "#" },
  { label: "Features", href: "#" },
  { label: "Works", href: "#" },
  { label: "Career", href: "#" },
];

const HELP_LINKS = [
  { label: "Customer Support", href: "#" },
  { label: "Delivery Details", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const FAQ_LINKS = [
  { label: "Account", href: "#" },
  { label: "Manage Deliveries", href: "#" },
  { label: "Orders", href: "#" },
  { label: "Payments", href: "#" },
];

const RESOURCES_LINKS = [
  { label: "Free eBooks", href: "#" },
  { label: "Development Tutorial", href: "#" },
  { label: "How to - Blog", href: "#" },
  { label: "Youtube Playlist", href: "#" },
];

export const FooterMain = () => {
  return (
    <div className="footer-main">
      <div className="footer-main__brand">
        <Heading as="div" className="footer-main__logo">SHOP.CO</Heading>
        <Text showTooltip={false} className="footer-main__desc">
          We have clothes that suits your style and which you're proud to wear. From women to men.
        </Text>
        <FooterSocials />
      </div>
      <div className="footer-main__links-group">
        <FooterNavColumn title="COMPANY" links={COMPANY_LINKS} />
        <FooterNavColumn title="HELP" links={HELP_LINKS} />
        <FooterNavColumn title="FAQ" links={FAQ_LINKS} />
        <FooterNavColumn title="RESOURCES" links={RESOURCES_LINKS} />
      </div>
    </div>
  );
};
