"use client";
import {
  CarouselHome,
  IntroHome,
  PostHome,
  ProductHome,
  ScrollReveal,
  Statistical,
  Subscribe,
} from "@/components";
import "./globals.css";
import "./globals.css";

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
