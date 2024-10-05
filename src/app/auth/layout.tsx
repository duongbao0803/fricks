"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components";
import Footer from "@/components/Footer";
import { FloatButton } from "antd";
import ProgressBar from "@/components/ProgressBar";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showNavbar = pathname !== "/auth";

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
