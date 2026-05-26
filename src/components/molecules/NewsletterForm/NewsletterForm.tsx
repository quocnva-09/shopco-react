import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton/IconButton";
import "./NewsletterForm.scss";

export const NewsletterForm = () => {
  return (
    <form className="newsletter-form js-newsletter-form">
      <div className="newsletter-form__input-wrapper">
        <IconButton
          svgName="icn-email-input"
          aria-label="Mail input"
          variant="ghost"
          className="newsletter-form__icon"
        />
        <Input
          type="email"
          className="newsletter-form__input"
          placeholder="Enter your email address"
          required
        />
      </div>
      <Button type="submit" variant="outline">
        Subscribe to Newsletter
      </Button>
    </form>
  );
};
