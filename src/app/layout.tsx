import type { Metadata } from "next";
import {
  Fredoka,
  Inter,
  Josefin_Sans,
  Montserrat,
  Roboto_Slab,
  Ubuntu,
} from "next/font/google";
import "./globals.css";
import LoadingWrapper from "@/components/LoadingWrapper";
import { NotificationProvider } from "@/components/Notification";
import { Providers } from "@/redux/provider";
import { NextProgressBar } from "@/components";
import ClientLayout from "./auth/layout";

const inter = Inter({ subsets: ["latin"] });

// const joseFin = Josefin_Sans({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
//   variable: "--font-joseFin",
// });

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-robotoSlab",
});

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
      <body className={`${robotoSlab.variable}`}>
        <LoadingWrapper>
          <NotificationProvider>
            <NextProgressBar />
            <Providers>
              <ClientLayout>{children}</ClientLayout>
            </Providers>
          </NotificationProvider>
        </LoadingWrapper>
      </body>
    </html>
  );
}
