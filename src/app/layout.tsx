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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(s,u,b,i,z){
                var o,t,r,y;s[i]||(s._sbzaccid=z,s[i]=function(){s[i].q.push(arguments)},s[i].q=[],s[i]("setAccount",z),r=["widget.subiz.net","storage.googleapis"+(t=".com"),"app.sbz.workers.dev",i+"a"+(o=function(k,t){var n=t<=6?5:o(k,t-1)+o(k,t-3);return k!==t?n:n.toString(32)})(20,20)+t,i+"b"+o(30,30)+t,i+"c"+o(40,40)+t],(y=function(k){var t,n;s._subiz_init_2094850928430||r[k]&&(t=u.createElement(b),n=u.getElementsByTagName(b)[0],t.async=1,t.src="https://"+r[k]+"/sbz/app.js?accid="+z,n.parentNode.insertBefore(t,n),setTimeout(y,2e3,k+1))})(0)
              }(window,document,"script","subiz", "acscryxkbryqwcqqwrkv");
            `,
          }}
        />
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
