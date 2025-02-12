import { LinkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <LinkIcon className="h-6 w-6 text-primary-600" />
          <span className="text-xl font-bold text-gray-900">URLPick</span>
        </Link>
      </div>
    </header>
  );
}
