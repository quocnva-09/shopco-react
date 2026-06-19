import { Heading } from "@/components/atoms/Heading";
import { NewsletterForm } from "@/components/molecules/NewsletterForm";
import "./index.scss";

export const FooterNewsletter = () => {
  /**
   * Stub handler — wire this to an actual newsletter API endpoint when available.
   * The NewsletterForm molecule is now properly controlled; the organism decides what happens on submit.
   */
  const handleNewsletterSubmit = (email: string) => {
    // TODO: call newsletter subscription service
    console.info("Newsletter subscription requested for:", email);
  };

  return (
    <div className="footer-newsletter">
      <div className="container">
        <div className="footer-newsletter__container">
          <div className="footer-newsletter__title-wrapper">
            <Heading as="h2" className="footer-newsletter__title" lineClamp={0}>
              STAY UPTO DATE ABOUT OUR LATEST OFFERS
            </Heading>
          </div>
          <NewsletterForm onSubmit={handleNewsletterSubmit} />
        </div>
      </div>
    </div>
  );
};
