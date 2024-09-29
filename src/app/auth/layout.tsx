"use client";
import { usePathname, useRouter } from "next/navigation";
import { Navbar } from "@/components";
import Footer from "@/components/Footer";
import { FloatButton } from "antd";

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
      {showNavbar && <Footer />}
    </>
  );
}
