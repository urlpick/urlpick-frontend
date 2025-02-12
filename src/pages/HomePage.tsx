import UrlForm from "../components/UrlForm";
import Features from "../components/Features";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <UrlForm />
      <Features />
    </div>
  );
}
