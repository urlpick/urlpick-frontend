/** @type {import('next').NextConfig} */

// Enforced now: only directives that never touch script execution, so AdSense /
// Turnstile / Cloudflare Rocket Loader are unaffected while still blocking
// object/base injection, clickjacking, and form hijacking.
const cspEnforced = [
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

// Report-Only: full resource allowlist built from the live network capture
// (AdSense, Funding Choices, Turnstile, Cloudflare Insights, the API). Observed,
// not enforced, so it can be tightened from real violation reports before being
// promoted. script-src keeps 'unsafe-inline'/'unsafe-eval' because Cloudflare
// Rocket Loader injects inline scripts and AdSense requires eval.
const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.google.com https://*.adtrafficquality.google https://challenges.cloudflare.com https://static.cloudflareinsights.com https://fundingchoicesmessages.google.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://urlpick-api.injun.dev https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://*.adtrafficquality.google https://fundingchoicesmessages.google.com https://challenges.cloudflare.com https://static.cloudflareinsights.com",
  "frame-src 'self' blob: https://challenges.cloudflare.com https://googleads.g.doubleclick.net https://*.adtrafficquality.google https://www.google.com https://fundingchoicesmessages.google.com",
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
          {
            key: "Content-Security-Policy-Report-Only",
            value: cspReportOnly,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
