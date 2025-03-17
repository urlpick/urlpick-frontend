"use client";

import { useState, type FormEvent } from "react";
import Turnstile from "react-turnstile";
import { Input } from "@/components/ui/input";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { isValidUrl } from "@/lib/utils/url-utils";
import { API, ERRORS } from "@/lib/constants";
import { useTurnstile } from "@/hooks/use-turnstile";
import type { UrlFormProps } from "@/types";

export default function UrlForm({ onSubmit, isLoading }: UrlFormProps) {
  const [url, setUrl] = useState("");
  const {
    token,
    widgetId,
    handleVerify,
    handleError,
    handleExpire,
    handleLoad,
    resetToken,
  } = useTurnstile();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!url) {
      toast.error(ERRORS.URL.EMPTY);
      return;
    }

    if (!isValidUrl(url)) {
      toast.error(ERRORS.URL.INVALID);
      return;
    }

    if (!token) {
      toast.error(ERRORS.CAPTCHA.MISSING);
      return;
    }

    const success = await onSubmit(url, token);

    if (success) {
      setUrl("");
      resetToken();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your URL (e.g. example.com)"
          className="modern-input flex-1"
          required
        />
        <button
          type="submit"
          disabled={isLoading || !url || !token}
          className="modern-button btn-shine min-w-[120px] disabled:opacity-50 disabled:pointer-events-none"
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
          sitekey={API.TURNSTILE_SITE_KEY}
          onVerify={handleVerify}
          onError={handleError}
          onExpire={handleExpire}
          onLoad={handleLoad}
          theme="auto"
          className="mx-auto"
        />
      </div>
    </form>
  );
}
