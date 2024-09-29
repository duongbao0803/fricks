"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { NavElements } from "@/constants";

const NavElement = () => {
  const defaultPath = NavElements[0]?.path || "";

  const [delayedPath, setDelayedPath] = useState(
    () => sessionStorage.getItem("delayedPath") || defaultPath,
  );
  const [currentPath, setCurrentPath] = useState(
    () => sessionStorage.getItem("currentPath") || defaultPath,
  );
  const [sliderStyle, setSliderStyle] = useState({ width: "2px", left: "0px" });
  const navRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (currentPath !== "") {
      const timer = setTimeout(() => {
        setDelayedPath(currentPath);
        sessionStorage.setItem("delayedPath", currentPath);

        const activeIndex = NavElements.findIndex(
          (navEle) => navEle.path === currentPath,
        );

        if (navRef.current[activeIndex]) {
          const { offsetWidth, offsetLeft } = navRef.current[activeIndex];
          setSliderStyle({
            width: `${offsetWidth}px`,
            left: `${offsetLeft}px`,
          });
        }

        router.push(currentPath);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentPath, router]);

  const handleLinkClick = (path: string, index: number) => {
    setCurrentPath(path);
    sessionStorage.setItem("currentPath", path);
  };

  return (
    <nav className="relative flex flex-col gap-8 text-xl sm:text-[16px] lg:flex-row">
      {NavElements.map((navElement, index) => (
        <a
          href="#"
          key={index}
          ref={(navEle: HTMLAnchorElement | null) => {
            navRef.current[index] = navEle;
          }}
          onClick={() => handleLinkClick(navElement.path, index)}
          className={`relative z-10 ${
            navElement.path === delayedPath ? "text-secondary" : "text-gray-600"
          } transition-colors duration-300 hover:text-secondary`}
        >
          {navElement.name}
        </a>
      ))}
      <div
        className="absolute bottom-[-5px] hidden h-[3px] bg-secondary transition-transform duration-300 ease-out lg:block"
        style={{
          width: sliderStyle.width,
          transform: `translateX(${sliderStyle.left})`,
        }}
      />
    </nav>
  );
};

export default NavElement;
