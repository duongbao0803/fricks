"use client";

import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Form, Spin } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import { InputCustom } from "@/components/ui/input";
import { ButtonCustom } from "@/components/ui/button";
import { notify } from "@/components/Notification";
import LoginForm from "@/app/auth/login/LoginForm";
import { useRegisterMutation } from "@/apis/authApi";
import { isErrorResponse } from "@/utils";

interface IProps {
  isShowRegister: boolean;
  setIsShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm: React.FC<IProps> = ({
  isShowRegister,
  setIsShowRegister,
}) => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [register] = useRegisterMutation();

  const [form] = Form.useForm();
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  const validatePassword = (_: unknown, value: string) => {
    const password = form.getFieldValue("password");
    if (value && password && value !== password) {
      return Promise.reject("Mật khẩu không trùng");
    }
    return Promise.resolve();
  };

  const onCaptchaChange = (value: string | null) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  const onFinish = async (values: {
    email: string;
    fullName: string;
    password: string;
    phoneNumber: string;
    confirmPassword: boolean;
  }) => {
    const { confirmPassword, ...information } = values;
    if (!captchaVerified) {
      notify("warning", "Vui lòng xác nhận reCAPTCHA", 3);
      return;
    }
    setIsShowRegister(true);
    try {
      console.log("check values", values);
      const res = await register(values).unwrap();
      if (res && res.httpCode === 200) {
        setIsSigningUp(false);
        notify("success", "Đăng kí tài khoản thành công", 3);
        setIsShowRegister(false);
      }
    } catch (err: unknown) {
      console.log("check err", err);
      if (isErrorResponse(err)) {
        setIsSigningUp(false);
        notify("error", `${err.data.message}`, 3);
      } else {
        setIsSigningUp(false);
        notify("error", `${err}`, 3);
      }
    }
  };

  return (
    <>
      {isShowRegister ? (
        <section className="py-5">
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
            className="my-5"
          >
            <h1 className="text-center text-3xl font-bold text-primary transition-all duration-500 lg:text-4xl">
              ĐĂNG KÝ
            </h1>
          </motion.div>
          <Form
            name="register_form"
            className="w-full"
            form={form}
            onFinish={onFinish}
          >
            <motion.div
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
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
                    message: "Email không đúng định dạng",
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
              className="mb-8"
            >
              <Form.Item
                name="fullName"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ và tên",
                  },
                  {
                    min: 8,
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
              className="mb-8"
            >
              <Form.Item
                name="phoneNumber"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại",
                  },
                  {
                    pattern: /^[0-9]{10,11}$/,
                    message: "Vui lòng nhập đúng số điện thoại (10-11 chữ số)",
                  },
                ]}
                colon={true}
                labelCol={{ span: 24 }}
                className="formItem"
              >
                <InputCustom
                  placeholder="Số điện thoại"
                  type="text"
                  className="hover:border-primary focus:border-primary"
                  autoFocus
                />
              </Form.Item>
            </motion.div>

            <motion.div
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
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
                    message: "Mật khẩu phải có từ 4 đến 20 kí tự",
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
            >
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu",
                  },
                  { validator: validatePassword },
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

            <Form.Item noStyle>
              <div className="mb-3 mt-8 flex w-full max-w-[300px] justify-start">
                <ReCAPTCHA
                  sitekey={recaptchaSiteKey}
                  onChange={onCaptchaChange}
                />
              </div>
            </Form.Item>
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
            >
              <Form.Item>
                <ButtonCustom
                  // htmlType="submit"
                  className="mx-auto block h-11 w-full rounded-[5px] bg-primary text-lg tracking-wider text-white hover:bg-primary/80"
                >
                  {isSigningUp ? (
                    <Spin
                      indicator={<LoadingOutlined className="text-[#fff]" />}
                    />
                  ) : (
                    "Đăng ký"
                  )}
                </ButtonCustom>

                <div className="mt-3 text-center text-sm">
                  <span className="text-black">Bạn đã có tài khoản?</span>{" "}
                  <a
                    href="#"
                    className="login-form-forgot group relative cursor-pointer font-semibold text-primary hover:text-primary"
                    onClick={() => setIsShowRegister(false)}
                  >
                    Đăng nhập
                    <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </div>
              </Form.Item>
            </motion.div>
          </Form>
        </section>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default RegisterForm;
