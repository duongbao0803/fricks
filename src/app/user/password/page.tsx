import ChangePasswordForm from "./ChangePasswordForm";

const ChangePasswordPage = () => {
  return (
    <main>
      <h1 className="mb-2">Đổi mật khẩu</h1>
      <div className="mx-auto rounded-xl bg-[#fff] p-7 shadow-sm lg:px-16">
        <ChangePasswordForm />
      </div>
    </main>
  );
};

export default ChangePasswordPage;
