"use client";

import React, { useState } from "react";
import { Form, Checkbox, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ButtonCustom } from "@/components/ui/button";
import { ApiResponse } from "@/types/login.types";
import { InputCustom } from "@/components/ui/input";
import RegisterForm from "@/app/auth/register/RegisterForm";
import ForgotPasswordForm from "@/app/auth/forgot-pass/ForgotPasswordForm";
import { auth } from "@/config/firebase";
import {
  useConfirmEmailMutation,
  useLoginGoogleMutation,
  useLoginMutation,
  useResendOTPMutation,
} from "@/apis/authApi";
import { notify } from "@/components/Notification";
import { encryptData, isErrorResponse } from "@/utils";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { RolesLogin } from "@/enums";
import { useDecryptCredentials } from "@/hooks/useDecryptCredentials";

const provider = new GoogleAuthProvider();

const LoginForm: React.FC = () => {
  const [isShowRegister, setIsShowRegister] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isShowForgotPassword, setIsShowForgotPassword] =
    useState<boolean>(false);
  const [form] = Form.useForm();
  const [login] = useLoginMutation();
  const [loginGoogle] = useLoginGoogleMutation();
  const router = useRouter();
  const [otpCode, setOtp] = useState<string>("");
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const [confirmEmail] = useConfirmEmailMutation();
  const [resendOtp] = useResendOTPMutation();
  const [isResending, setIsResending] = useState<boolean>(false);
  const [cooldownTime, setCooldownTime] = useState<number>(0);
  const { email, password, secretKey } = useDecryptCredentials();

  const onFinish = async (values: { email: string; password: string }) => {
    setIsLoggingIn(true);
    try {
      const res: ApiResponse = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      if (res && res.httpCode === 200) {
        const accessToken = res.accessToken;
        if (accessToken) {
          const decoded: any = jwtDecode(accessToken);
          const role =
            decoded[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
          if (role !== RolesLogin.CUSTOMER) {
            notify("error", "Bạn không có quyền truy cập và trang này", 3);
            setIsLoggingIn(false);
            return;
          } else {
            Cookies.set("accessToken", res.accessToken);
            Cookies.set("refreshToken", res.refreshToken);
            if (rememberMe) {
              const encryptedEmail = encryptData(values.email, secretKey);
              const encryptedPassword = encryptData(values.password, secretKey);
              Cookies.set("email", encryptedEmail);
              Cookies.set("password", encryptedPassword);
            }
            router.push("/");
            notify("success", "Đăng nhập thành công", 3);
            setIsLoggingIn(false);
          }
        }
      }
    } catch (err: unknown) {
      if (isErrorResponse(err)) {
        if (
          err.data.message.includes(
            "Bạn phải xác nhận email trước khi đăng nhập vào hệ thống. OTP đã gửi qua email.",
          )
        ) {
          notify("error", `${err.data.message}`, 3);
          setIsLoggingIn(false);
          setTimeout(() => {
            setIsDrawerVisible(true);
          }, 1000);
          return;
        }
        setIsLoggingIn(false);
        notify("error", `${err.data.message}`, 3);
      } else {
        setIsLoggingIn(false);
        notify("error", "An unknown error occurred", 3);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credentials = await result.user.getIdTokenResult();
      const accessToken = credentials.token;
      const res = await loginGoogle(JSON.stringify(accessToken)).unwrap();
      console.log("check res", res);
      if (res && res.httpCode === 200) {
        Cookies.set("accessToken", res.accessToken);
        Cookies.set("refreshToken", res.refreshToken);
        router.push("/");
        notify("success", `${res.message}`, 3);
      }
    } catch (err) {
      if (isErrorResponse(err)) {
        notify("error", `${err.data.message}`, 3);
      }
    }
  };

  const handleOTPSubmit = async () => {
    const email = form.getFieldValue("email");
    let information = { email, otpCode };
    if (otpCode.length < 6) {
      notify("warning", "Vui lòng nhập otp", 3);
      return;
    }
    try {
      const res = await confirmEmail(information).unwrap();
      if (res && res.httpCode === 200) {
        const accessToken = res.accessToken;
        if (accessToken) {
          Cookies.set("accessToken", res.accessToken);
          Cookies.set("refreshToken", res.refreshToken);
          router.push("/");
          notify("success", "Đăng nhập thành công", 3);
        }
      }
    } catch (err) {
      console.error(err);
      if (isErrorResponse(err)) {
        notify("error", `${err.data.message}`, 3);
      }
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
  };

  const handleResendMail = async () => {
    const email = form.getFieldValue("email");
    if (!email) {
      notify("warning", "Vui lòng nhập email", 3);
      return;
    }
    if (isResending) {
      notify(
        "warning",
        `Vui lòng chờ ${cooldownTime} giây trước khi gửi lại mã OTP`,
        3,
      );
      return;
    }
    setIsResending(true);
    setCooldownTime(30);
    try {
      const res = await resendOtp(JSON.stringify(email)).unwrap();
      if (res && res.httpCode === 200) {
        notify("success", `${res.message}`, 3);
        const countdownInterval = setInterval(() => {
          setCooldownTime((prev) => {
            if (prev === 1) {
              clearInterval(countdownInterval);
              setIsResending(false);
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (err) {
      if (isErrorResponse(err)) {
        notify("error", `${err.data.message}`, 3);
      } else {
        notify("error", `${err}`, 3);
      }
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
          <section className="py-10">
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
                  initialValue={email}
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
                  initialValue={password}
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
              {/* <motion.div
                initial={{ x: 50 }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}
              >
                <Form.Item name="">
                  <ButtonCustom
                    // htmlType="submit"
                    className="mx-auto mt-5 flex h-11 w-full items-center rounded-[5px] bg-primary text-lg tracking-wider text-white hover:bg-primary/80"
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
              </motion.div> */}
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 1 }}
              >
                <Drawer open={isDrawerVisible} onClose={handleDrawerClose}>
                  <DrawerTrigger asChild>
                    <Form.Item noStyle>
                      <ButtonCustom className="mx-auto mt-5 flex h-11 w-full items-center rounded-[5px] bg-primary text-lg tracking-wider text-white hover:bg-primary/80">
                        {isLoggingIn ? (
                          <Spin
                            indicator={
                              <LoadingOutlined className="text-[#fff]" />
                            }
                          />
                        ) : (
                          "Đăng nhập"
                        )}
                      </ButtonCustom>
                    </Form.Item>
                  </DrawerTrigger>

                  <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                      <motion.div
                        key="enterOTP"
                        initial={{ x: 0, opacity: 1 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -150, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <DrawerHeader>
                          <DrawerTitle className="text-2xl">
                            Nhập mã OTP
                          </DrawerTitle>
                          <DrawerDescription className="text-[#a3a1a1]">
                            Nhập mã OTP đã được gửi đến email của bạn
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="pb-0">
                          <div className="flex items-center justify-center space-x-2 px-5">
                            <InputOTP
                              maxLength={6}
                              className="px-5"
                              onChange={(value) => setOtp(value)}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                              </InputOTPGroup>
                              <InputOTPSeparator />
                              <InputOTPGroup>
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                              </InputOTPGroup>
                              <InputOTPSeparator />
                              <InputOTPGroup>
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                        </div>
                        <DrawerFooter>
                          <ButtonCustom
                            className="mx-auto flex h-11 w-full items-center rounded-[5px] bg-primary text-sm tracking-wider text-white hover:bg-primary/80"
                            onClick={handleOTPSubmit}
                          >
                            Xác nhận
                          </ButtonCustom>
                          <ButtonCustom
                            onClick={handleResendMail}
                            className="mx-auto block h-11 w-full rounded-[5px] border border-gray-300 bg-[#fff] shadow-none hover:!border-primary hover:!bg-transparent hover:!text-primary"
                          >
                            Gửi lại
                          </ButtonCustom>
                        </DrawerFooter>
                      </motion.div>
                    </div>
                  </DrawerContent>
                </Drawer>
                {/* <div className="mt-3 text-center text-sm">
                  <span className="text-black">Bạn đã có tài khoản?</span>{" "}
                  <a
                    href="#"
                    className="login-form-forgot group relative cursor-pointer font-semibold text-primary hover:text-primary"
                    onClick={() => setIsShowRegister(false)}
                  >
                    Đăng nhập
                    <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </div> */}
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
                <span className="text-black">Bạn đã có tài khoản?</span> {""}
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
