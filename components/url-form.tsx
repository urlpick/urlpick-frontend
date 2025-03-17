"use client";

import type React from "react";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Turnstile from "react-turnstile";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowPathIcon,
  ClipboardDocumentIcon,
  QrCodeIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

interface UrlResponse {
  short_url: string;
  original_url: string;
  created_at: string;
}

declare global {
  interface Window {
    turnstile: {
      reset: (widgetId?: string) => void;
    };
  }
}

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<UrlResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("link");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    if (!token) {
      toast.error("Please complete the CAPTCHA verification");
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to shorten URL");
      }

      const data = await response.json();
      setResult(data);
      setUrl("");
      setToken(null);
      setActiveTab("link");

      if (window.turnstile) {
        window.turnstile.reset();
      }

      toast.success("URL successfully shortened!");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to shorten URL. Please try again."
      );
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
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          <h1 className="text-5xl font-bold mb-2">URLPick</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Create short links, QR codes, and track your links with URLPick
        </p>
      </div>

      <Card className="shadow-lg glass-card card-glow overflow-hidden">
        <CardHeader className="pb-4 border-b border-border/30">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Shorten Your Link
          </CardTitle>
          <CardDescription>
            Enter a long URL to create a shortened version
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your long URL here"
                className="flex-1 h-12 px-4 rounded-lg border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                required
              />
              <Button
                type="submit"
                disabled={isLoading || !url || !token}
                className="min-w-[120px] h-12 rounded-lg font-medium btn-shine"
              >
                {isLoading ? (
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                ) : (
                  "Shorten"
                )}
              </Button>
            </div>

            <div className="flex justify-center mt-4">
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
                theme="auto"
                className="mx-auto"
              />
            </div>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="shadow-lg glass-card card-glow animate-in slide-up duration-300">
          <CardHeader className="pb-4 border-b border-border/30">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Your Shortened URL
            </CardTitle>
            <CardDescription>
              Use the tabs below to access different sharing options
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-6 p-1 bg-background/80 backdrop-blur-sm rounded-lg">
                <TabsTrigger
                  value="link"
                  className="flex items-center gap-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm"
                >
                  <ClipboardDocumentIcon className="h-4 w-4" />
                  Link
                </TabsTrigger>
                <TabsTrigger
                  value="qr"
                  className="flex items-center gap-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm"
                >
                  <QrCodeIcon className="h-4 w-4" />
                  QR Code
                </TabsTrigger>
                <TabsTrigger
                  value="share"
                  className="flex items-center gap-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm"
                >
                  <ShareIcon className="h-4 w-4" />
                  Share
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="link"
                className="space-y-4 animate-in fade-in"
              >
                <div className="flex items-center gap-2">
                  <Input
                    value={result.short_url}
                    readOnly
                    className="flex-1 h-12 px-4 rounded-lg border-border/50 bg-background/50"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(result.short_url)}
                    className="h-12 w-12 rounded-lg shrink-0 hover:bg-primary/10 hover:text-primary"
                  >
                    <ClipboardDocumentIcon className="h-5 w-5" />
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground p-3 rounded-lg bg-background/50">
                  <p>Original URL: {result.original_url}</p>
                  <p>Created: {new Date(result.created_at).toLocaleString()}</p>
                </div>
              </TabsContent>

              <TabsContent value="qr" className="space-y-4 animate-in fade-in">
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <QRCodeCanvas
                      value={result.short_url}
                      size={200}
                      level="H"
                      includeMargin
                      className="bg-white p-2 rounded-lg"
                    />
                  </div>
                  <Button
                    onClick={downloadQR}
                    variant="outline"
                    className="w-full h-12 rounded-lg hover:bg-primary/10 hover:text-primary"
                  >
                    Download QR Code
                  </Button>
                </div>
              </TabsContent>

              <TabsContent
                value="share"
                className="space-y-6 animate-in fade-in"
              >
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => shareToSocial("twitter")}
                    className="w-full h-12 rounded-lg hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                  >
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => shareToSocial("facebook")}
                    className="w-full h-12 rounded-lg hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-500"
                  >
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => shareToSocial("linkedin")}
                    className="w-full h-12 rounded-lg hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/40 dark:hover:text-blue-600"
                  >
                    LinkedIn
                  </Button>
                </div>
                <Separator className="bg-border/50" />
                <div className="flex justify-center">
                  <Button
                    variant="secondary"
                    onClick={() => copyToClipboard(result.short_url)}
                    className="gap-2 h-12 px-6 rounded-lg btn-shine"
                  >
                    <ClipboardDocumentIcon className="h-5 w-5" />
                    Copy to Clipboard
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-muted-foreground border-t border-border/30 mt-2">
            <p>URLPick - URL Shortener</p>
            <p>Made with ❤️</p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
