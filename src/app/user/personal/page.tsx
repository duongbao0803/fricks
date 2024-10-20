"use client";
import { UploadImage } from "@/components/common";
import { ButtonCustom } from "@/components/ui/button";
import useUserInfo from "@/hooks/useUserInfo";
import moment from "moment";
import { DatePicker, Form, Input, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useUpdateUserMutation } from "@/apis/userApi";
import { GENDER } from "@/enums";
import { notify } from "@/components/common/Notification";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slices/userSlice";
import useUserSelector from "@/redux/hooks/useUserSelector";

const Personal = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // const userInfo = useSelector((state: any) => state.user.userInfo);
  const { userInfo } = useUserSelector();
  const [fileChange, setFileChange] = useState<string>("");
  const disabledDate = (current: object) => {
    return current && current > moment().startOf("day");
  };
  const [updateUser] = useUpdateUserMutation();
  const handleFileChange = useCallback((newFileChange: string) => {
    setFileChange(newFileChange);
  }, []);

  useEffect(() => {
    if (userInfo) {
      const { avatar, ...restUserInfo } = userInfo;

      form.setFieldsValue({
        ...restUserInfo,
        avatar: fileChange,
      });
    }
  }, [fileChange, form, userInfo]);

  const onFinish = async (values: any) => {
    try {
      const { dob } = values;
      const formattedDob = dob ? moment(dob).toISOString() : "";
      const userId = userInfo?.id;
      const updatedValues = { ...values, dob: formattedDob, userId };

      const res = await updateUser(updatedValues).unwrap();

      if (res && res.httpCode === 200) {
        dispatch(setUserInfo(res.data));
        notify("success", `${res.message}`, 2);
      }
    } catch (err: any) {
      notify("error", `${err.data.message}`, 3);
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
                          <Select.Option value={GENDER.MALE}>Nam</Select.Option>
                          <Select.Option value={GENDER.FEMALE}>
                            Nữ
                          </Select.Option>
                          <Select.Option value={GENDER.OTHER}>
                            Khác
                          </Select.Option>
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
                    <td className="w-[30%] align-baseline">
                      <p>
                        <span className="text-lg text-[red]">*</span> Địa chỉ:
                      </p>
                    </td>
                    <td className="w-[70%] align-baseline">
                      <Form.Item
                        name="address"
                        hasFeedback
                        className="formItem"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập địa chỉ",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Nhập địa chỉ"
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
                    titleButton="Thêm ảnh"
                    initialImage={userInfo?.avatar}
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
