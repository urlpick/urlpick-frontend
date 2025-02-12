import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import RedirectPage from "./pages/RedirectPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Toaster position="top-right" />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:hash" element={<RedirectPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
