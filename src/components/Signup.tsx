"use client";

import React, { useState } from "react";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Spin, notification } from "antd";
import Signin from "../app/auth/login/LoginForm";
import Link from "next/link";
import ForgotPasswordForm from "./ForgotPassword";
// import { signUp } from "@/api/authenApi";
// import { SignupValues } from "@/types/auth.types";
import {motion} from "framer-motion"
import { ButtonCustom } from "./ui/button";
import Image from "next/image";
import { InputCustom } from "./ui/input";

interface IProps {
  isShowRegister: boolean;
  setIsShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup: React.FC<IProps> = ({ isShowRegister, setIsShowRegister }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  // const [, setValues] = useState<SignupValues>({
  //   email: "",
  //   fullName: "",
  //   password: "",
  //   confirmPassword: "",
  //   role: 0,
  // });
  const [isSigningUp, setIsSigningUp] = useState(false);

  const [form] = Form.useForm();

  const validatePassword = (_: unknown, value: string) => {
    const password = form.getFieldValue("password");
    if (value && password && value !== password) {
      return Promise.reject("Mật khẩu không trùng");
    }
    return Promise.resolve();
  };

  const togglePassword = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // const onFinish = (values: SignupValues) => {
  //   setValues(values);
  //   handleSignUp(values);
  // };

  // const handleSignUp = async (formValues: SignupValues) => {
  //   alert("hihi");
  //   if (isSigningUp) {
  //     return;
  //   }
  //   try {
  //     setIsSigningUp(true);
  //     const res = await signUp(formValues);
  //     if (res && res.status === 200) {
  //       notification.success({
  //         message: "Tạo tài khoản thành công",
  //         description: "Tài khoản đã được tạo. Vui lòng kiểm tra email",
  //         duration: 2,
  //       });
  //     }
  //   } catch (err) {
  //     console.error("err", err);
  //     setIsSigningUp(false);
  //   }
  // };

  return (
    <>
      {isShowRegister ? (
            <>
           
              <>
                <div className="">
                  <motion.div
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <h1 className="text-center text-[27px] lg:text-3xl font-bold text-primary transition-all duration-500">
                      ĐĂNG KÝ
                    </h1>
                   
                  </motion.div>
                  <Form
                    name="normal_login"
                    className="login-form"
                    form={form}
                    // onFinish={onFinish}
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
                      className="mb-9"
                    >
                      <Form.Item
                        name="name"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tên của bạn",
                          },
                          {
                            max: 8,
                            message: "Tên người dùng ít nhất 8 ký tự",
                          },
                        ]}
                        colon={true}
                        labelCol={{ span: 24 }}
                        className="formItem"
                      >
                        <InputCustom
                          placeholder="Họ và tên"
                          type="text"
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
                      initial={{ x: -50 }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="mb-9"

                    >
                      <Form.Item
                        name="confirmPassword"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng xác nhận mật khẩu",
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
                          placeholder="Xác nhận mật khẩu"
                          type="password"
                          className="hover:border-primary focus:border-primary"
                        />
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
                          {isSigningUp ? (
                            <Spin
                              indicator={<LoadingOutlined className="text-[#fff]" />}
                            />
                          ) : (
                            "Đăng ký"
                          )}
                        </ButtonCustom>
                      </motion.div>
                    </Form.Item>
                  </Form>
            
                  <motion.div
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
              
      
      
                    <div className="text-center text-sm">
                      <span className="text-black">Bạn đã có tài khoản?</span> {""}
                      <a
                        href="#"
                        className="login-form-forgot  hover:text-primary cursor-pointer  font-semibold text-primary relative  group"
                        onClick={() => setIsShowRegister(false)}
                      >
                        Đăng nhập
                        <span className="absolute bottom-[-3px] left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </>
          
          </>
    
      ) : (
        <Signin />
      )}
    </>
  );
};

export default Signup;
