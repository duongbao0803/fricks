"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavElements } from "@/constants";
import "@/app/globals.css";

const NavElement = () => {
  const [sliderStyle, setSliderStyle] = useState({
    width: "2px",
    left: "0px",
  });
  const navRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const activeIndex = NavElements.findIndex(
      (navEle) =>
        navEle.path === pathname ||
        (pathname.startsWith("/product") && navEle.path === "/product") ||
        (pathname.startsWith("/post") && navEle.path === "/post"),
    );

    if (activeIndex !== -1 && navRef.current[activeIndex]) {
      const { offsetWidth, offsetLeft } = navRef.current[activeIndex];
      setSliderStyle({
        width: `${offsetWidth}px`,
        left: `${offsetLeft}px`,
      });
    } else {
      setSliderStyle({
        width: "0px",
        left: "0px",
      });
    }
  }, [pathname]);

  const handleLinkClick = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="relative flex flex-col gap-8 text-xl sm:text-[16px] lg:flex-row">
      {NavElements.map((navElement, index) => (
        <a
          href={navElement.path}
          key={index}
          ref={(navEle: HTMLAnchorElement | null) => {
            navRef.current[index] = navEle;
          }}
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick(navElement.path);
          }}
          className={`group relative z-10 ${
            navElement.path === pathname ||
            (pathname.startsWith("/product") &&
              navElement.path === "/product") ||
            (pathname.startsWith("/post") && navElement.path === "/post")
              ? "text-primary"
              : "text-gray-600"
          } transition-colors duration-300 hover:text-primary`}
        >
          {navElement.name}
          <span className="absolute bottom-[-5px] left-0 h-[3px] w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
        </a>
      ))}
      <div
        className="absolute bottom-[-5px] hidden h-[3px] bg-primary transition-transform duration-300 ease-out lg:block"
        style={{
          width: sliderStyle.width,
          transform: `translateX(${sliderStyle.left})`,
        }}
      />
    </nav>
  );
};

export default NavElement;
