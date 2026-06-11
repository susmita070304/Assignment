export default function Loading() {
  return (
    <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full animate-pulse bg-zinc-950">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-56 bg-zinc-900/60 rounded-3xl" />
        <div className="h-56 bg-zinc-900/60 rounded-3xl" />
        <div className="col-span-1 md:col-span-2 lg:col-span-3 h-5 w-32 bg-zinc-900 rounded" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-44 bg-zinc-900/40 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
