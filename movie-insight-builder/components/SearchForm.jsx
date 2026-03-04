"use client";

import { useState } from "react";
import { Search, Clapperboard, ArrowRight } from "lucide-react";

const EXAMPLES = [
  { id: "tt0133093", label: "The Matrix" },
  { id: "tt0468569", label: "Dark Knight" },
  { id: "tt1375666", label: "Inception" },
  { id: "tt0816692", label: "Interstellar" },
];

export default function SearchForm({ onSearch, loading }) {
  const [val, setVal]       = useState("");
  const [err, setErr]       = useState("");
  const [focused, setFocus] = useState(false);

  const validate = (v) => {
    if (!v.trim()) return "Please enter an IMDb ID";
    if (!/^tt\d{7,9}$/.test(v.trim())) return "Format: tt + 7-9 digits (e.g. tt0133093)";
    return "";
  };

  const submit = (e) => {
    e.preventDefault();
    const e2 = validate(val);
    if (e2) { setErr(e2); return; }
    setErr("");
    onSearch(val.trim());
  };

  const pick = (id) => {
    setVal(id);
    setErr("");
    onSearch(id);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={submit}>
        <div
          className="flex items-center rounded-2xl border bg-surface transition-all duration-300 overflow-hidden"
          style={{
            borderColor: focused ? "var(--color-gold)" : "var(--color-rim)",
            boxShadow:   focused ? "0 0 0 3px var(--color-goldfaint)" : "none",
          }}
        >
          <div className="pl-4 pr-2 flex-shrink-0">
            <Clapperboard
              size={18}
              style={{ color: focused ? "var(--color-gold)" : "var(--color-slate)" }}
              className="transition-colors duration-200"
            />
          </div>

          <input
            type="text"
            value={val}
            onChange={(e) => { setVal(e.target.value); if (err) setErr(""); }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder="Enter IMDb ID — e.g. tt0133093"
            disabled={loading}
            spellCheck={false}
            autoComplete="off"
            className="flex-1 py-4 pr-3 bg-transparent text-sm font-medium focus:outline-none disabled:opacity-50"
            style={{ color: "var(--color-chalk)" }}
          />

          <button
            type="submit"
            disabled={loading}
            className="m-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 flex items-center gap-2 flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: "var(--color-gold)", color: "var(--color-void)" }}
          >
            {loading ? (
              <>
                <div
                  className="w-4 h-4 rounded-full border-2"
                  style={{
                    borderColor:    "var(--color-void)",
                    borderTopColor: "transparent",
                    animation:      "spin 1s linear infinite",
                  }}
                />
                <span>Fetching</span>
              </>
            ) : (
              <>
                <Search size={15} />
                <span>Analyze</span>
              </>
            )}
          </button>
        </div>

        {err && (
          <p className="mt-2 ml-1 text-xs font-medium flex items-center gap-1.5" style={{ color: "var(--color-ember)" }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--color-ember)" }} />
            {err}
          </p>
        )}
      </form>

      {/* Example pills */}
      <div className="mt-4 flex items-center flex-wrap gap-2">
        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--color-slate)" }}>
          Try:
        </span>
        {EXAMPLES.map((ex) => (
          <ExampleButton key={ex.id} ex={ex} onClick={() => pick(ex.id)} disabled={loading} />
        ))}
      </div>
    </div>
  );
}

// Separated into its own component to avoid inline onMouseEnter/Leave hydration issues
function ExampleButton({ ex, onClick, disabled }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 transition-all duration-200 hover:scale-105 disabled:opacity-40"
      style={{
        borderColor:     hovered ? "var(--color-gold)"   : "var(--color-rim)",
        color:           hovered ? "var(--color-gold)"   : "var(--color-silver)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      {ex.label}
      <ArrowRight size={10} />
    </button>
  );
}