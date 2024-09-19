"use client";

import React, { useState } from "react";
import { Form, Spin } from "antd";
import { motion } from "framer-motion";
import { LoadingOutlined } from "@ant-design/icons";

import { InputCustom } from "@/components/ui/input";
import RegisterForm from "../register/RegisterForm";
import { ButtonCustom } from "@/components/ui/button";
import { notify } from "@/components/Notification";

interface IProps {
  isShowRegister: boolean;
  setIsShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPasswordForm: React.FC<IProps> = ({
  isShowRegister,
  setIsShowRegister,
}) => {
  const [isSending, setIsSending] = useState(false);
  const [form] = Form.useForm();
  const [isError, setIsError] = useState(false);

  const onFinish = () => {
    setIsSending(true);
    notify(
      "success",
      "Gửi thành công",
      "Vui lòng kiểm tra hòm thư để lấy lại mật khẩu",
      30,
    );
    setTimeout(() => {
      setIsSending(false);
    }, 30000);
  };

  return (
    <>
      {!isShowRegister ? (
        <section className="py-5">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="mb-5 text-center text-4xl font-bold uppercase text-primary">
              Quên mật khẩu
            </h1>
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
              transition={{ duration: 1 }}
            >
              <Form.Item
                name="password"
                id="formItem"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email của bạn",
                  },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters",
                  },
                ]}
                labelCol={{ span: 24 }}
                className="formItem"
              >
                <InputCustom
                  placeholder="Email"
                  className="hover:border-primary focus:border-primary"
                  autoFocus
                />
              </Form.Item>
            </motion.div>
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
              className="mt-8"
            >
              <Form.Item noStyle>
                <ButtonCustom className="mx-auto flex h-11 w-full items-center rounded-[5px] bg-primary text-lg tracking-wider text-white hover:bg-primary/80">
                  {isSending ? (
                    <Spin
                      indicator={<LoadingOutlined className="text-[#fff]" />}
                    />
                  ) : (
                    "Gửi"
                  )}
                </ButtonCustom>
              </Form.Item>

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
          </Form>
        </section>
      ) : (
        <RegisterForm
          isShowRegister={false}
          setIsShowRegister={function (
            value: React.SetStateAction<boolean>,
          ): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
    </>
  );
};

export default ForgotPasswordForm;
