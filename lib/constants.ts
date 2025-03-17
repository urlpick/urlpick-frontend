/**
 * Application-wide constants
 */

// API
export const API = {
  BASE_URL: "https://urlpick-api.injun.dev/api/v1",
  ENDPOINTS: {
    URLS: "/urls",
  },
  TURNSTILE_SITE_KEY: "0x4AAAAAAA898peEGRrOROAr",
}

// UI
export const UI = {
  COUNTDOWN_SECONDS: 5,
  ANIMATION: {
    DURATION: 300,
  },
}

// Social sharing
export const SOCIAL = {
  PLATFORMS: {
    TWITTER: "twitter",
    FACEBOOK: "facebook",
    LINKEDIN: "linkedin",
  },
  SHARE_TEXT: "Check out this link!",
  WINDOW_FEATURES: "width=600,height=400",
}

// Error messages
export const ERRORS = {
  URL: {
    EMPTY: "Please enter a URL",
    INVALID: "Please enter a valid URL",
  },
  CAPTCHA: {
    MISSING: "Please complete the CAPTCHA verification",
    FAILED: "CAPTCHA verification failed",
    EXPIRED: "CAPTCHA expired, please try again",
  },
  CLIPBOARD: {
    FAILED: "Failed to copy to clipboard",
  },
  QR: {
    NOT_FOUND: "QR code canvas not found",
  },
  API: {
    DEFAULT: "Something went wrong",
    REDIRECT: "Failed to retrieve the original URL",
    SHORTEN: "Failed to shorten URL. Please try again.",
  },
}

// Success messages
export const SUCCESS = {
  URL_SHORTENED: "URL successfully shortened!",
  COPIED: "Copied to clipboard!",
  QR_DOWNLOADED: "QR code downloaded successfully!",
}

