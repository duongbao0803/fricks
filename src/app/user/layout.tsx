import { ProfileLayoutClient } from "@/components/layouts";
import { Metadata } from "next";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProfileLayoutClient>{children}</ProfileLayoutClient>;
}
