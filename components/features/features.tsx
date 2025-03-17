import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  QrCodeIcon,
  LinkIcon,
  ShareIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function Features() {
  return (
    <div className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Why Choose <span className="text-primary">URLPick</span>?
        </h2>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          Professional, fast, and secure URL shortening
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card feature-card h-full">
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-3 transition-all duration-300 feature-icon">
              <LinkIcon className="h-6 w-6 text-primary/80" />
            </div>
            <CardTitle className="text-xl">Short Links</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transform long, unwieldy URLs into clean, memorable links that are
              perfect for sharing.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card feature-card h-full">
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-3 transition-all duration-300 feature-icon">
              <QrCodeIcon className="h-6 w-6 text-primary/80" />
            </div>
            <CardTitle className="text-xl">QR Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Every shortened link comes with a downloadable QR code for print
              materials or digital displays.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card feature-card h-full">
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-3 transition-all duration-300 feature-icon">
              <ShareIcon className="h-6 w-6 text-primary/80" />
            </div>
            <CardTitle className="text-xl">Easy Sharing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Directly share your shortened links on Twitter, Facebook, LinkedIn
              and more with a single click.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card feature-card h-full">
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-3 transition-all duration-300 feature-icon">
              <ShieldCheckIcon className="h-6 w-6 text-primary/80" />
            </div>
            <CardTitle className="text-xl">Secure & Reliable</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Our service uses Cloudflare Turnstile to prevent abuse and ensure
              your links remain reliable.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
