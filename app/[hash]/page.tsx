import { Suspense } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import RedirectContainer from "@/components/redirect/redirect-container";
import AutoAds from "@/components/ads/auto-ads";
import Loading from "@/components/ui/loading";

interface PageProps {
  params: Promise<{ hash: string }>;
}

export default async function RedirectPage(props: PageProps) {
  const params = await props.params;
  const hash = params.hash;

  return (
    <div className="flex flex-col min-h-screen">
      <Header minimal />
      <AutoAds />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Suspense fallback={<Loading />}>
            <RedirectContainer hash={hash} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
