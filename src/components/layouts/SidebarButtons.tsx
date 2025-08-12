import { ButtonData, SidebarButtonsProps } from "@/types/layout.types";
import Link from "next/link";
import React from "react";
import { FiLock, FiLogOut, FiShoppingCart, FiUser } from "react-icons/fi";

export const buttonsData: ButtonData[] = [
  {
    id: 1,
    label: "Thông tin cá nhân",
    path: "/user/personal",
    icon: <FiUser />,
  },
  { id: 2, label: "Đổi mật khẩu", path: "/user/password", icon: <FiLock /> },
  {
    id: 3,
    label: "Đơn hàng của tôi",
    path: "/user/ordered",
    icon: <FiShoppingCart />,
  },
  { id: 4, label: "Đăng xuất", path: "/logout", icon: <FiLogOut /> },
];

const SidebarButtons: React.FC<SidebarButtonsProps> = ({
  activeButton,
  handleButtonClick,
  logout,
}) => {
  return (
    <>
      {buttonsData.map((button) => {
        const isActive = activeButton === button.id;

        if (button.id === 4) {
          return (
            <button
              key={button.id}
              className={`mb-2 w-full rounded-lg px-3 py-2 text-left transition-all duration-200 ease-in-out ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-primary hover:text-white"
              }`}
              onClick={logout}
            >
              <div className="flex items-center justify-center gap-3 lg:justify-start">
                {button.icon}
                <span>{button.label}</span>
              </div>
            </button>
          );
        }

        return (
          <Link
            key={button.id}
            href={button.path}
            className={`mb-2 block w-full rounded-lg px-3 py-2 text-left transition-all duration-200 ease-in-out ${
              isActive
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white"
            }`}
            onClick={() => handleButtonClick(button.id, button.path)}
          >
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              {button.icon}
              <span>{button.label}</span>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default React.memo(SidebarButtons);
