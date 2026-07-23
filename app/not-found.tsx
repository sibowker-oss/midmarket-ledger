import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper text-ink flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-ink-muted mb-6">Page not found</p>
        <Link href="/" className="text-accent hover:text-accent-hover">
          ← Back to Snapshot
        </Link>
      </div>
    </div>
  );
}
