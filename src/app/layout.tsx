import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LoadingWrapper from "@/components/LoadingWrapper";
import { NotificationProvider } from "@/components/Notification";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fricks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingWrapper>
          <NotificationProvider>
            {/* <Navbar /> */}

            {/* <NextProgressBar /> */}
            {children}
          </NotificationProvider>
        </LoadingWrapper>
      </body>
    </html>
  );
}
