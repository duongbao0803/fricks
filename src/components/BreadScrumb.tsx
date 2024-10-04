import React from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

const BreadScrumb: React.FC = () => (
  <Breadcrumb
    items={[
      {
        href: "/",
        title: <HomeOutlined />,
      },
      // {
      //   href: "",
      //   title: (
      //     <>
      //       <UserOutlined />
      //       <span>Application List</span>
      //     </>
      //   ),
      // },
      {
        title: "Sản phẩm",
      },
    ]}
  />
);

export default React.memo(BreadScrumb);
