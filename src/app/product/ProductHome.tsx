"use client";

import { useProductHome } from "@/app/product/hooks/useProductHome";
import ProductGrid from "@/components/sections/product/ProductGrid";

const ProductHome = () => {
  const { handler, state, refs } = useProductHome();

  return (
    <section className="container mx-auto" ref={refs.ref}>
      <ProductGrid
        productData={state.productData}
        title="Sản phẩm VLXD"
        subtitle="Khám phá bộ sưu tập vật liệu xây dựng chất lượng cao với giá cả cạnh tranh nhất"
        badgeText="Sản phẩm chất lượng cao"
        maxItems={9}
        userInfo={state.userInfo}
        favorites={state.favorites}
        showViewMoreButton={true}
        viewMoreHref="/product"
        viewMoreText="Xem thêm"
        onAddToCart={handler.handleAddToCart}
        onToggleFavorite={handler.handleToggleFavorite}
        loading={!state.productData}
        skeletonCount={4}
        categories={state.categories}
        scrollLeft={handler.scrollLeft}
        canScrollLeft={state.canScrollLeft}
        canScrollRight={state.canScrollRight}
        scrollRight={handler.scrollRight}
        selectedCategory={state.selectedCategory}
        indicatorRef={refs.indicatorRef}
        scrollContainerRef={refs.scrollContainerRef}
        checkScrollPosition={handler.checkScrollPosition}
        setSelectedCategory={handler.setSelectedCategory}
      />
    </section>
  );
};

export default ProductHome;
