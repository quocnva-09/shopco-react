import { useNavigate } from "react-router-dom";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { PATHS } from "@/routes/paths";
import "./index.scss";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="container">
      <div className="not-found">
        <div className="not-found__code" aria-hidden="true">
          404
        </div>

        <div className="not-found__content">
          <Heading as="h1" lineClamp={2} className="not-found__title">
            Page Not Found
          </Heading>

          <Text as="p" className="not-found__description">
            The page you are looking for might have been removed, renamed, or is
            temporarily unavailable.
          </Text>

          <div className="not-found__actions">
            <Button
              variant="solid"
              colorScheme="dark"
              onClick={() => navigate(PATHS.HOME)}
            >
              Go to Homepage
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};
