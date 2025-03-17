"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

export default function AdBanner({ className }: { className?: string }) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (adRef.current && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error("Ad error:", err);
    }
  }, []);

  return (
    <div className={cn("overflow-hidden rounded-lg", className)}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7004859261139401"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
