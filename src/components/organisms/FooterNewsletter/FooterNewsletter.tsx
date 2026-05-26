import { Heading } from "@/components/atoms/Heading/Heading";
import { NewsletterForm } from "@/components/molecules/NewsletterForm";
import "./FooterNewsletter.scss";

export const FooterNewsletter = () => {
  return (
    <div className="footer-newsletter">
      <div className="container">
        <div className="footer-newsletter__container">
          <div className="footer-newsletter__title-wrapper">
            <Heading as="h3" className="footer-newsletter__title" lineClamp={2}>
              STAY UPTO DATE ABOUT OUR LATEST OFFERS
            </Heading>
          </div>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
};
