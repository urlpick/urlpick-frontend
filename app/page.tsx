import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import UrlShortener from "@/components/url-shortener/url-shortener";
import Features from "@/components/features/features";
import AutoAds from "@/components/ads/auto-ads";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AutoAds />
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12 max-w-5xl">
          <UrlShortener />
          <Features />
        </section>
      </main>
      <Footer />
    </div>
  );
}
