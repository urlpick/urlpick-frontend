/** @type {import('next').NextConfig} */

// Script-execution-independent directives only, so AdSense / Turnstile /
// Cloudflare Rocket Loader are unaffected while still blocking object/base
// injection, clickjacking, and form hijacking. Resource directives
// (script/connect/frame/default-src) are intentionally omitted: enforcing them
// blocks Turnstile's blob: web worker and breaks the CAPTCHA.
const cspEnforced = [
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
            value: cspEnforced,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
