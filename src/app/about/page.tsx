"use client";
import Header from "~/components/header";
import { useState } from "react";
const About: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="grid place-items-center p-10">
        <h1 className="font-bold text-5xl mb-10">About</h1>
        <div className=" mx-20">
          This website is built with Next.js Commerce, which is a ecommerce
          template for creating a headless Shopify storefront.
          <ul>Support for real-world commerce features including:</ul>{" "}
          <li>Out of stocks</li> <li>Order history</li>
          <li>
            Order status Cross variant / option availability (aka. Amazon style)
          </li>
          <li>
            Hidden products Dynamically driven content and features via Shopify
            (ie. collections, menus, pages, etc.)
          </li>{" "}
          <li>Seamless and secure checkout via Shopify Checkout </li>
          <li>And more!</li>
          <p>
            This template also allows us to highlight newer Next.js features
            including: Next.js App Router Optimized for SEO using Next.js&apos;s
            Metadata React Server Components (RSCs) and Suspense Server Actions
            for mutations Edge runtime New Next.js 13 fetching and caching
            paradigms Dynamic OG images Styling with Tailwind CSS Automatic
            light/dark mode based on system settings And more!
          </p>
          <p>This document was last updated on July 18, 2023.</p>
        </div>
      </div>
    </div>
  );
};
export default About;
