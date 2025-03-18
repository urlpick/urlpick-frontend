"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

export default function AdBanner({ className }: { className?: string }) {
  const adRef = useRef<HTMLModElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adFailed, setAdFailed] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!adLoaded) {
        setAdFailed(true);
      }
    }, 3000);

    try {
      if (adRef.current && window.adsbygoogle) {
        window.adsbygoogle.push({});

        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
              setAdLoaded(true);
              clearTimeout(timeoutId);
              observer.disconnect();
              break;
            }
          }
        });

        observer.observe(adRef.current, { childList: true, subtree: true });
      }
    } catch (err) {
      console.error("Ad error:", err);
      setAdFailed(true);
      clearTimeout(timeoutId);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [adLoaded]);

  if (adFailed) {
    return null;
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg transition-opacity duration-300",
        !adLoaded && "h-0 opacity-0",
        adLoaded && "opacity-100",
        className
      )}
    >
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
