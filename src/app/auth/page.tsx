import React from "react";
// import Signup from "./Signup";
// import ForgotPasswordForm from "./ForgotPassword";
import Signin from "@/components/Signin";
import CarouselDemo from "@/components/Carousel";

const AuthPage: React.FC = () => {
  return (
    <section className="mx-auto flex-row container grid min-h-screen place-items-center bg-[hsl(0,0%,97%)]">
      <div className=" mx-5 grid min-h-[650px] grid-cols-1 overflow-hidden transition-all duration-500 rounded-[30px] border-none bg-transparent sm:border sm:bg-[#fff] lg:shadow-2xl max-w-[450px] lg:grid lg:max-w-[1024px] lg:grid-cols-2">
        <div className="order-2 my-auto items-center px-16">
          <Signin />
        </div>
        <div className="order-1 hidden rounded-xl lg:block transition-all duration-500">
          <CarouselDemo />
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
