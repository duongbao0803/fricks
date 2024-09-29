"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components";
import Footer from "@/components/Footer";

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
      <Footer />
    </>
  );
}
