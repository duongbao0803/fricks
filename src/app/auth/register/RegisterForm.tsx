"use client";

import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Form, Spin, notification } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import { InputCustom } from "@/components/ui/input";
import { ButtonCustom } from "@/components/ui/button";
import { notify } from "@/components/Notification";
import LoginForm from "@/app/auth/login/LoginForm";

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

  const onFinish = () => {
    if (!captchaVerified) {
      notify(
        "warning",
        "reCAPTCHA không hợp lệ",
        "Vui lòng xác nhận reCAPTCHA",
        3,
      );
      return;
    }

    setIsSigningUp(true);
    setTimeout(() => {
      setIsSigningUp(false);
      notify(
        "success",
        "Đăng ký thành công",
        "Tài khoản của bạn đã được tạo thành công.",
        3,
      );
      form.resetFields();
    }, 2000);
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
              className="mb-9"
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
