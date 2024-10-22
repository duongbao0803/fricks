"use client";
import { usePathname } from "next/navigation";
import { FloatButton } from "antd";
import ProgressBar from "@/components/ProgressBar";
import { Footer, Navbar } from "@/components/layouts";
import useUserInfo from "@/hooks/useUserInfo";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

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
