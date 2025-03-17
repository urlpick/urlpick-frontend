import { Suspense } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import RedirectContainer from "@/components/redirect/redirect-container";
import AdBanner from "@/components/ads/ad-banner";
import Loading from "@/components/ui/loading";

export default async function RedirectPage({
  params,
}: {
  params: { hash: string };
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header minimal />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Suspense fallback={<Loading />}>
            <RedirectContainer hash={params.hash} />
            <AdBanner className="mt-8" />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
