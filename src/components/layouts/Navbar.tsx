"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge, Form, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { FaRegCircleQuestion, FaRegPaperPlane } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import Cookies from "js-cookie";
import { ShoppingCartOutlined, BellOutlined } from "@ant-design/icons";
import MobileNav from "./MobileNav";
import IconWeb from "@/assets/images/logo/logo_web.png";
import { useGetUserInfoQuery } from "@/apis/authApi";
import { useLogout } from "@/hooks/useLogout";
import User from "@/assets/images/logo/avatar_admin.jpg";
import useDebounce from "@/hooks/useDebounce";
import { VoiceSearch } from "@/components";
import NavElement from "./NavElement";
import { usePathname } from "next/navigation";
import { UserInfo } from "@/types/personal.types";
import { RolesLogin } from "@/enums";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const token = Cookies.get("accessToken");
  const { data } = useGetUserInfoQuery(undefined, {
    skip: !token,
  });
  const userInfo: UserInfo | undefined = data;

  const { logout } = useLogout();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [styleCart, setStyleCart] = useState<string>("");
  const [styleFavor, setStyleFavor] = useState<string>("");
  const cartData = useSelector(
    (state: RootState) => state.persistedReducer.cart,
  );

  console.log("check cartData", cartData);

  const currentPath = usePathname();

  useEffect(() => {
    const isCart =
      currentPath.includes("/cart") || currentPath.includes("/checkout");
    const isFavorite = currentPath.includes("/favorite");

    setStyleCart(isCart ? "text-primary" : "");
    setStyleFavor(isFavorite ? "text-primary" : "");
  }, [currentPath]);

  const handleSearchUpdate = (query: string) => {
    setSearchQuery(query);
  };

  const menuItems = useMemo<MenuProps>(
    () => ({
      items: [
        {
          key: "profile",
          label: (
            <Link href="/profile" className="flex items-center gap-2">
              <span>Thông tin cá nhân</span>
            </Link>
          ),
        },
        {
          key: "logout",
          label: (
            <p className="w-full" onClick={logout}>
              Đăng xuất
            </p>
          ),
        },
      ],
    }),
    [logout],
  );

  const linkData = useMemo(
    () => [
      {
        href: "",
        text: "Thông báo",
        icon: (
          <BellOutlined className="text-sm transition-all duration-500 lg:text-lg" />
        ),
      },
      {
        href: "https://www.facebook.com/Fricks.BuildingService",
        text: "Hỗ trợ",
        icon: (
          <FaRegCircleQuestion className="text-sm transition-all duration-500 lg:text-lg" />
        ),
        target: "_blank",
      },
    ],
    [],
  );

  return (
    <header>
      <div className="flex flex-col items-center justify-center bg-[#fff] transition-all duration-500">
        <div className="w-full bg-[#F5F5F5] py-2">
          <div className="max-513-center container mx-auto flex w-full flex-wrap items-center justify-between gap-2 transition-all duration-500">
            <div className="mr-2 flex flex-wrap items-center gap-1 text-[11px] lg:text-[16px]">
              <FaRegPaperPlane className="text-sm transition-all duration-500 lg:text-lg" />
              <span>fricks.customerservice@gmail.com</span>
            </div>
            <div className="ml-2 flex items-center gap-5">
              {linkData.map((link, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Link
                    href={link.href}
                    target={link.target}
                    className="flex cursor-pointer items-center gap-1 hover:text-primary"
                  >
                    {link.icon}
                    <span className="text-[11px] transition-all duration-500 lg:text-sm">
                      {link.text}
                    </span>
                  </Link>
                  {index < linkData.length - 1 && (
                    <div className="h-6 w-0.5 bg-orange-600" />
                  )}
                </div>
              ))}
              <div className="h-6 w-0.5 bg-orange-600" />
              {userInfo ? (
                <Dropdown
                  menu={menuItems}
                  trigger={["hover"]}
                  placement="bottomRight"
                  arrow
                >
                  <div className="flex cursor-pointer items-center gap-1 hover:text-primary">
                    <Image
                      src={userInfo?.avatar || User}
                      alt={userInfo?.fullName}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <span className="text-[11px] transition-all duration-500 lg:text-sm">
                      {userInfo?.fullName}
                    </span>
                  </div>
                </Dropdown>
              ) : (
                <Link
                  href="/auth"
                  className="flex cursor-pointer items-center gap-1 hover:text-primary"
                >
                  <FaRegUserCircle className="text-sm transition-all duration-500 lg:text-lg" />
                  <span className="text-[11px] transition-all duration-500 lg:text-sm">
                    Đăng nhập
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto flex items-center justify-between bg-[#fff] py-4 transition-all duration-500 lg:py-5">
          <Link href="/">
            <Image
              src={IconWeb}
              width={130}
              alt="icon"
              quality={100}
              className="hidden lg:block"
            />
            <Image
              src={IconWeb}
              width={150}
              alt="icon"
              quality={100}
              className="lg:hidden"
            />
          </Link>
          <div className="hidden items-center gap-8 lg:flex">
            <NavElement />
          </div>
          <div className="mx-6 flex w-full items-center gap-3 lg:mx-0 lg:w-auto">
            <div className="relative flex w-full items-center gap-2 transition-all duration-500 lg:flex">
              <VoiceSearch onSearch={handleSearchUpdate} />
              <Form name="normal_login" className="login-form w-full">
                <Form.Item
                  name=""
                  hasFeedback
                  colon={true}
                  className="formItem"
                  noStyle
                >
                  <input
                    value={debouncedSearchQuery}
                    placeholder="Tìm kiếm..."
                    type="text"
                    className="w-full rounded-lg px-3 py-2 text-sm ring-1 ring-gray-300 focus:border-0 focus:outline-none focus:ring-1 focus:ring-primary"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form.Item>
              </Form>
            </div>
            {userInfo && userInfo?.role.includes(RolesLogin.CUSTOMER) && (
              <div className="flex items-center gap-5">
                <Link href="/favorite">
                  <div className="lg:block">
                    <Badge count={5}>
                      <GrFavorite
                        className={`cursor-pointer text-2xl ${styleFavor} hover:text-primary`}
                      />
                    </Badge>
                  </div>
                </Link>
                <Link href="/cart">
                  <div className="lg:block">
                    <Badge count={cartData?.totalQuantity}>
                      <ShoppingCartOutlined
                        className={`cursor-pointer text-2xl ${styleCart} hover:text-primary`}
                      />
                    </Badge>
                  </div>
                </Link>
              </div>
            )}
          </div>
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
