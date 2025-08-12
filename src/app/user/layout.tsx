import { ProfileLayoutClient } from "@/components/layouts";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProfileLayoutClient>{children}</ProfileLayoutClient>;
}
