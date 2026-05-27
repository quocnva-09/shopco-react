import { type ReactNode } from "react";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { NotificationBar } from "../organisms/NotificationBar";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <NotificationBar />
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </>
  );
};
