import React from "react";

import { BreadScrumb } from "@/components/common";
import PostList from "./PostList";

const PagePost = () => {
  const items = [
    {
      title: "Bài viết",
    },
  ];
  return (
    <main className="container mx-auto min-h-screen px-4 py-12">
      <div className="mb-5">
        <BreadScrumb items={items} />
      </div>
      <div>
        <PostList></PostList>
      </div>
    </main>
  );
};

export default PagePost;
