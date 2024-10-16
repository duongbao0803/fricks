import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import Image from "next/image";
import IconWeb from "@/assets/images/logo/logo_web.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import "@/app/globals.css";
import useUserInfo from "@/hooks/useUserInfo";
import SidebarButtons from "./SidebarButtons";
import { useLogout } from "@/hooks/useLogout";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
// import NavElement from "./NavElement";

const MobileSide = () => {
  const userInfo = useUserInfo();
  const router = useRouter();
  const pathname = usePathname();

  const [activeButton, setActiveButton] = useState<number>(1);
  const { logout } = useLogout();

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
    <Sheet>
      <SheetTrigger className="flex items-center justify-center">
        <CiMenuFries className="text-4xl font-black text-primary" />
      </SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col">
        <nav className="mt-32 flex flex-col items-center justify-center">
          <div className="mb-16 flex justify-center text-center">
            <Image
              src={IconWeb}
              height={150}
              width={150}
              alt="icon"
              quality={100}
            />
          </div>
          <SidebarButtons
            activeButton={activeButton}
            handleButtonClick={handleButtonClick}
            logout={logout}
          ></SidebarButtons>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSide;
