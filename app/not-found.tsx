export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-black px-6 text-center text-white">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-white/60">404</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">Page not found</h1>
        <p className="text-white/70">The page you are looking for does not exist.</p>
      </div>
    </main>
  )
}
