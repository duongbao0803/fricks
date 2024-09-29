"use client";
import {
  CarouselHome,
  IntroHome,
  PostHome,
  ProductHome,
  Statistical,
  Subscribe,
} from "@/components";
import { ScrollReveal } from "@/components/ScrollReveal";
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
