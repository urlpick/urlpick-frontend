"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import CountdownCircle from "@/components/countdown-circle";

interface RedirectResponse {
  original_url: string;
}

export default function RedirectContainer({ hash }: { hash: string }) {
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

  // Update the loading state
  if (isLoading) {
    return (
      <Card className="shadow-lg glass-card card-glow text-center">
        <CardContent className="pt-10 pb-10">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="mt-6 text-muted-foreground">
            Loading your destination...
          </p>
        </CardContent>
      </Card>
    );
  }

  // Update the error state
  if (error) {
    return (
      <Card className="shadow-lg glass-card card-glow text-center">
        <CardHeader className="pb-2">
          <div className="mx-auto bg-red-100 dark:bg-red-900/30 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-2">
            <ExclamationTriangleIcon className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-destructive to-red-400 bg-clip-text text-transparent">
            Error
          </CardTitle>
          <CardDescription className="text-base mt-2">{error}</CardDescription>
        </CardHeader>
        <CardFooter className="pt-4">
          <Button asChild className="w-full h-12 rounded-lg btn-shine">
            <a href="/">Create New Link</a>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Update the success state
  return (
    <Card className="shadow-lg glass-card card-glow overflow-hidden">
      <CardHeader className="text-center border-b border-border/30">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Redirecting you to:
        </CardTitle>
        <CardDescription className="break-all text-base mt-2 p-2 bg-background/50 rounded-lg">
          {originalUrl}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8 pt-8">
        <div className="flex justify-center">
          <div className="relative">
            <CountdownCircle countdown={countdown} total={5} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {countdown}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 p-3 bg-background/50 rounded-lg">
          <Checkbox
            id="autoRedirect"
            checked={autoRedirect}
            onCheckedChange={(checked) => setAutoRedirect(checked as boolean)}
            className="h-5 w-5 rounded-md border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          />
          <Label
            htmlFor="autoRedirect"
            className="text-muted-foreground cursor-pointer"
          >
            Auto redirect in {countdown} seconds
          </Label>
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-6">
        <Button
          asChild
          className="w-full h-12 rounded-lg font-medium btn-shine"
        >
          <a href={originalUrl ?? undefined}>Redirect Now</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
