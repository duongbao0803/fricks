"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import NavElement from "./NavElement";
import MobileNav from "./MobileNav";
import Image from "next/image";
import { Badge, Form, Dropdown, Input } from "antd";
import type { MenuProps } from "antd";
import {
  ShoppingCartOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { FaRegCircleQuestion, FaRegPaperPlane } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import { InputCustom } from "./ui/input";
import IconWeb from "@/assets/images/logo/logo_web.png";
import { useGetUserInfoQuery } from "@/apis/authApi";
import { useLogout } from "@/hooks/useLogout";
import User from "@/assets/images/logo/avatar_admin.jpg";
import { MdKeyboardVoice } from "react-icons/md";
import VoiceSearch from "./VoiceSearch";

const Navbar = () => {
  const token = Cookies.get("accessToken");
  const { data } = useGetUserInfoQuery(undefined, {
    skip: !token,
  });
  const { logout } = useLogout();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchUpdate = (query: string) => {
    setSearchQuery(query);
  };

  const menuItems: MenuProps = {
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
  };

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
              <Link
                href=""
                className="flex cursor-pointer items-center gap-1 hover:text-primary"
              >
                <BellOutlined className="text-sm transition-all duration-500 lg:text-lg" />
                <span className="text-[11px] transition-all duration-500 lg:text-sm">
                  Thông báo
                </span>
                <p>{searchQuery}</p>
              </Link>

              <div className="h-6 w-0.5 bg-orange-600" />

              <Link
                href="https://www.facebook.com/Fricks.BuildingService"
                target="_blank"
                className="flex cursor-pointer items-center gap-1 hover:text-primary"
              >
                <FaRegCircleQuestion className="text-sm transition-all duration-500 lg:text-lg" />
                <span className="text-[11px] transition-all duration-500 lg:text-sm">
                  Hỗ trợ
                </span>
              </Link>

              <div className="h-6 w-0.5 bg-orange-600" />
              {data ? (
                <Dropdown
                  menu={menuItems}
                  trigger={["hover"]}
                  placement="bottomRight"
                  arrow
                >
                  <div className="flex cursor-pointer items-center gap-1 hover:text-primary">
                    <Image
                      src={data?.avatar || User}
                      alt={data?.fullName}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <span className="text-[11px] transition-all duration-500 lg:text-sm">
                      {data?.fullName}
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
                    value={searchQuery}
                    defaultValue={searchQuery}
                    placeholder="Tìm kiếm..."
                    type="email"
                    className="w-full rounded-lg border-2 px-3 py-2 text-sm active:border-2 active:!border-primary"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form.Item>
              </Form>
            </div>

            <Link href="">
              <div className="lg:hidden">
                <Badge count={5} size="small">
                  <ShoppingCartOutlined className="cursor-pointer text-xl hover:text-primary" />
                </Badge>
              </div>

              <div className="hidden lg:block">
                <Badge count={5}>
                  <ShoppingCartOutlined className="cursor-pointer text-3xl hover:text-primary" />
                </Badge>
              </div>
            </Link>
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
