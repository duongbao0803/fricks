"use client";
import { ButtonCustom } from "@/components/ui/button";
import useUserInfo from "@/hooks/useUserInfo";
import { Form, Input, Spin } from "antd";
import React, { useEffect } from "react";
import { useValidateFieldsMatch } from "@/hooks/useValidateFieldMatch";
import { notify } from "@/components/common/Notification";
import { useChangePasswordMutation } from "@/apis/authApi";

const Personal = () => {
  const [form] = Form.useForm();
  const { userInfo, isLoading } = useUserInfo();
  const { validateFieldsMatch } = useValidateFieldsMatch(form);
  const [changePassword] = useChangePasswordMutation();

  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue(userInfo?.userInfo);
    }
  }, [form, userInfo]);

  if (isLoading) {
    return <Spin fullscreen tip="Đang chờ..."></Spin>;
  }

  const onFinish = async (values: any) => {
    try {
      const res = await changePassword(values).unwrap();
      if (res && res.httpCode == 200) {
        notify("success", `${res.message}`, 2);
        form.resetFields();
      }
    } catch (err: any) {
      notify("error", `${err.data.message}`, 3);
    }
  };

  return (
    <section>
      <h1 className="mb-2">Đổi mật khẩu</h1>
      <div className="mx-auto rounded-xl bg-[#fff] p-7 shadow-sm lg:px-16">
        <Form form={form} onFinish={onFinish}>
          <table className="h-full w-full">
            <tbody>
              <tr>
                <td className="w-[20%] align-baseline">
                  <p>
                    <span className="text-lg text-[red]">*</span> Mật khẩu cũ:
                  </p>
                </td>
                <td className="w-[80%] align-baseline">
                  <Form.Item
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu cũ",
                      },
                    ]}
                    name="oldPassword"
                    className="formItem"
                  >
                    <Input placeholder="Mật khẩu cũ" className="p-2" />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td className="w-[20%] align-baseline">
                  <p>
                    <span className="text-lg text-[red]">*</span> Mật khẩu mới:
                  </p>
                </td>
                <td className="w-[80%] align-baseline">
                  <Form.Item
                    name="newPassword"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu mới",
                      },
                    ]}
                    className="formItem"
                  >
                    <Input
                      placeholder="Mật khẩu mới"
                      className="p-2"
                      allowClear
                    />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td className="w-[20%] align-baseline">
                  <p>
                    <span className="text-lg text-[red]">*</span> Xác nhận mật
                    khẩu:
                  </p>
                </td>
                <td className="w-[80%] align-baseline">
                  <Form.Item
                    name=""
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng xác nhận mật khẩu",
                      },
                      {
                        validator: validateFieldsMatch(
                          "newPassword",
                          "Mật khẩu xác nhận không trùng khớp",
                        ),
                      },
                    ]}
                    className="formItem"
                  >
                    <Input
                      placeholder="Nhập họ và tên"
                      className="p-2"
                      allowClear
                    />
                  </Form.Item>
                </td>
              </tr>

              <tr>
                <td className="w-[20%] align-baseline"></td>
                <td className="w-[80%] align-baseline">
                  <ButtonCustom className="mt-4 w-36 text-white">
                    Cập nhật
                  </ButtonCustom>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </div>
    </section>
  );
};

export default Personal;
