import { BreadScrumb } from "@/components/common";
import Detail from "./Detail";

const ProductDetail = () => {
  const items = [
    {
      title: "Chi tiết sản phẩm",
    },
  ];
  return (
    <main className="min-h-screen">
      <section className="container mx-auto">
        <div className="my-10">
          <BreadScrumb items={items} />
        </div>
        <div className="my-5">
          {/* <ProductList /> */}
          <Detail />
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
