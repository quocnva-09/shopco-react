import { useState, type ReactNode } from "react";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { NotificationBar } from "../organisms/NotificationBar";

export type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
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
      <main>{children}</main>
      <Footer />
    </>
  );
};
