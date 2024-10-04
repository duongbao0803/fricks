"use client";
import React from "react";
import BannerProduct from "@/components/BannerProduct";
import { BreadScrumb } from "@/components";

const ProductPage = () => {
  return (
    <main className="min-h-screen">
      <BannerProduct />
      <section className="container mx-auto">
        <div className="mt-5">
          <BreadScrumb />
        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-1">hihih</div>
          <div className="col-span-2">hihih</div>
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
