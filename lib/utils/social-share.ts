import { SOCIAL } from "@/lib/constants"

/**
 * Generates social sharing URLs
 */
export function getSocialShareUrl(
  platform: "twitter" | "facebook" | "linkedin",
  url: string,
  text = SOCIAL.SHARE_TEXT,
): string {
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)

  const urls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  return urls[platform]
}

/**
 * Opens a social sharing window
 */
export function shareToSocial(platform: "twitter" | "facebook" | "linkedin", url: string): void {
  const shareUrl = getSocialShareUrl(platform, url)
  window.open(shareUrl, "_blank", SOCIAL.WINDOW_FEATURES)
}

