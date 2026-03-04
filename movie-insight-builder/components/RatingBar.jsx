const SOURCE_MAP = {
  "Internet Movie Database": { short: "IMDb",            parse: (v) => (parseFloat(v) / 10) * 100 },
  "Rotten Tomatoes":         { short: "Rotten Tomatoes", parse: (v) => parseInt(v)               },
  "Metacritic":              { short: "Metacritic",       parse: (v) => parseInt(v)               },
};

export default function RatingBar({ source, value }) {
  if (!value || value === "N/A") return null;

  const meta  = SOURCE_MAP[source] ?? { short: source, parse: () => 0 };
  const pct   = Math.min(meta.parse(value), 100);
  const color = pct >= 75
    ? "var(--color-mint)"
    : pct >= 50
      ? "var(--color-amber)"
      : "var(--color-ember)";

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium" style={{ color: "var(--color-silver)" }}>
          {meta.short}
        </span>
        <span className="text-xs font-bold" style={{ color: "var(--color-chalk)" }}>
          {value}
        </span>
      </div>
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--color-rim)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}