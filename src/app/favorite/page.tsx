import React from "react";

import { BannerCustom, BreadScrumb } from "@/components/common";
import FavoriteTable from "./FavoriteTable";

const ContactPage = () => {
  const items = [
    {
      title: "Danh sách yêu thích",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fff]">
      <BannerCustom title="Danh sách yêu thích" />
      <div className="container mx-auto my-5">
        <div className="my-10">
          <BreadScrumb items={items} />
        </div>
        <div>
          <FavoriteTable />
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
