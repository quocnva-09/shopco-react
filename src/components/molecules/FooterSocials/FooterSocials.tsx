import { IconButton } from "@/components/atoms/IconButton";
import "./FooterSocials.scss";

export const FooterSocials = () => {
  return (
    <div className="footer-socials">
      <IconButton
        svgName="icn-twitter"
        aria-label="Twitter"
        variant="social"
        backgroundColor="white"
      />
      <IconButton
        svgName="icn-fb"
        aria-label="Facebook"
        variant="social"
        color="white"
        backgroundColor="black"
      />
      <IconButton
        svgName="icn-insta"
        aria-label="Instagram"
        variant="social"
        backgroundColor="white"
      />
      <IconButton
        svgName="icn-github"
        aria-label="GitHub"
        variant="social"
        backgroundColor="white"
      />
    </div>
  );
};
