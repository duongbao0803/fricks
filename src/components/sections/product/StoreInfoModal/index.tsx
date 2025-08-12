import { InputCustom } from "@/components/ui/input";
import { showToast } from "@/hooks/useShowToast";
import { StoreInfo } from "@/types/store.types";
import { Form, Image, Input, Modal } from "antd";
import React, { useEffect } from "react";

export interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  store?: StoreInfo;
}

const StoreInfoModal: React.FC<AddModalProps> = (props) => {
  // const { addNewUserItem } = useUserService();
  const { TextArea } = Input;

  const { setIsOpen, isOpen, store } = props;
  const [form] = Form.useForm();
  const userForm = sessionStorage.getItem("form");
  // const userForm = sessionStorage.getItem("form");
  // const data = JSON.parse(userForm ?? "");

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue(store);
    }
  }, [isOpen, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (values) {
        sessionStorage.setItem("form", JSON.stringify(values));
        showToast("success", "Cập nhật thông tin thành công");
        setIsOpen(false);
      }
    } catch (err) {
      setIsOpen(true);
      console.error("Validation failed:", err);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      title={<p className="text-xl font-bold text-[red]">Thông tin liên hệ</p>}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Hủy"
      footer={null}
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
          name="name"
          colon={true}
          labelCol={{ span: 24 }}
          className="formItem mb-7"
        >
          <InputCustom placeholder="Cửa hàng" readOnly />
        </Form.Item>
        <Form.Item
          name="accountName"
          colon={true}
          labelCol={{ span: 24 }}
          className="formItem mb-7"
        >
          <InputCustom placeholder="Tên người quản lý" readOnly />
        </Form.Item>
        <Form.Item
          name="managerEmail"
          colon={true}
          labelCol={{ span: 24 }}
          className="formItem mb-7"
        >
          <InputCustom placeholder="Email người quản lý" readOnly />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          colon={true}
          labelCol={{ span: 24 }}
          className="formItem mb-7"
        >
          <InputCustom placeholder="Số điện thoại" readOnly />
        </Form.Item>
        <Form.Item
          name="address"
          colon={true}
          labelCol={{ span: 24 }}
          className="formItem mb-7"
        >
          <InputCustom placeholder="Địa chỉ" readOnly />
        </Form.Item>
        <Image width={100} height={100} src={store?.image} alt="avatar-store" />
      </Form>
    </Modal>
  );
};

export default React.memo(StoreInfoModal);
