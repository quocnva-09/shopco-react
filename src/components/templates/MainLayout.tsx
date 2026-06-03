import { useState } from "react";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { NotificationBar } from "@/components/organisms/NotificationBar";
import { Outlet } from "react-router-dom";
import { Divider } from "../atoms/Divider";

export const MainLayout = () => {
  const [isNotificationVisible, setIsNotificationVisible] =
    useState<boolean>(true);

  const handleCloseNotification = () => {
    setIsNotificationVisible(false);
  };

  return (
    <>
      {isNotificationVisible && (
        <NotificationBar onClose={handleCloseNotification} />
      )}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
