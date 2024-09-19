import React from "react";
// import Signup from "./Signup";
// import ForgotPasswordForm from "./ForgotPassword";
import CarouselDemo from "@/components/Carousel";
import LoginForm from "./login/LoginForm";

const AuthPage: React.FC = () => {
  return (
    <section className="container mx-auto grid min-h-screen flex-grow flex-row place-items-center bg-[hsl(0,0%,97%)]">
      <div className="mx-5 my-2 grid min-h-[650px] w-full max-w-[450px] grid-cols-1 overflow-hidden rounded-[30px] border-none bg-[#fff] transition-all duration-500 sm:min-w-[450px] sm:max-w-[500px] sm:border lg:grid lg:max-w-[1024px] lg:grid-cols-2 lg:shadow-2xl">
        <div className="order-2 my-auto items-center overflow-hidden px-7 lg:px-16">
          <LoginForm />
        </div>
        <div className="order-1 hidden rounded-xl transition-all duration-500 lg:block">
          <CarouselDemo />
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
