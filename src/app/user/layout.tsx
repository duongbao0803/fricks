"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLogout } from "@/hooks/useLogout";
import { BreadScrumb } from "@/components/common";
import SidebarButtons from "@/components/layouts/SidebarButtons";
import Image from "next/image";
import Avatar from "@/assets/images/logo/avatar_admin.jpg";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState<number>(1);
  const { logout } = useLogout();

  const items = [
    {
      title: "Thông tin tài khoản",
    },
  ];

  useEffect(() => {
    switch (pathname) {
      case "/user/personal":
        setActiveButton(1);
        break;
      case "/user/password":
        setActiveButton(2);
        break;
      case "/user/ordered":
        setActiveButton(3);
        break;
      default:
        setActiveButton(0);
    }
  }, [pathname]);

  const handleButtonClick = (buttonName: number, path: string) => {
    setActiveButton(buttonName);
    router.push(path);
  };

  return (
    <main className="bg-[#f1f6fa]">
      <div className="container mx-auto min-h-screen">
        <div className="py-16">
          <BreadScrumb items={items} />
        </div>

        <div className="grid grid-cols-4 gap-10">
          <div className="col-span-1 hidden lg:block">
            <div className="flex items-center gap-5">
              <Image
                src={Avatar}
                height={500}
                width={500}
                quality={100}
                alt="avatar"
                className="size-12 rounded-[100%]"
              />
              <span className="font-bold">Duong Bao</span>
            </div>
            <div className="my-3 h-0.5 w-full bg-[#eeeeee]" />
            <SidebarButtons
              activeButton={activeButton}
              handleButtonClick={handleButtonClick}
              logout={logout}
            />
          </div>
          <div key={pathname} className="col-span-4 items-center lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
