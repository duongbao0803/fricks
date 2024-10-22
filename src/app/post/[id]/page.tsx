"use client";
import { useGetDetailPostQuery } from "@/apis/postApi";
import { BreadScrumb } from "@/components/common";
import { Spin } from "antd";
import parse from "html-react-parser";
import Image from "next/image";
import { useParams } from "next/navigation";
import PostDetail from "./Detail";

const PostDetailPage = () => {
  const items = [
    {
      title: "Chi tiết bài viết",
    },
  ];

  return (
    <main className="min-h-screen">
      <section className="container mx-auto">
        <div className="my-10">
          <BreadScrumb items={items} />
        </div>
        <div className="my-10">
          <PostDetail />
        </div>
      </section>
    </main>
  );
};

export default PostDetailPage;
