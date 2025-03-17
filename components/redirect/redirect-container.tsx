"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import CountdownCircle from "@/components/redirect/countdown-circle";
import { useRedirect } from "@/hooks/use-redirect";
import { UI } from "@/lib/constants";
import type { RedirectContainerProps } from "@/types";

export default function RedirectContainer({ hash }: RedirectContainerProps) {
  const {
    originalUrl,
    error,
    isLoading,
    countdown,
    autoRedirect,
    setAutoRedirect,
    redirectNow,
  } = useRedirect(hash);

  // Loading state
  if (isLoading) {
    return (
      <Card className="glass-card text-center animate-in fade-in">
        <CardContent className="pt-12 pb-12">
          <div className="relative w-16 h-16 mx-auto animate-spin-slow">
            <div className="absolute inset-0 rounded-full border-4 border-primary/10"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"></div>
          </div>
          <p className="mt-8 text-muted-foreground">
            Loading your destination...
          </p>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="glass-card text-center animate-in fade-in">
        <CardHeader className="pb-2">
          <div className="mx-auto bg-destructive/10 dark:bg-destructive/20 p-5 rounded-full w-20 h-20 flex items-center justify-center mb-3 animate-pulse-subtle">
            <ExclamationTriangleIcon className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-destructive">
            Error
          </CardTitle>
          <p className="text-base mt-2 text-muted-foreground">{error}</p>
        </CardHeader>
        <CardContent className="pt-6 flex justify-center">
          <a
            href="/"
            className="modern-button inline-flex items-center justify-center text-center"
            style={{ width: "auto", minWidth: "200px" }}
          >
            Create New Link
          </a>
        </CardContent>
      </Card>
    );
  }

  // Success state
  return (
    <Card className="glass-card card-glow overflow-hidden animate-in fade-in">
      <CardHeader className="text-center border-b border-border/20 bg-secondary/30">
        <CardTitle className="text-2xl font-bold text-foreground">
          Redirecting you to:
        </CardTitle>
        <p className="break-all text-base mt-3 p-3 bg-background/50 rounded-xl border border-border/20 modern-input">
          {originalUrl}
        </p>
      </CardHeader>

      <CardContent className="space-y-8 pt-8">
        <div className="flex justify-center">
          <div className="relative animate-float">
            <CountdownCircle
              countdown={countdown}
              total={UI.COUNTDOWN_SECONDS}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl font-bold text-primary">{countdown}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 p-4 bg-secondary/30 rounded-xl border border-border/20">
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

      <CardContent className="pt-2 pb-8">
        <button onClick={redirectNow} className="modern-button w-full">
          Redirect Now
        </button>
      </CardContent>
    </Card>
  );
}
