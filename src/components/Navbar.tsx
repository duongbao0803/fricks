"use client";

import Link from "next/link";
import NavElement from "./NavElement";
import MobileNav from "./MobileNav";
import Image from "next/image";
import { Badge, Form } from "antd";
import {
  ShoppingCartOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import IconWeb from "@/assets/images/logo/logo_web.png";
import { FaRegCircleQuestion, FaRegPaperPlane } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";

import { InputCustom } from "./ui/input";

const Navbar = () => {
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
              </Link>

              <div className="h-6 w-0.5 bg-orange-600" />

              <Link
                href=""
                className="flex cursor-pointer items-center gap-1 hover:text-primary"
              >
                <FaRegCircleQuestion className="text-sm transition-all duration-500 lg:text-lg" />
                <span className="text-[11px] transition-all duration-500 lg:text-sm">
                  Hỗ trợ
                </span>
              </Link>

              <div className="h-6 w-0.5 bg-orange-600" />

              <Link
                href="/auth"
                className="flex cursor-pointer items-center gap-1 hover:text-primary"
              >
                <FaRegUserCircle className="text-sm transition-all duration-500 lg:text-lg" />
                <span className="text-[11px] transition-all duration-500 lg:text-sm">
                  Đăng nhập
                </span>
              </Link>
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
              <SearchOutlined className="absolute right-3 z-10 select-none text-gray-400 transition-all duration-500" />

              <Form name="normal_login" className="login-form w-full">
                <Form.Item
                  name=""
                  hasFeedback
                  colon={true}
                  className="formItem"
                  noStyle
                >
                  <InputCustom
                    placeholder="Tìm kiếm..."
                    type="email"
                    className="w-full rounded-lg px-3 py-2 text-sm"
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
