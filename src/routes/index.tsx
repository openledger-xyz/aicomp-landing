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
      { title: "Real-time infra layer for AI companions" },
      {
        name: "description",
        content:
          "Dopamint is real-time infrastructure for AI companions powering live voice, persistent identity, multimodal generation, and physical Ai embodiment.",
      },
      { property: "og:title", content: "Real-time infra layer for AI companions" },
      {
        property: "og:description",
        content: "Dopamint is real-time infrastructure for AI companions powering live voice, persistent identity, multimodal generation, and physical Ai embodiment.",
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
