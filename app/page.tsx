import { Suspense } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import UrlShortener from "@/components/url-shortener/url-shortener";
import Features from "@/components/features/features";
import AdBanner from "@/components/ads/ad-banner";
import Loading from "@/components/ui/loading";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12 max-w-5xl">
          <Suspense fallback={<Loading />}>
            <UrlShortener />
            <AdBanner className="my-8" />
            <Features />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  );
}
