"use client";
import { InputCustom } from "@/components/ui/input";
import { Form } from "antd";
import React from "react";
import { motion } from "framer-motion";
import BannerProduct from "@/components/BannerProduct";
import { BreadScrumb } from "@/components";

const ProductPage = () => {
  return (
    <main className="min-h-screen">
      <BannerProduct />
      <section className="container mx-auto">
        <BreadScrumb />
      </section>
    </main>
  );
};

export default ProductPage;
