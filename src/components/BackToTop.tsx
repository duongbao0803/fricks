"use client";
import { useEffect, useState } from "react";
import { UpOutlined } from "@ant-design/icons";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-10 right-5 flex h-12 w-12 transform items-center justify-center rounded-full bg-primary text-white shadow-lg transition-opacity duration-700 ${
          isVisible ? "animate-bounce opacity-100" : "opacity-0"
        }`}
      >
        <UpOutlined className="text-2xl" />
      </button>
    </div>
  );
};

export default BackToTop;
