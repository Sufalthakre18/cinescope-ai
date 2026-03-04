"use client";

import Image from "next/image";
import SentimentBadge from "./SentimentBadge";
import RatingBar from "./RatingBar";
import CastList from "./CastList";
import AIInsights from "./AIInsights";

function Pill({ icon, label, value }) {
  if (!value || value === "N/A") return null;
  return (
    <div
      className="flex flex-col items-center text-center px-3 py-3 rounded-xl border
                 transition-all duration-200 hover:scale-105"
      style={{
        backgroundColor: "var(--color-void)",
        borderColor:     "var(--color-rim)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-rimhover)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-rim)")}
    >
      <span className="text-base mb-1">{icon}</span>
      <span className="text-[10px] uppercase tracking-wide" style={{ color: "var(--color-slate)" }}>
        {label}
      </span>
      <span className="text-xs font-semibold mt-0.5 leading-tight" style={{ color: "var(--color-chalk)" }}>
        {value}
      </span>
    </div>
  );
}

function Row({ label, value }) {
  if (!value || value === "N/A") return null;
  return (
    <div className="flex gap-3">
      <span
        className="text-xs uppercase tracking-wide w-20 shrink-0 pt-0.5"
        style={{ color: "var(--color-slate)" }}
      >
        {label}
      </span>
      <span className="text-sm flex-1 leading-snug" style={{ color: "var(--color-silver)" }}>
        {value}
      </span>
    </div>
  );
}

export default function MovieCard({ movie, insights, insightsLoading }) {
  if (!movie) return null;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* HERO */}
      <div
        className="rounded-3xl border p-6 md:p-8 animate-rise relative overflow-hidden"
        style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-rim)" }}
      >
        
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-[100px] pointer-events-none"
          style={{ backgroundColor: "var(--color-goldfaint)", opacity: 0.6 }}
        />

        <div className="relative z-10 flex flex-col md:flex-row gap-8">
          
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="relative animate-float">
              {movie.poster ? (
                <Image
                  src={movie.poster}
                  alt={`${movie.title} poster`}
                  width={210}
                  height={315}
                  priority
                  className="rounded-2xl object-cover"
                  style={{
                    boxShadow: "0 24px 64px -8px #00000099",
                    border:    "1px solid var(--color-rim)",
                  }}
                />
              ) : (
                <div
                  className="`w-52.5 h-78.75 rounded-2xl flex flex-col items-center justify-center gap-3 border"
                  style={{
                    backgroundColor: "var(--color-void)",
                    borderColor:     "var(--color-rim)",
                  }}
                >
                  <span className="text-5xl opacity-30">🎬</span>
                  <span className="text-xs" style={{ color: "var(--color-slate)" }}>
                    No Poster
                  </span>
                </div>
              )}

              {/* IMDb badge */}
              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <div
                  className="absolute -bottom-3 -right-3 rounded-xl px-3 py-2 text-center animate-pulse-gold"
                  style={{ backgroundColor: "var(--color-gold)", color: "var(--color-void)" }}
                >
                  <div className="text-xl font-black leading-none">{movie.imdbRating}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest">IMDb</div>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Title + year */}
            <div className="rise d-1">
              <h1
                className="text-3xl md:text-4xl font-black leading-tight tracking-tight"
                style={{ color: "var(--color-chalk)" }}
              >
                {movie.title}
              </h1>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="text-lg font-light" style={{ color: "var(--color-silver)" }}>
                  {movie.year}
                </span>
                {movie.rated && movie.rated !== "N/A" && (
                  <span
                    className="px-2.5 py-0.5 rounded text-xs font-bold tracking-widest border"
                    style={{
                      borderColor:     "var(--color-rim)",
                      color:           "var(--color-slate)",
                    }}
                  >
                    {movie.rated}
                  </span>
                )}
                {movie.runtime && movie.runtime !== "N/A" && (
                  <span className="text-sm" style={{ color: "var(--color-slate)" }}>
                    ⏱ {movie.runtime}
                  </span>
                )}
              </div>
            </div>

            {/* Genre tags */}
            {movie.genre && movie.genre !== "N/A" && (
              <div className="flex flex-wrap gap-2 rise d-2">
                {movie.genre.split(",").map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{
                      color:           "var(--color-gold)",
                      borderColor:     "var(--color-goldfaint)",
                      backgroundColor: "var(--color-goldfaint)",
                    }}
                  >
                    {g.trim()}
                  </span>
                ))}
              </div>
            )}

            {insights && (
              <div className="rise d-3">
                <SentimentBadge
                  sentiment={insights.sentiment}
                  score={insights.sentimentScore}
                />
              </div>
            )}

            {/* Plot */}
            {movie.plot && movie.plot !== "N/A" && (
              <div className="rise d-3">
                <p
                  className="text-xs uppercase tracking-widest mb-1.5"
                  style={{ color: "var(--color-slate)" }}
                >
                  Synopsis
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-silver)" }}>
                  {movie.plot}
                </p>
              </div>
            )}

            {/* Stat pills */}
            <div className="grid grid-cols-3 gap-3 rise d-4">
              <Pill icon="🎬" label="Director"   value={movie.director?.split(",")[0]} />
              <Pill icon="🌍" label="Country"    value={movie.country?.split(",")[0]} />
              <Pill icon="🏆" label="Box Office" value={movie.boxOffice} />
            </div>
          </div>
        </div>
      </div>

      {/* INFO + RATINGS  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rise d-4">
        
        <div
          className="p-5 rounded-2xl border space-y-3"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-rim)" }}
        >
          <h3
            className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2 mb-4"
            style={{ color: "var(--color-slate)" }}
          >
            <span style={{ color: "var(--color-gold)" }}>📋</span> Details
          </h3>
          <Row label="Released" value={movie.released} />
          <Row label="Language" value={movie.language} />
          <Row label="Writer"   value={movie.writer} />
          <Row label="Awards"   value={movie.awards} />
          <Row label="Votes"    value={movie.imdbVotes ? `${movie.imdbVotes} on IMDb` : null} />
        </div>

        {/* Ratings */}
        {movie.ratings?.length > 0 && (
          <div
            className="p-5 rounded-2xl border"
            style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-rim)" }}
          >
            <h3
              className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2 mb-4"
              style={{ color: "var(--color-slate)" }}
            >
              <span style={{ color: "var(--color-gold)" }}>⭐</span> Ratings
            </h3>
            <div className="space-y-4">
              {movie.ratings.map((r) => (
                <RatingBar key={r.Source} source={r.Source} value={r.Value} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CAST + AI  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rise d-5">
        <CastList actors={movie.actors} />
        <AIInsights insights={insights} loading={insightsLoading} />
      </div>
    </div>
  );
}