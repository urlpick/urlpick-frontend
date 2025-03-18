"use client";
import Script from "next/script";

export default function GoogleAdsense() {
  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const script = document.createElement('script');
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7004859261139401';
            script.async = true;
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
          })();
        `,
      }}
    />
  );
}
