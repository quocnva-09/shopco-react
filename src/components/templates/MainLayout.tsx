import { useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { NotificationBar } from "@/components/organisms/NotificationBar";
import { Spinner } from "@/components/atoms/Spinner";
import "./MainLayout.scss";

export const MainLayout = () => {
  const [isNotificationVisible, setIsNotificationVisible] =
    useState<boolean>(true);

  // navigation.state = "idle" | "loading" | "submitting"
  const { state } = useNavigation();
  const isRouteLoading = state === "loading";

  return (
    <>
      {isNotificationVisible && (
        <NotificationBar onClose={() => setIsNotificationVisible(false)} />
      )}

      <Header />
      {isRouteLoading ? (
        <div className="main-layout__spinner" aria-live="polite">
          <Spinner size="lg" label="Đang tải trang..." />
        </div>
      ) : (
        <Outlet />
      )}

      <Footer />
    </>
  );
};
