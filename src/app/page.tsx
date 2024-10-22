"use client";
import {
  CarouselHome,
  IntroHome,
  ScrollReveal,
  Statistical,
  Subscribe,
} from "@/components";
import "./globals.css";
import PostHome from "./post/PostHome";
import ProductHome from "./product/ProductHome";

export default function Home() {
  return (
    <main className="min-h-screen">
      <CarouselHome />
      <ProductHome />
      <ScrollReveal>
        <IntroHome />
      </ScrollReveal>

      <ScrollReveal>
        <Statistical />
      </ScrollReveal>

      <ScrollReveal>
        <PostHome />
      </ScrollReveal>

      <ScrollReveal>
        <Subscribe />
      </ScrollReveal>
    </main>
  );
}
