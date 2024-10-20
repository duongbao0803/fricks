"use client";
import { usePathname } from "next/navigation";
import { FloatButton } from "antd";
import ProgressBar from "@/components/ProgressBar";
import { Footer, Navbar } from "@/components/layouts";
import useUserInfo from "@/hooks/useUserInfo";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showNavbar = pathname !== "/auth";
  const userInfo = useUserInfo();

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
      <FloatButton.BackTop className="!fixed !bottom-[200px] !right-[20px]" />
      <ProgressBar />
      {showNavbar && <Footer />}
    </>
  );
}
