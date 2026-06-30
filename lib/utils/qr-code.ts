import { ERRORS, SUCCESS } from "@/lib/constants"
import { toast } from "sonner"

/**
 * Downloads the given QR code canvas as a PNG image
 */
export function downloadQRCode(
  canvas: HTMLCanvasElement | null,
  prefix = "urlpick-qr"
): boolean {
  if (!canvas) {
    toast.error(ERRORS.QR.NOT_FOUND)
    return false
  }

  const timestamp = new Date().getTime()
  const link = document.createElement("a")
  link.download = `${prefix}-${timestamp}.png`
  link.href = canvas.toDataURL("image/png")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  toast.success(SUCCESS.QR_DOWNLOADED)
  return true
}

