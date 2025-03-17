"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UrlForm from "@/components/url-shortener/url-form";
import UrlResult from "@/components/url-shortener/url-result";
import { useUrlShortener } from "@/hooks/use-url-shortener";

export default function UrlShortener() {
  const { result, isLoading, shortenUrl } = useUrlShortener();

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <div className="text-center space-y-4 animate-in fade-in">
        <h1 className="text-5xl font-bold mb-2 text-foreground tracking-tight">
          URL<span className="text-primary">Pick</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Professional URL shortening for your business and personal needs
        </p>
      </div>

      <Card className="glass-card card-glow overflow-hidden animate-in slide-up">
        <CardHeader className="pb-4 border-b border-border/20 bg-secondary/30">
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            Shorten Your Link
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8 pb-6">
          <UrlForm onSubmit={shortenUrl} isLoading={isLoading} />
        </CardContent>
      </Card>

      {result && <UrlResult result={result} />}
    </div>
  );
}
