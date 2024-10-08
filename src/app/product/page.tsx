import BannerProduct from "@/components/BannerProduct";
import { BreadScrumb } from "@/components/common";
import { ProductList } from "@/components";

const ProductPage = () => {
  const items = [
    {
      title: "Sản phẩm",
    },
  ];

  return (
    <main className="min-h-screen">
      <BannerProduct />
      <section className="container mx-auto">
        <div className="my-10">
          <BreadScrumb items={items} />
        </div>
        <div className="my-16">
          <ProductList />
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
