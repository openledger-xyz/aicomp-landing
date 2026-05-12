import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-kinetic";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { WhatIs } from "@/components/site/WhatIs";
import { Product } from "@/components/site/Product";
import { Runtime } from "@/components/site/Runtime";
import { Ecosystem } from "@/components/site/Ecosystem";
import { Testnet } from "@/components/site/Testnet";
import { Developers } from "@/components/site/Developers";
import { Pricing } from "@/components/site/Pricing";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Dopamint — Real-time infrastructure for AI companions" },
      {
        name: "description",
        content:
          "Dopamint powers emotionally intelligent companion products: live voice, persistent identity, multimodal generation, long-session memory.",
      },
      { property: "og:title", content: "Dopamint — Real-time infrastructure for AI companions" },
      {
        property: "og:description",
        content: "Memory, voice, and persistent identity — wired into your product at runtime.",
      },
    ],
  }),
});

function Index() {
  useReveal();
  return (
    <main>
      <Navbar />
      <Hero />
      <WhatIs />
      <Product />
      <Runtime />
      <Ecosystem />
      <Developers />
      {/* <Pricing /> */}
      <Testnet />
      <FinalCTA />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
