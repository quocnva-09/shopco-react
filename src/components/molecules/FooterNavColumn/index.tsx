import { Heading } from "@/components/atoms/Heading";
import { TextLink } from "@/components/atoms/TextLink";
import "./index.scss";

export interface FooterLinkItem {
  label: string;
  href: string;
}

export type FooterNavColumnProps = {
  title: string;
  links: FooterLinkItem[];
};

export const FooterNavColumn = ({ title, links }: FooterNavColumnProps) => {
  const headingId = `footer-col-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <nav className="footer-col" aria-labelledby={headingId}>
      <Heading as="h3" id={headingId} className="footer-col__title">
        {title}
      </Heading>
      <ul className="footer-col__list">
        {links.map((link, index) => (
          <li key={index} className="footer-col__item">
            <TextLink href={link.href} className="footer-col__link">
              {link.label}
            </TextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
