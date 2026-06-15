import { useState, useEffect } from "react";
import { Outlet, useNavigation, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { NotificationBar } from "@/components/organisms/NotificationBar";
import { Spinner } from "@/components/atoms/Spinner";
import { selectCartItemCount } from "@/store/selectors";
import { PATHS } from "@/routes";
import "./MainLayout.scss";

export const MainLayout = () => {
  const [isNotificationVisible, setIsNotificationVisible] =
    useState<boolean>(true);

  const { state } = useNavigation();
  const isRouteLoading = state === "loading";

  const { pathname } = useLocation();
  const isHomePage = pathname === PATHS.HOME;

  const cartItemCount = useSelector(selectCartItemCount);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {isNotificationVisible && (
        <NotificationBar onClose={() => setIsNotificationVisible(false)} />
      )}

      <Header noBorder={isHomePage} cartItemCount={cartItemCount} />
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
