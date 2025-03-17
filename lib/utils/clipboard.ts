import { ERRORS, SUCCESS } from "@/lib/constants"
import { toast } from "sonner"

/**
 * Copies text to clipboard with error handling
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    toast.success(SUCCESS.COPIED)
    return true
  } catch (error) {
    toast.error(ERRORS.CLIPBOARD.FAILED)
    return false
  }
}

