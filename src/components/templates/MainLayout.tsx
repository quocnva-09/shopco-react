import { useState, useEffect } from "react";
import { Outlet, useNavigation, useLocation } from "react-router-dom";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { NotificationBar } from "@/components/organisms/NotificationBar";
import { Spinner } from "@/components/atoms/Spinner";
import { PATHS } from "@/routes";
import "./MainLayout.scss";

export const MainLayout = () => {
  const [isNotificationVisible, setIsNotificationVisible] =
    useState<boolean>(true);

  const { state } = useNavigation();
  const isRouteLoading = state === "loading";

  const { pathname } = useLocation();
  const isHomePage = pathname === PATHS.HOME;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {isNotificationVisible && (
        <NotificationBar onClose={() => setIsNotificationVisible(false)} />
      )}

      <Header noBorder={isHomePage} />
      {isRouteLoading ? (
        <div className="main-layout__spinner" aria-live="polite">
          <Spinner size="lg" label="Loading page..." />
        </div>
      ) : (
        <Outlet />
      )}

      <Footer />
    </>
  );
};
