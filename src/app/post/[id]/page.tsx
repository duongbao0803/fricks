import { BreadScrumb } from "@/components/common";

const PostDetail = () => {
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
        <div className="my-16">chi tiết</div>
      </section>
    </main>
  );
};

export default PostDetail;
