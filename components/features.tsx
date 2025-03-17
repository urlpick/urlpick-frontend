import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  QrCodeIcon,
  LinkIcon,
  ShareIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function Features() {
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent inline-block">
          Why Choose URLPick?
        </h2>
        <p className="text-muted-foreground mt-2">
          Simple, fast, and secure URL shortening
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-md hover:shadow-xl transition-all duration-300 glass-card card-glow">
          <CardHeader className="pb-2">
            <LinkIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Short Links</CardTitle>
            <CardDescription>
              Create compact, easy-to-share links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Transform long, unwieldy URLs into clean, memorable links that are
              perfect for sharing.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-xl transition-all duration-300 glass-card card-glow">
          <CardHeader className="pb-2">
            <QrCodeIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle>QR Codes</CardTitle>
            <CardDescription>
              Generate scannable QR codes instantly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Every shortened link comes with a downloadable QR code for print
              materials or digital displays.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-xl transition-all duration-300 glass-card card-glow">
          <CardHeader className="pb-2">
            <ShareIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Easy Sharing</CardTitle>
            <CardDescription>Share across social platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Directly share your shortened links on Twitter, Facebook, LinkedIn
              and more with a single click.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-xl transition-all duration-300 glass-card card-glow">
          <CardHeader className="pb-2">
            <ShieldCheckIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Secure & Reliable</CardTitle>
            <CardDescription>
              Protected with CAPTCHA verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Our service uses Cloudflare Turnstile to prevent abuse and ensure
              your links remain reliable.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
