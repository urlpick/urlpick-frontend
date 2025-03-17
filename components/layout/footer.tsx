export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 py-6 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-muted-foreground">
          <p>© {currentYear} URLPick • Simplify your links</p>
        </div>
      </div>
    </footer>
  );
}
