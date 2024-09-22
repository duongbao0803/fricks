"use client";

import React from "react";
import LoginForm from "./login/LoginForm";
import { Carousel } from "@/components";
import Head from "next/head";

const AuthPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Xác thực</title>
        <meta name="description" content="Đăng nhập vào tài khoản của bạn." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex flex-grow bg-[hsl(0,0%,97%)]">
        <section className="container mx-auto grid h-screen flex-grow flex-row place-items-center bg-[hsl(0,0%,97%)]">
          <div className="mx-5 my-2 grid min-h-[400px] w-full max-w-[450px] grid-cols-1 overflow-hidden rounded-[30px] border-none bg-[#fff] transition-all duration-500 sm:min-w-[450px] sm:max-w-[500px] sm:border lg:grid lg:min-h-[650px] lg:max-w-[1024px] lg:grid-cols-2 lg:shadow-2xl">
            <div className="order-2 my-auto items-center overflow-hidden px-7 lg:px-16">
              <LoginForm />
            </div>
            <div className="order-1 hidden rounded-xl transition-all duration-500 lg:block">
              <Carousel />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AuthPage;
