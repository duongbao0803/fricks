"use client";

import React, { useState } from "react";
import { Form, Checkbox, Spin } from "antd";
import {
  LoadingOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import ForgotPasswordForm from "@/components/ForgotPassword";
import Signup from "@/components/Signup";
import Link from "next/link";
import { motion } from "framer-motion";
import { ButtonCustom } from "@/components/ui/button";
import { InputCustom } from "../../../components/ui/input";
import { LoginFormParams } from "@/types/login.types";

const LoginForm: React.FC = () => {
  const [isShowRegister, setIsShowRegister] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isShowForgotPassword, setIsShowForgotPassword] =
    useState<boolean>(false);
  const [, setValues] = useState({
    email: "",
    password: "",
  });
  const [form] = Form.useForm();
  const [isError, setIsError] = useState(false);
 

  const onFinish = (values: LoginFormParams) => {
    console.log("check values", values);

    setValues(values);
    if (values?.email && values?.password) {
      // handleSignin(values);
    }
  };



  return (
    <>
      {isShowForgotPassword ? (
        <ForgotPasswordForm
          isShowRegister={isShowRegister}
          setIsShowRegister={setIsShowRegister}
        />
      ) : !isShowRegister ? (
        <>
          <div className="">
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-center text-[27px] lg:text-3xl font-bold text-primary transition-all duration-500">
                CHÀO MỪNG TRỞ LẠI
              </h1>
              <p className="mx-5 lg:mx-10 mt-3 mb-5 text-center text-sm lg:text-[15px] text-[#a3a1a1] transition-all duration-500">
                Trải nghiệm mua sắm vật liệu xây dựng chất lượng với {""}
                <span>
                  <Link
                    href="/"
                    className="cursor-pointer font-bold text-primary relative group"
                  >
                    FRICKS
                    <span className="absolute bottom-[-3px] left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                  <span>.</span>
                </span>
                {""} Bắt đầu ngay.
              </p>
            </motion.div>
            <Form
              name="normal_login"
              className="login-form"
              form={form}
              onFinish={onFinish}
            >
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-9"
              >
                <Form.Item
                  name="email"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email",
                    },
                    {
                      type: "email",
                      message: "Vui lòng nhập đúng kiểu email",
                    },
                  ]}
                  colon={true}
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <InputCustom
                    placeholder="Email"
                    type="email"
                    className="hover:border-primary focus:border-primary"
                  />
                </Form.Item>
              </motion.div>
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu",
                    },
                    {
                      min: 4,
                      max: 20,
                      message: "Mật khẩu phải có ít nhất 8 kí tự",
                    },
                  ]}
                  labelCol={{ span: 24 }}
                  className="formItem"
                  hasFeedback
                >
                  <InputCustom
                    placeholder="Mật khẩu"
                    type="password"
                    className="hover:border-primary focus:border-primary"
                  />
                </Form.Item>
              </motion.div>
              <motion.div
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Form.Item name="remember" valuePropName="checked" noStyle className="mt-4">
                  <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>
                    Ghi nhớ
                  </Checkbox>
                  <a
                    href="#"
                    className="float-right hover:text-primary cursor-pointer font-semibold text-primary relative group"
                    onClick={() => setIsShowForgotPassword(true)}
                  >
                    Quên mật khẩu
                    <span className="absolute bottom-[-3px] left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />

                  </a>
                </Form.Item>
              </motion.div>
              <Form.Item>
                <motion.div
                     initial={{ x: -50 }}
                     animate={{ x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <ButtonCustom
                    // htmlType="submit"
                    className="mx-auto mt-5 block h-11 w-full rounded-[5px] text-lg tracking-wider bg-primary hover:bg-primary/80 text-white"
                  >
                    {isLoggingIn ? (
                      <Spin
                        indicator={<LoadingOutlined className="text-[#fff]" />}
                      />
                    ) : (
                      "Đăng nhập"
                    )}
                  </ButtonCustom>
                </motion.div>
              </Form.Item>
            </Form>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="mt-4 flex items-center justify-center text-center">
                <div className="mr-2 h-[1px] w-full bg-[#e6e8eb]"></div>
                <span className="text-[#999999]">hoặc</span>
                <div className="ml-2 h-[1px] w-full bg-[#e6e8eb]"></div>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ButtonCustom className="mx-auto mt-5 block h-11 w-full rounded-[5px] border border-gray-300 bg-[#fff] text-[grey] hover:!text-primary shadow-none hover:!border-primary hover:!bg-transparent">
                <div className="flex items-center justify-center tracking-wider">
                  <Image
                    src="https://freesvg.org/img/1534129544.png"
                    width={30}
                    height={30}
                    quality={100}
                    alt=""
                    className="mr-2"
                  />
                  Tiếp tục với Google
                </div>
              </ButtonCustom>


              <div className="mt-3 text-center text-sm">
                <span className="text-black">Bạn không có tài khoản?</span> {""}
                <a
                  href="#"
                  className="login-form-forgot  hover:text-primary cursor-pointer  font-semibold text-primary relative  group"
                  onClick={() => setIsShowRegister(true)}
                >
                  Đăng ký
                  <span className="absolute bottom-[-3px] left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </div>
            </motion.div>
          </div>
        </>
      ) : (
        <Signup
          isShowRegister={isShowRegister}
          setIsShowRegister={setIsShowRegister}
        />
      )}
    </>
  );
};

export default LoginForm;
