"use client";

import React, { useState } from "react";
import { Form, Checkbox, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ButtonCustom } from "@/components/ui/button";
import { LoginFormParams } from "@/types/login.types";
import { InputCustom } from "@/components/ui/input";
import RegisterForm from "@/app/auth/register/RegisterForm";
import ForgotPasswordForm from "@/app/auth/forgot-pass/ForgotPasswordForm";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/config/firebase";

const provider = new GoogleAuthProvider();

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

  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    } finally {
      setIsLoggingIn(false);
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
          <section className="py-5">
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-center text-2xl font-bold text-primary transition-all duration-500 lg:text-3xl">
                CHÀO MỪNG TRỞ LẠI
              </h1>
              <p className="mx-4 mb-5 mt-3 text-center text-sm text-[#a3a1a1] transition-all duration-500 lg:mx-9 lg:text-[15px]">
                Trải nghiệm mua sắm vật liệu xây dựng chất lượng với {""}
                <span>
                  <Link
                    href="/"
                    className="group relative cursor-pointer font-bold text-primary"
                  >
                    FRICKS
                    <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
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
                    autoFocus
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
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  noStyle
                  className="mt-4"
                >
                  <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>
                    Ghi nhớ
                  </Checkbox>

                  <a
                    href="#"
                    className="group relative float-right cursor-pointer font-semibold text-primary hover:text-primary"
                    onClick={() => setIsShowForgotPassword(true)}
                  >
                    Quên mật khẩu
                    <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </Form.Item>
              </motion.div>
              <motion.div
                initial={{ x: 50 }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}
              >
                <Form.Item>
                  <ButtonCustom
                    // htmlType="submit"
                    className="mx-auto mt-5 block h-11 w-full rounded-[5px] bg-primary text-lg tracking-wider text-white hover:bg-primary/80"
                  >
                    {isLoggingIn ? (
                      <Spin
                        indicator={<LoadingOutlined className="text-[#fff]" />}
                      />
                    ) : (
                      "Đăng nhập"
                    )}
                  </ButtonCustom>
                </Form.Item>
              </motion.div>
            </Form>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
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
              <ButtonCustom
                onClick={handleGoogleSignIn}
                className="mx-auto mt-5 block h-11 w-full rounded-[5px] border border-gray-300 bg-[#fff] text-[grey] shadow-none hover:!border-primary hover:!bg-transparent hover:!text-primary"
              >
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
                  className="login-form-forgot group relative cursor-pointer font-semibold text-primary hover:text-primary"
                  onClick={() => setIsShowRegister(true)}
                >
                  Đăng ký
                  <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </div>
            </motion.div>
          </section>
        </>
      ) : (
        <RegisterForm
          isShowRegister={isShowRegister}
          setIsShowRegister={setIsShowRegister}
        />
      )}
    </>
  );
};

export default LoginForm;
