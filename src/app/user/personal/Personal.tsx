"use client";
import { useGetUserInfoQuery } from "@/apis/authApi";
import { useUpdateUserMutation } from "@/apis/userApi";
import { ButtonCustom } from "@/components/ui/button";
import { showToast } from "@/hooks/useShowToast";
import { getToken } from "@/hooks/useToken";
import { setUserInfo } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { Form } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AvatarUpload from "./AvatarUpload";
import PersonalInfoForm from "./PersonalInfoForm";

const Personal = () => {
  const token = getToken();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const userInfo = useSelector(
    (state: RootState) => state.persistedReducer.user.userInfo,
  );
  const { refetch } = useGetUserInfoQuery(undefined, {
    skip: !token,
  });
  const [fileChange, setFileChange] = useState<string>("");

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (userInfo) {
      const { avatar, ...restUserInfo } = userInfo;
      form.setFieldsValue({
        ...restUserInfo,
        avatar: fileChange,
        dob: restUserInfo.dob ? dayjs(restUserInfo.dob) : dayjs(),
      });
    }
  }, [fileChange, form, userInfo]);

  const handleFileChange = useCallback((newFileChange: string) => {
    setFileChange(newFileChange);
  }, []);

  const onFinish = useCallback(
    async (values: any) => {
      try {
        const updatedValues = { ...values, userId: userInfo?.id };
        const res = await updateUser(updatedValues).unwrap();
        if (res && res.httpCode === 200) {
          dispatch(setUserInfo(res.data));
          showToast("success", `${res.message}`);
          refetch();
        }
      } catch (err: any) {
        showToast("error", `${err.data.message}`);
      }
    },
    [dispatch, updateUser, userInfo?.id, refetch],
  );

  return (
    <section>
      <h1 className="mb-2">Thông tin</h1>
      <div className="mx-auto rounded-xl bg-[#fff] p-7 shadow-sm">
        <Form form={form} onFinish={onFinish}>
          <div className="grid h-full grid-cols-1 items-center justify-center gap-5 md:grid-cols-7">
            <div className="col-span-1 md:col-span-4">
              <PersonalInfoForm form={form} userInfo={userInfo} />
            </div>
            <div className="col-span-1 ml-5 mt-5 flex h-full items-center justify-center border-l-0 border-gray-100 md:col-span-3 md:border-l-2 lg:mt-0">
              <AvatarUpload
                userInfo={userInfo}
                handleFileChange={handleFileChange}
              />
            </div>
          </div>
          <div className="flex justify-center md:ml-[135px] md:block">
            <ButtonCustom className="mt-4 w-36 text-white">
              Cập nhật
            </ButtonCustom>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default Personal;
