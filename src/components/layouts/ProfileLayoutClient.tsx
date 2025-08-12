"use client";
import { BreadScrumb } from "@/components/common";
import MobileSide from "@/components/layouts/MobileSide";
import SidebarButtons from "@/components/layouts/SidebarButtons";
import { useLogout } from "@/hooks/useLogout";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

export default function ProfileLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const userInfo = useSelector(
    (state: RootState) => state.persistedReducer.user.userInfo,
  );
  const [activeButton, setActiveButton] = useState<number>(1);
  const { logout } = useLogout();

  const items = [{ title: "Thông tin tài khoản" }];

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
    router.push(path);
  };

  return (
    <main className="bg-[#f1f6fa] pb-10">
      <div className="container mx-auto min-h-screen">
        <div className="pb-5 pt-16 lg:py-16">
          <BreadScrumb items={items} />
        </div>
        <div className="relative grid grid-cols-4 gap-10 transition-all duration-500">
          <div className="col-span-1 hidden transition-all duration-500 lg:block">
            <div className="flex items-center gap-4">
              <Image
                src={userInfo?.avatar ?? ""}
                height={500}
                width={500}
                quality={100}
                alt="avatar"
                className="size-14 rounded-[100%] object-cover"
              />
              <span className="font-semibold">{userInfo?.fullName}</span>
            </div>
            <div className="my-3 h-0.5 w-full bg-[#eeeeee]" />
            <SidebarButtons
              activeButton={activeButton}
              handleButtonClick={handleButtonClick}
              logout={logout}
            />
          </div>
          <div className="absolute right-0 top-[-5px] lg:hidden">
            <MobileSide />
          </div>
          <div key={pathname} className="col-span-4 items-center lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
