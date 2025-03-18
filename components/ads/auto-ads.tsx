"use client";
import Script from "next/script";

export default function AutoAds() {
  return (
    <>
      <Script
        id="adsense-auto-ads"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7004859261139401"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
}
