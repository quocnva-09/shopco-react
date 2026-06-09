import { FooterNewsletter } from "../FooterNewsletter";
import { FooterMain } from "../FooterMain";
import { FooterBottom } from "../FooterBottom";
import "./index.scss";

export const Footer = () => {
  return (
    <footer className="footer">
      <FooterNewsletter />
      <div className="footer__content">
        <div className="container">
          <FooterMain />
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
};
