import { useProductHome } from "@/app/product/hooks/useProductHome";
import { CategoryScrollProps } from "@/types/product.types";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const SelectCateScrollbar = ({
  scrollLeft,
  canScrollLeft,
  scrollRight,
  canScrollRight,
  categories,
  selectedCategory,
  setSelectedCategory,
  indicatorRef,
  scrollContainerRef,
  checkScrollPosition,
}: CategoryScrollProps) => {
  return (
    <section className="mx-auto mt-14 max-w-[700px]">
      <div className="mb-2 flex justify-center space-x-2 md:hidden">
        <button
          onClick={scrollLeft}
          className={`rounded-full bg-primary p-2 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
            canScrollLeft
              ? "text-primary hover:bg-primary hover:text-white"
              : "cursor-not-allowed text-gray-300"
          }`}
          disabled={!canScrollLeft}
        >
          <IoChevronBack className="text-xl" />
        </button>
        <button
          onClick={scrollRight}
          className={`rounded-full bg-primary p-2 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
            canScrollRight
              ? "text-primary hover:bg-primary hover:text-white"
              : "cursor-not-allowed text-gray-300"
          }`}
          disabled={!canScrollRight}
        >
          <IoChevronForward
            className={`text-xl transition ${canScrollLeft ? "text-white" : "text-black"}`}
          />
        </button>
      </div>

      <div className="relative flex items-center">
        <button
          onClick={scrollLeft}
          className={`absolute -left-10 top-1/2 z-10 hidden -translate-x-4 -translate-y-1/2 rounded-full bg-primary p-2 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl md:block ${
            canScrollLeft
              ? "text-primary hover:bg-secondary hover:text-white"
              : "cursor-not-allowed !bg-gray-100 !text-black"
          }`}
          disabled={!canScrollLeft}
        >
          <IoChevronBack
            className={`text-xl transition ${canScrollLeft ? "text-white" : "text-black"}`}
          />
        </button>

        <div className="overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="scroll scrollbar-hide relative flex flex-nowrap space-x-2 overflow-x-auto px-2"
            onScroll={checkScrollPosition}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div
              ref={indicatorRef}
              className="absolute inset-0 z-[-1] mb-3 h-full rounded-md bg-primary transition-transform duration-500 ease-in-out"
            />
            {categories?.map((category, index) => (
              <div
                key={index}
                id={`category-${category.id}`}
                className={`relative flex-shrink-0 cursor-pointer p-2 transition-colors duration-500 ${
                  selectedCategory === category.id ? "text-white" : "text-black"
                }`}
                onClick={() => setSelectedCategory?.(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollRight}
          className={`absolute -right-10 top-1/2 z-10 hidden -translate-y-1/2 translate-x-4 rounded-full bg-primary p-2 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl md:block ${
            canScrollRight
              ? "text-primary hover:bg-secondary hover:text-white"
              : "cursor-not-allowed !bg-gray-100 !text-black"
          }`}
          disabled={!canScrollRight}
        >
          <IoChevronForward
            className={`text-xl transition ${canScrollRight ? "text-white" : "text-black"}`}
          />
        </button>
      </div>
    </section>
  );
};

export default SelectCateScrollbar;
