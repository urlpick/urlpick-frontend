/** @type {import('next').NextConfig} */

// Enforced Content-Security-Policy. Allowlist built from a live network capture
// of the running site (AdSense + Funding Choices, Turnstile, Cloudflare, the API)
// plus the documented rotating Google ad domains, then verified in a real browser.
// script-src keeps 'unsafe-inline'/'unsafe-eval' because Cloudflare Rocket Loader
// injects inline scripts and AdSense requires eval; img-src stays broad because ad
// creatives load from arbitrary advertiser hosts.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com https://*.googleadservices.com https://*.googletagservices.com https://*.gstatic.com https://*.adtrafficquality.google https://challenges.cloudflare.com https://*.challenges.cloudflare.com https://*.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://urlpick-api.injun.dev https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com https://*.googleadservices.com https://*.gstatic.com https://*.2mdn.net https://*.adtrafficquality.google https://challenges.cloudflare.com https://*.challenges.cloudflare.com https://*.cloudflareinsights.com",
  "frame-src 'self' blob: https://challenges.cloudflare.com https://*.challenges.cloudflare.com https://*.doubleclick.net https://*.google.com https://*.googlesyndication.com https://*.googleadservices.com https://*.2mdn.net https://*.adtrafficquality.google",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "@heroicons/react"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
