"use client";

import { useGetFavorListQuery } from "@/apis/favoriteProductApi";
import User from "@/assets/images/logo/avatar_admin.jpg";
import IconWeb from "@/assets/images/logo/logo_web.png";
import { RolesLogin } from "@/enums";
import useDebounce from "@/hooks/useDebounce";
import { useLogout } from "@/hooks/useLogout";
import { getToken } from "@/hooks/useToken";
import { setFavoriteCount } from "@/redux/slices/favoriteSlice";
import { RootState } from "@/redux/store";
import {
  BellOutlined,
  LockOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { skipToken } from "@reduxjs/toolkit/query";
import type { MenuProps } from "antd";
import { Badge, Dropdown } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegCircleQuestion, FaRegPaperPlane } from "react-icons/fa6";
import { GrFavorite } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import MobileNav from "./MobileNav";
import NavElement from "./NavElement";

const Navbar = () => {
  const dispatch = useDispatch();
  const token = getToken();
  const { logout } = useLogout();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [styleCart, setStyleCart] = useState<string>("");
  const [styleFavor, setStyleFavor] = useState<string>("");
  const { data: favoriteList = [], refetch } = useGetFavorListQuery(
    token ? { PageIndex: 1, PageSize: 50 } : skipToken,
  );
  const userInfo = useSelector(
    (state: RootState) => state.persistedReducer.user.userInfo,
  );
  const cartData = useSelector(
    (state: RootState) => state.persistedReducer.cart,
  );
  const count = useSelector(
    (state: RootState) => state.persistedReducer.favorites.count,
  );

  const currentPath = usePathname();

  useEffect(() => {
    if (favoriteList && Array.isArray(favoriteList)) {
      dispatch(setFavoriteCount(favoriteList.length));
    }
  }, [favoriteList, dispatch]);

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
          icon: <UserOutlined className="text-gray-500" />,
          label: (
            <Link
              href="/user/personal"
              className="text-gray-700 hover:text-gray-900"
            >
              Thông tin cá nhân
            </Link>
          ),
        },
        {
          key: "password",
          icon: <LockOutlined className="text-gray-500" />,
          label: (
            <Link
              href="/user/password"
              className="text-gray-700 hover:text-gray-900"
            >
              Đổi mật khẩu
            </Link>
          ),
        },
        {
          key: "ordered",
          icon: <ShoppingOutlined className="text-gray-500" />,
          label: (
            <Link
              href="/user/ordered"
              className="text-gray-700 hover:text-gray-900"
            >
              Đơn hàng
            </Link>
          ),
        },
        {
          type: "divider",
        },
        {
          key: "logout",
          icon: <LogoutOutlined className="text-red-500 hover:text-red-500" />,
          label: (
            <span
              className="cursor-pointer text-red-500 transition-colors hover:text-red-500"
              onClick={logout}
            >
              Đăng xuất
            </span>
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
          <BellOutlined className="text-[10px] transition-all duration-500 lg:text-base" />
        ),
      },
      {
        href: "https://www.facebook.com/Fricks.BuildingService",
        text: "Hỗ trợ",
        icon: (
          <FaRegCircleQuestion className="text-[10px] transition-all duration-500 lg:text-base" />
        ),
        target: "_blank",
      },
    ],
    [],
  );

  return (
    <header>
      <div className="flex flex-col items-center justify-center bg-[#fff] transition-all duration-500">
        <div className="w-full bg-[#F5F5F5]">
          <div className="container mx-auto flex w-full flex-wrap items-center justify-center gap-2 transition-all duration-500 md:justify-between">
            <div className="mr-2 flex flex-wrap items-center gap-1">
              <FaRegPaperPlane className="mr-1 text-sm transition-all duration-500 lg:text-lg" />
              <span className="text-[12px] lg:text-[15px]">
                fricks.customerservice@gmail.com
              </span>
            </div>
            <div className="ml-2 flex items-center gap-5">
              {linkData.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 py-2 text-[12px]"
                >
                  <Link
                    href={link.href}
                    target={link.target}
                    className="flex cursor-pointer items-center gap-1.5 hover:text-primary"
                  >
                    {link.icon}
                    <span className="transition-all duration-500 lg:text-sm">
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
                  arrow={false}
                  overlayClassName="modern-dropdown"
                >
                  <div className="group flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 transition-all duration-200 hover:bg-gray-50/80">
                    <Image
                      src={userInfo?.avatar || User}
                      alt={userInfo?.fullName}
                      width={28}
                      height={28}
                      className="size-7 rounded-full object-cover"
                    />
                    <span className="text-[11px] text-gray-700 transition-all duration-500 lg:text-sm">
                      {userInfo?.fullName}
                    </span>
                    <svg
                      className="h-3 w-3 text-gray-400 transition-transform duration-200 group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
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

          <div className="mx-6 flex w-full items-center justify-end gap-3 lg:mx-0 lg:w-auto">
            {userInfo && userInfo?.role?.includes(RolesLogin.CUSTOMER) ? (
              <div className="mr-0 mt-1 flex w-[130px] items-center justify-end gap-7 lg:mr-5">
                <Link href="/favorite">
                  <div className="lg:block">
                    <Badge count={count}>
                      <GrFavorite
                        className={`cursor-pointer text-2xl ${styleFavor} hover:text-primary`}
                      />
                    </Badge>
                  </div>
                </Link>
                <Link href="/cart">
                  <div className="lg:block">
                    <Badge
                      count={favoriteList?.length || cartData?.totalQuantity}
                    >
                      <ShoppingCartOutlined
                        className={`cursor-pointer text-2xl ${styleCart} hover:text-primary`}
                      />
                    </Badge>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="w-[130px]" />
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
