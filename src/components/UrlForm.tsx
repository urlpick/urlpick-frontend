import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  ClipboardDocumentIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";
import Turnstile from "react-turnstile";

declare global {
  interface Window {
    turnstile: {
      reset: (widgetId?: string) => void;
    };
  }
}

interface UrlResponse {
  short_url: string;
  original_url: string;
  created_at: string;
}

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<UrlResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !token) {
      toast.error("Please complete the CAPTCHA");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://urlpick-api.injun.dev/api/v1/urls",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url,
            turnstile_token: token,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to shorten URL");

      const data = await response.json();
      setResult(data);
      setUrl("");
      setToken(null);

      if (window.turnstile) {
        window.turnstile.reset();
      }

      toast.success("URL successfully shortened!");
    } catch (error) {
      toast.error("Failed to shorten URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const downloadQR = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) {
      toast.error("QR code canvas not found");
      return;
    }

    const timestamp = new Date().getTime();
    const link = document.createElement("a");
    link.download = `qrcode-${timestamp}.png`;
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR code downloaded successfully!");
  };

  const shareToSocial = (platform: "twitter" | "facebook" | "linkedin") => {
    if (!result) return;

    const url = encodeURIComponent(result.short_url);
    const text = encodeURIComponent("Check out this link!");

    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Shorten Your Links
        </h1>
        <p className="text-lg text-gray-600">
          Create short links, QR codes, and track your links with URLPick
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your long URL here"
            className="input flex-1"
            required
          />
          <button
            type="submit"
            disabled={isLoading || !url || !token}
            className="btn btn-primary min-w-[120px]"
          >
            {isLoading ? (
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
            ) : (
              "Shorten"
            )}
          </button>
        </div>

        <div className="flex justify-center">
          <Turnstile
            id="my-widget"
            sitekey="0x4AAAAAAA898peEGRrOROAr"
            onVerify={(token) => setToken(token)}
            onError={() => {
              setToken(null);
              toast.error("CAPTCHA verification failed");
            }}
            onExpire={() => {
              setToken(null);
              toast.error("CAPTCHA expired, please try again");
            }}
            theme="light"
            className="mx-auto"
          />
        </div>
      </form>

      {result && (
        <div className="card space-y-6 animate-fade-in">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Short URL
            </h2>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={result.short_url}
                readOnly
                className="input"
              />
              <button
                onClick={() => copyToClipboard(result.short_url)}
                className="btn btn-secondary"
                aria-label="Copy to clipboard"
              >
                <ClipboardDocumentIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">QR Code</h2>
            <div className="flex flex-col items-center gap-4">
              <QRCodeCanvas
                value={result.short_url}
                size={200}
                level="H"
                includeMargin
                className="bg-white p-2 rounded-lg"
              />
              <button onClick={downloadQR} className="btn btn-secondary w-full">
                Download QR Code
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">Share</h2>
            <div className="flex gap-2">
              <button
                onClick={() => shareToSocial("twitter")}
                className="btn btn-secondary flex-1"
              >
                Twitter
              </button>
              <button
                onClick={() => shareToSocial("facebook")}
                className="btn btn-secondary flex-1"
              >
                Facebook
              </button>
              <button
                onClick={() => shareToSocial("linkedin")}
                className="btn btn-secondary flex-1"
              >
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
