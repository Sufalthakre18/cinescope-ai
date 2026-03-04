const CONFIG = {
  positive: {
    emoji: "✦",
    label: "Positive Reception",
    color:  "var(--color-mint)",
    faint:  "var(--color-mintfaint)",
    border: "#2EC99A40",
  },
  mixed: {
    emoji: "◈",
    label: "Mixed Reception",
    color:  "var(--color-amber)",
    faint:  "var(--color-amberfaint)",
    border: "#E0A03040",
  },
  negative: {
    emoji: "✕",
    label: "Negative Reception",
    color:  "var(--color-ember)",
    faint:  "var(--color-emberfaint)",
    border: "#E05A5A40",
  },
};

export default function SentimentBadge({ sentiment, score }) {
  const c = CONFIG[sentiment] ?? CONFIG.mixed;
  const pct = Math.min(Math.max(score ?? 50, 0), 100);

  return (
    <div
      className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border"
      style={{
        backgroundColor: c.faint,
        borderColor:     c.border,
        boxShadow:       `0 0 24px 0 ${c.faint}`,
      }}
    >
      <span className="text-xl leading-none" style={{ color: c.color }}>
        {c.emoji}
      </span>
      <div>
        <p className="text-sm font-bold leading-none" style={{ color: c.color }}>
          {c.label}
        </p>
        {score !== undefined && (
          <div className="flex items-center gap-2 mt-1.5">
            <div
              className="w-20 h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: "var(--color-rim)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${pct}%`, backgroundColor: c.color }}
              />
            </div>
            <span className="text-xs opacity-70" style={{ color: c.color }}>
              {pct}/100
            </span>
          </div>
        )}
      </div>
    </div>
  );
}