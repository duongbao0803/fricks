import React, { useCallback, useEffect, useState } from "react";
import { Modal, Form, Input, Select, Col, Row } from "antd";
import { ProductInfo } from "@/types/product.types";
import { InputCustom } from "@/components/ui/input";
import { UserInfo } from "@/types/personal.types";

export interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  userInfo?: UserInfo;
}

const InfoModal: React.FC<AddModalProps> = (props) => {
  // const { addNewUserItem } = useUserService();
  const { setIsOpen, isOpen, userInfo } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [fileChange, setFileChange] = useState<string>("");
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;

  useEffect(() => {
    if (isOpen && userInfo) {
      form.setFieldsValue({
        email: userInfo.email,
        fullName: userInfo.fullName,
        address: userInfo.address,
        phoneNumber: userInfo.phoneNumber,
      });
    }
  }, [isOpen, userInfo, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // setIsConfirmLoading(true);
      // setTimeout(async () => {
      //   try {
      //     await handleAddPost(values);
      //     form.resetFields();
      //     setIsConfirmLoading(false);
      //     setIsOpen(false);
      //   } catch (error) {
      //     setIsConfirmLoading(false);
      //     setIsOpen(true);
      //   }
      // }, 1500);
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title={<p className="text-xl font-bold text-[red]">Thông tin liên hệ</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
      okButtonProps={{
        style: {
          backgroundColor: "#ff7b29",
          borderColor: "#ff7b29",
          color: "white",
          padding: "0 20px",
        },
      }}
    >
      <Form name="normal_login" className="login-form mt-5" form={form}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email",
            },
          ]}
          colon={true}
          labelCol={{ span: 24 }}
          className="formItem mb-7"
        >
          <InputCustom placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ và tên",
            },
          ]}
          colon={true}
          labelCol={{ span: 24 }}
          className="formItem mb-7"
        >
          <InputCustom placeholder="Họ và tên" />
        </Form.Item>

        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ",
            },
          ]}
          colon={true}
          labelCol={{ span: 24 }}
          className="formItem mb-7"
        >
          <InputCustom placeholder="Địa chỉ" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại",
            },
            {
              min: 10,
              max: 10,
              message: "Số điện thoại phải có 10 số",
            },
          ]}
          colon={true}
          labelCol={{ span: 24 }}
          className="formItem mb-7"
        >
          <InputCustom placeholder="Số điện thoại" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(InfoModal);
