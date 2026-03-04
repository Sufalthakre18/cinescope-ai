const PALETTES = [
  ["#7B5EA7", "#4B7BDB"],
  ["#1E8A7A", "#3DB88E"],
  ["#A0522D", "#D4833E"],
  ["#5B7ED4", "#8FA8F0"],
  ["#A0406A", "#D46090"],
];

function Avatar({ name, index }) {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const [a, b]   = PALETTES[index % PALETTES.length];

  return (
    <div
      className="rise d-${index} flex items-center gap-3 px-3 py-2.5 rounded-xl border
                 transition-all duration-200 hover:scale-[1.02] cursor-default"
      style={{
        backgroundColor: "var(--color-void)",
        borderColor:     "var(--color-rim)",
        animationDelay:  `${index * 60}ms`,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-rimhover)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-rim)")}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
        style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
      >
        {initials}
      </div>
      <span className="text-sm font-medium" style={{ color: "var(--color-chalk)" }}>
        {name}
      </span>
    </div>
  );
}

export default function CastList({ actors }) {
  if (!actors || actors === "N/A") return null;
  const cast = actors.split(",").map((a) => a.trim()).filter(Boolean);

  return (
    <div
      className="p-5 rounded-2xl border"
      style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-rim)" }}
    >
      <h3
        className="text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2"
        style={{ color: "var(--color-slate)" }}
      >
        <span style={{ color: "var(--color-gold)" }}>🎭</span> Cast
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {cast.map((name, i) => (
          <Avatar key={name} name={name} index={i} />
        ))}
      </div>
    </div>
  );
}