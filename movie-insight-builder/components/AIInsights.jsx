"use client";

export default function AIInsights({ insights, loading }) {
  if (loading) {
    return (
      <div
        className="p-5 rounded-2xl border"
        style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-rim)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="skeleton w-6 h-6 rounded-lg" />
          <div className="skeleton h-4 w-36 rounded" />
        </div>
        <div className="space-y-2">
          {[100, 100, 72].map((w, i) => (
            <div key={i} className="skeleton h-4 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!insights) return null;

  return (
    <div
      className="p-5 rounded-2xl border card-hover animate-rise"
      style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-rim)" }}
    >
      {/* Header */}
      <h3
        className="text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2"
        style={{ color: "var(--color-slate)" }}
      >
        <span style={{ color: "var(--color-gold)" }}>🤖</span>
        AI Audience Insights
        <span
          className="ml-auto text-[10px] px-2 py-0.5 rounded-full border font-normal tracking-normal normal-case"
          style={{
            color:           "var(--color-gold)",
            borderColor:     "var(--color-goldfaint)",
            backgroundColor: "var(--color-goldfaint)",
          }}
        >
          Groq · LLaMA 3.3
        </span>
      </h3>

      {/* Summary */}
      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-chalk)" }}>
        {insights.summary}
      </p>

      {/* Critical consensus quote */}
      {insights.criticalConsensus && (
        <div
          className="mb-4 p-3 rounded-xl border-l-2"
          style={{
            backgroundColor: "var(--color-void)",
            borderLeftColor: "var(--color-gold)",
          }}
        >
          <p className="text-xs leading-relaxed italic" style={{ color: "var(--color-silver)" }}>
            "{insights.criticalConsensus}"
          </p>
        </div>
      )}

      {/* Audience profile */}
      {insights.audienceProfile && (
        <div className="mb-4">
          <p
            className="text-xs uppercase tracking-wide mb-1"
            style={{ color: "var(--color-slate)" }}
          >
            Audience
          </p>
          <p className="text-sm" style={{ color: "var(--color-silver)" }}>
            {insights.audienceProfile}
          </p>
        </div>
      )}

      {/* Key themes */}
      {insights.keyThemes?.length > 0 && (
        <div className="mb-4">
          <p
            className="text-xs uppercase tracking-wide mb-2"
            style={{ color: "var(--color-slate)" }}
          >
            Key Themes
          </p>
          <div className="flex flex-wrap gap-2">
            {insights.keyThemes.map((t, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors duration-200"
                style={{
                  color:           "var(--color-silver)",
                  borderColor:     "var(--color-rim)",
                  backgroundColor: "var(--color-void)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Standout aspects */}
      {insights.standoutAspects?.length > 0 && (
        <div>
          <p
            className="text-xs uppercase tracking-wide mb-2"
            style={{ color: "var(--color-slate)" }}
          >
            Standout Aspects
          </p>
          <ul className="space-y-1.5">
            {insights.standoutAspects.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--color-silver)" }}>
                <span className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-gold)" }}>
                  ✦
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}