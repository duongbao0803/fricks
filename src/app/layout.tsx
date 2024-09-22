import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LoadingWrapper from "@/components/LoadingWrapper";
import { NotificationProvider } from "@/components/Notification";
import { Providers } from "@/redux/provider";
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
            <Providers>{children}</Providers>
          </NotificationProvider>
        </LoadingWrapper>
      </body>
    </html>
  );
}
