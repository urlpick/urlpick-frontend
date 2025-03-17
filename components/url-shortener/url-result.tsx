"use client";

import { QRCodeCanvas } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ClipboardDocumentIcon,
  QrCodeIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { copyToClipboard } from "@/lib/utils/clipboard";
import { downloadQRCode } from "@/lib/utils/qr-code";
import { shareToSocial } from "@/lib/utils/social-share";
import { memo } from "react";
import type { UrlResultProps } from "@/types";

const UrlResult = memo(function UrlResult({ result }: UrlResultProps) {
  return (
    <Card className="glass-card card-glow animate-in slide-up duration-300">
      <CardHeader className="pb-4 border-b border-border/20 bg-secondary/30">
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full animate-pulse-subtle"></div>
          Your Shortened URL
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-8 space-y-10">
        {/* Link Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              value={result.short_url}
              readOnly
              className="modern-input flex-1 font-medium select-all"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(result.short_url)}
              className="h-12 w-12 rounded-xl shrink-0 hover:bg-primary/10 hover:text-primary transition-all duration-200 shadow-sm"
            >
              <ClipboardDocumentIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* QR Code and Share Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* QR Code */}
          <div className="flex flex-col items-center gap-5 animate-float">
            <div className="bg-white p-5 rounded-xl shadow-md dark:ring-1 dark:ring-border">
              <QRCodeCanvas
                value={result.short_url}
                size={180}
                level="H"
                includeMargin
                className="bg-white p-2 rounded-lg"
              />
            </div>
            <button
              onClick={() => downloadQRCode()}
              className="modern-button-outline w-full h-10 text-sm"
            >
              <QrCodeIcon className="h-4 w-4 mr-2 inline-block" />
              Download QR Code
            </button>
          </div>

          {/* Share Options */}
          <div className="flex flex-col justify-center space-y-5">
            <h3 className="text-lg font-medium text-foreground mb-2 flex items-center gap-2">
              <ShareIcon className="h-5 w-5 text-primary" />
              Share on social media
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => shareToSocial("twitter", result.short_url)}
                className="w-full h-10 rounded-xl border border-border hover:bg-primary/10 hover:text-primary transition-all duration-200 shadow-sm text-sm"
              >
                Twitter
              </button>
              <button
                onClick={() => shareToSocial("facebook", result.short_url)}
                className="w-full h-10 rounded-xl border border-border hover:bg-primary/10 hover:text-primary transition-all duration-200 shadow-sm text-sm"
              >
                Facebook
              </button>
              <button
                onClick={() => shareToSocial("linkedin", result.short_url)}
                className="w-full h-10 rounded-xl border border-border hover:bg-primary/10 hover:text-primary transition-all duration-200 shadow-sm text-sm"
              >
                LinkedIn
              </button>
            </div>
            <button
              onClick={() => copyToClipboard(result.short_url)}
              className="modern-button gap-2 h-10 text-sm mt-2"
            >
              <ClipboardDocumentIcon className="h-4 w-4 mr-2 inline-block" />
              Copy to Clipboard
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default UrlResult;
