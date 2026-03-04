export default function LoadingSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto animate-fade space-y-6">
      {/* Hero */}
      <div
        className="rounded-3xl p-6 md:p-8 border"
        style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-rim)" }}
      >
        <div className="flex flex-col md:flex-row gap-8">
          <div className="skeleton w-56 h-80 rounded-2xl flex-shrink-0 mx-auto md:mx-0" />
          <div className="flex-1 space-y-4 pt-2">
            <div className="skeleton h-9 w-3/4 rounded-xl" />
            <div className="skeleton h-5 w-1/3 rounded-lg" />
            <div className="flex gap-2 mt-1">
              {[60, 80, 96].map((w) => (
                <div key={w} className="skeleton h-7 rounded-full" style={{ width: w }} />
              ))}
            </div>
            <div className="space-y-2 pt-2">
              {[100, 95, 80].map((p, i) => (
                <div key={i} className="skeleton h-4 rounded" style={{ width: `${p}%` }} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="skeleton h-16 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Two cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="skeleton h-44 rounded-2xl" />
        <div className="skeleton h-44 rounded-2xl" />
      </div>

      <p
        className="text-center text-sm animate-pulse"
        style={{ color: "var(--color-slate)" }}
      >
        Fetching movie data and generating AI insights…
      </p>
    </div>
  );
}