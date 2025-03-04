import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import CountdownCircle from "./CountdownCircle";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface RedirectResponse {
  original_url: string;
}

export default function RedirectContainer() {
  const { hash } = useParams<{ hash: string }>();
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [autoRedirect, setAutoRedirect] = useState(true);

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await fetch(
          `https://urlpick-api.injun.dev/api/v1/urls/${hash}`
        );
        if (!response.ok) throw new Error("Invalid or expired URL");

        const data: RedirectResponse = await response.json();
        setOriginalUrl(data.original_url);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong"
        );
        toast.error("Failed to retrieve the original URL");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOriginalUrl();
  }, [hash]);

  useEffect(() => {
    if (!originalUrl || !autoRedirect || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        const newCountdown = prev - 1;
        if (newCountdown === 0 && autoRedirect && originalUrl) {
          window.location.href = originalUrl;
        }
        return newCountdown;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, originalUrl, autoRedirect]);

  if (isLoading) {
    return (
      <div className="card text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card text-center">
        <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Error</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <a href="/" className="btn btn-primary block w-full">
          Create New Link
        </a>
      </div>
    );
  }

  return (
    <div className="card space-y-6">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Redirecting you to:
        </h1>
        <p className="text-gray-600 break-all">{originalUrl}</p>
      </div>

      <div className="flex justify-center">
        <CountdownCircle countdown={countdown} total={5} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          <input
            type="checkbox"
            id="autoRedirect"
            checked={autoRedirect}
            onChange={(e) => setAutoRedirect(e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="autoRedirect" className="text-gray-700">
            Auto redirect in {countdown} seconds
          </label>
        </div>

        <a
          href={originalUrl ?? undefined}
          className="btn btn-primary block w-full text-center"
        >
          Redirect Now
        </a>
      </div>
    </div>
  );
}
