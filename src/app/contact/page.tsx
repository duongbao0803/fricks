"use client";
import React from "react";
import Map from "./Map";
import FormContact from "./FormContact";
import { BreadScrumb } from "@/components/common";

const ContactPage = () => {
  const items = [
    {
      title: "Liên hệ",
    },
  ];
  return (
    <main className="container mx-auto min-h-screen px-4 py-12">
      <div className="mb-5">
        <BreadScrumb items={items} />
      </div>

      <Map />
      <FormContact />
    </main>
  );
};

export default ContactPage;
