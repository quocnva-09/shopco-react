import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";

export type NewsletterFormProps = {
  /** Called with the trimmed email value when the form is submitted. */
  onSubmit?: (email: string) => void;
  /** When true, the submit button shows a loading state and is disabled. */
  isLoading?: boolean;
  placeholder?: string;
};

export const NewsletterForm = ({
  onSubmit,
  isLoading = false,
  placeholder = "Enter your email address",
}: NewsletterFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    if (email) onSubmit?.(email);
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <div className="newsletter-form__input-wrapper">
        <IconButton
          svgName="icn-email-input"
          aria-label="Mail input"
          variant="default"
          className="newsletter-form__icon"
        />
        <Input
          type="email"
          name="email"
          className="newsletter-form__input"
          placeholder={placeholder}
          required
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        className="newsletter-form__submit"
        disabled={isLoading}
      >
        {isLoading ? "Subscribing…" : "Subscribe to Newsletter"}
      </Button>
    </form>
  );
};
