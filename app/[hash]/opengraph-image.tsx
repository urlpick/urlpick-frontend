import { ImageResponse } from "next/og";
import { urlService } from "@/lib/api/url-service";

export const runtime = "edge";
export const alt = "URLPick - Secure URL Shortener";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image({ params }: { params: { hash: string } }) {
  try {
    // Try to fetch the original URL
    const data = await urlService.fetchOriginalUrl(params.hash);
    const originalUrl = data.original_url;

    // Extract domain from original URL
    let domain = "";
    try {
      const url = new URL(originalUrl);
      domain = url.hostname;
    } catch (e) {
      domain = "website";
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#ffffff",
            position: "relative",
          }}
        >
          {/* Background with subtle gradient */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(to bottom right, #f8fafc, #f1f5f9)",
              zIndex: 0,
            }}
          />

          {/* Logo and content container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
              padding: "40px",
              textAlign: "center",
              gap: "20px",
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginRight: "16px" }}
              >
                <path
                  fillRule="evenodd"
                  d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z"
                  fill="#3b82f6"
                />
              </svg>

              {/* Gradient text for logo */}
              <div
                style={{
                  fontSize: "64px",
                  fontWeight: "bold",
                  backgroundImage:
                    "linear-gradient(to right, #3b82f6, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  display: "flex",
                  zIndex: 0,
                }}
              >
                URLPick
              </div>
            </div>

            {/* Main heading */}
            <div
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#0f172a",
                marginBottom: "10px",
                display: "flex",
              }}
            >
              Secure Redirect Service
            </div>

            {/* Subheading with domain */}
            <div
              style={{
                fontSize: "24px",
                color: "#475569",
                marginBottom: "30px",
                display: "flex",
              }}
            >
              You're being redirected to {domain}
            </div>

            {/* Security badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 24px",
                background: "#f1f5f9",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginRight: "12px" }}
              >
                <path
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="#16a34a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "medium",
                  color: "#16a34a",
                  display: "flex",
                }}
              >
                Verified Secure Link
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              position: "absolute",
              bottom: "30px",
              fontSize: "16px",
              color: "#64748b",
              display: "flex",
            }}
          >
            URLPick • Professional URL Shortening Service
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    // Fallback image if there's an error
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#ffffff",
            background: "linear-gradient(to bottom right, #f8fafc, #f1f5f9)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              style={{ marginRight: "16px" }}
            >
              <path
                fillRule="evenodd"
                d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z"
                fill="#3b82f6"
              />
            </svg>

            {/* Gradient text for logo in fallback page */}
            <div
              style={{
                fontSize: "64px",
                fontWeight: "bold",
                backgroundImage: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                display: "flex",
                zIndex: 0,
              }}
            >
              URLPick
            </div>
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#0f172a",
              marginBottom: "20px",
              display: "flex",
            }}
          >
            Professional URL Shortener
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#475569",
              display: "flex",
            }}
          >
            Create short, memorable links for your business
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
