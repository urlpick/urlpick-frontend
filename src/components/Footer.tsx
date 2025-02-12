export default function Footer() {
  return (
    <footer className="bg-white mt-auto">
      <div className="container mx-auto px-4 h-16 flex items-center justify-center">
        <p className="text-gray-600">
          © {new Date().getFullYear()} URLPick. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
