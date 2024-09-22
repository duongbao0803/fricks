import React, { useState } from "react";
import { Form, Spin } from "antd";
import { motion } from "framer-motion";
import { LoadingOutlined } from "@ant-design/icons";
import { InputCustom } from "@/components/ui/input";
import RegisterForm from "@/app/auth/register/RegisterForm";
import { ButtonCustom } from "@/components/ui/button";
import { notify } from "@/components/Notification";
import {
  Drawer,
  DrawerClose,
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
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const onFinish = () => {
    setIsSending(true);
    notify("success", "Vui lòng kiểm tra hòm thư để lấy lại mật khẩu", 1);

    setTimeout(() => {
      setIsSending(false);
      setIsDrawerVisible(true);
    }, 1000);
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
            <h1 className="mb-5 text-center text-2xl font-bold uppercase text-primary transition-all duration-500 sm:text-3xl md:text-4xl">
              Quên mật khẩu
            </h1>
          </motion.div>
          <Form form={form} onFinish={onFinish} className="login-form">
            <motion.div
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email của bạn" },
                  { type: "email", message: "Vui lòng nhập đúng kiểu email" },
                ]}
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
              <Drawer
                open={isDrawerVisible}
                onClose={() => setIsDrawerVisible(false)}
              >
                <DrawerTrigger asChild>
                  <Form.Item noStyle>
                    <ButtonCustom className="mx-auto flex h-11 w-full items-center rounded-[5px] bg-primary text-lg tracking-wider text-white hover:bg-primary/80">
                      {isSending ? (
                        <Spin
                          indicator={
                            <LoadingOutlined className="text-[#fff]" />
                          }
                        />
                      ) : (
                        "Gửi"
                      )}
                    </ButtonCustom>
                  </Form.Item>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle className="text-2xl">
                        Nhập mã OTP
                      </DrawerTitle>
                      <DrawerDescription className="text-[#a3a1a1]">
                        Nhập mã OTP đã gửi đến email của bạn.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="pb-0">
                      <div className="flex items-center justify-center space-x-2 px-5">
                        <InputOTP maxLength={6} className="px-5">
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
                      <ButtonCustom className="mx-auto flex h-11 w-full items-center rounded-[5px] bg-primary text-sm tracking-wider text-white hover:bg-primary/80">
                        Khôi phục
                      </ButtonCustom>
                      <DrawerClose asChild>
                        <ButtonCustom className="mx-auto block h-11 w-full rounded-[5px] border border-gray-300 bg-[#fff] shadow-none hover:!border-primary hover:!bg-transparent hover:!text-primary">
                          Gửi lại
                        </ButtonCustom>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>

              <div className="mt-3 text-center text-sm">
                <span className="text-black">Bạn không có tài khoản?</span>{" "}
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
          setIsShowRegister={setIsShowRegister}
        />
      )}
    </>
  );
};

export default ForgotPasswordForm;
