import { LinkIcon, QrCodeIcon, ShareIcon } from "@heroicons/react/24/outline";

const features = [
  {
    icon: LinkIcon,
    title: "Short Links",
    description: "Create memorable, branded links that drive more clicks",
  },
  {
    icon: QrCodeIcon,
    title: "QR Codes",
    description: "Generate QR codes for your links instantly",
  },
  {
    icon: ShareIcon,
    title: "Easy Sharing",
    description: "Share your links across all social media platforms",
  },
];

export default function Features() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="card text-center">
              <feature.icon className="h-12 w-12 mx-auto text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
