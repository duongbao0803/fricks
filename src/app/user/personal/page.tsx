"use client";
import { UploadImage } from "@/components/common";
import { ButtonCustom } from "@/components/ui/button";
import useUserInfo from "@/hooks/useUserInfo";
import moment from "moment";
import dayjs from "dayjs";
import { DatePicker, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import { useUpdateUserMutation } from "@/apis/userApi";

const Personal = () => {
  const [form] = Form.useForm();
  const userInfo = useUserInfo();
  const disabledDate = (current: object) => {
    return current && current > moment().startOf("day");
  };
  const [updateUser] = useUpdateUserMutation();

  const handleFileChange = () => {
    console.log("hihi");
  };

  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue(userInfo?.userInfo);
    }
  }, [form, userInfo]);

  const onFinish = (values: any) => {
    try {
      const { dob } = values;
      console.log("check dob", dayjs(dob));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <h1 className="mb-2">Thông tin</h1>
      <div className="mx-auto rounded-xl bg-[#fff] p-7 shadow-sm">
        <Form form={form} onFinish={onFinish}>
          <div className="grid h-full grid-cols-1 items-center justify-center gap-5 md:grid-cols-7">
            <div className="col-span-1 md:col-span-4">
              <table className="h-full w-full">
                <tbody>
                  <tr>
                    <td className="w-[30%] align-baseline">
                      <p>
                        <span className="text-lg text-[red]">*</span> Email:
                      </p>
                    </td>
                    <td className="w-[70%] align-baseline">
                      <Form.Item name="email" className="formItem">
                        <Input
                          placeholder="Nhập email"
                          readOnly
                          className="p-2"
                        />
                      </Form.Item>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[30%] align-baseline">
                      <p>
                        <span className="text-lg text-[red]">*</span> Họ và tên:
                      </p>
                    </td>
                    <td className="w-[70%] align-baseline">
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
                    <td className="w-[30%] align-baseline">
                      <p>
                        <span className="text-lg text-[red]">*</span> Ngày sinh:
                      </p>
                    </td>
                    <td className="w-[70%] align-baseline">
                      <Form.Item
                        name="dob"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn ngày tháng năm sinh",
                          },
                        ]}
                        className="formItem"
                      >
                        <DatePicker
                          placeholder="Chọn ngày sinh"
                          className="w-full p-2"
                          disabledDate={disabledDate}
                          format="DD/MM/YYYY"
                          allowClear
                        />
                      </Form.Item>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[30%] align-baseline">
                      <p>
                        <span className="text-lg text-[red]">*</span> Giới tính:
                      </p>
                    </td>
                    <td className="w-[70%] align-baseline">
                      <Form.Item
                        name="gender"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn giới tính",
                          },
                        ]}
                        className="formItem"
                      >
                        <Select
                          placeholder="Chọn giới tính"
                          className="h-[39.33px]"
                        >
                          <Select.Option value="male">Nam</Select.Option>
                          <Select.Option value="female">Nữ</Select.Option>
                          <Select.Option value="other">Khác</Select.Option>
                        </Select>
                      </Form.Item>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[30%] align-baseline">
                      <p>
                        <span className="text-lg text-[red]">*</span> Số điện
                        thoại:
                      </p>
                    </td>
                    <td className="w-[70%] align-baseline">
                      <Form.Item
                        name="phoneNumber"
                        hasFeedback
                        className="formItem"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập số điện thoại",
                          },
                          {
                            pattern: /^[0-9]{10,11}$/,
                            message:
                              "Vui lòng nhập đúng số điện thoại (10-11 chữ số)",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Nhập số điện thoại"
                          className="p-2"
                          allowClear
                        />
                      </Form.Item>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[30%] align-baseline"></td>
                    <td className="w-[70%] align-baseline">
                      <ButtonCustom className="mt-4 w-36 text-white">
                        Cập nhật
                      </ButtonCustom>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-span-1 ml-5 mt-5 flex h-full items-center justify-center border-l-0 border-gray-100 md:col-span-3 md:border-l-2 lg:mt-0">
              <Form.Item
                name="avatar"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn hình ảnh",
                  },
                ]}
                className="flex w-full items-center justify-center"
              >
                <div className="flex w-full flex-col items-center">
                  <UploadImage
                    titleButton="Upload"
                    initialImage=""
                    onFileChange={handleFileChange}
                  />
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default Personal;
