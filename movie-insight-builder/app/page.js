"use client";

import { useState } from "react";
import SearchForm      from "@/components/SearchForm";
import MovieCard       from "@/components/MovieCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Home() {
  const [movie,           setMovie]           = useState(null);
  const [insights,        setInsights]        = useState(null);
  const [loading,         setLoading]         = useState(false);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [error,           setError]           = useState("");
  const [lastId,          setLastId]          = useState("");

  const handleSearch = async (imdbId) => {
    if (imdbId === lastId && movie) return;

    setLoading(true);
    setError("");
    setMovie(null);
    setInsights(null);
    setLastId(imdbId);

    try {
      // fetch movie data
      const res  = await fetch(`/api/movie?id=${imdbId}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch movie");
      }

      setMovie(data.movie);
      setLoading(false);

      // fetch AI insights
      setInsightsLoading(true);
      try {
        const aiRes  = await fetch("/api/sentiment", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ movieData: data.movie }),
        });
        const aiData = await aiRes.json();
        if (aiRes.ok && aiData.success) setInsights(aiData.insights);
      } catch (aiErr) {
       
        console.warn("AI insights failed:", aiErr.message);
      } finally {
        setInsightsLoading(false);
      }

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
      setInsightsLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-12 md:py-20">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <header className="text-center mb-14" style={{ animation: "var(--animate-rise)" }}>
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 border"
            style={{
              backgroundColor: "var(--color-goldfaint)",
              borderColor:     "var(--color-golddim)",
              animation:       "var(--animate-pulse-gold)",
            }}
          >
            <span className="text-3xl select-none">🎬</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none" style={{ color: "var(--color-chalk)" }}>
            Cine<span style={{ color: "var(--color-gold)" }}>AI</span>
          </h1>

          <p className="mt-3 text-sm md:text-base max-w-sm mx-auto leading-relaxed" style={{ color: "var(--color-silver)" }}>
            Enter any IMDb movie ID to unlock AI-powered insights,
            sentiment analysis, and audience intelligence.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {["AI Sentiment", "Multi-Source Ratings", "Cast", "Audience Profile"].map((f) => (
              <span
                key={f}
                className="px-3 py-1 rounded-full text-xs border"
                style={{ color: "var(--color-slate)", borderColor: "var(--color-rim)", backgroundColor: "var(--color-surface)" }}
              >
                {f}
              </span>
            ))}
          </div>
        </header>

        {/* SEARCH */}
        <div className="flex justify-center mb-14">
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {/* ERROR */}
        {error && (
          <div
            className="max-w-md mx-auto mb-8 p-4 rounded-2xl border text-center"
            style={{ backgroundColor: "var(--color-emberfaint)", borderColor: "#E05A5A40" }}
          >
            <p className="text-sm font-medium" style={{ color: "var(--color-ember)" }}>
              ⚠️ {error}
            </p>
            <p className="text-xs mt-1 opacity-60" style={{ color: "var(--color-ember)" }}>
              Valid format: tt + 7-9 digits (e.g. tt0133093)
            </p>
          </div>
        )}

        {/* LOADING SKELETON */}
        {loading && <LoadingSkeleton />}

        {/* MOVIE RESULT */}
        {!loading && movie && (
          <MovieCard
            movie={movie}
            insights={insights}
            insightsLoading={insightsLoading}
          />
        )}

       
        {!loading && !movie && !error && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-20 select-none">🎭</div>
            <p className="text-sm" style={{ color: "var(--color-slate)" }}>
              Enter an IMDb ID above to begin
            </p>
            <p className="text-xs mt-2 opacity-50" style={{ color: "var(--color-slate)" }}>
              Find IDs on imdb.com — the "tt" number in the URL
            </p>
          </div>
        )}

        {/* FOOTER */}
        <footer className="mt-20 pt-8 border-t text-center" style={{ borderColor: "var(--color-rim)" }}>
          <p className="text-xs" style={{ color: "var(--color-slate)" }}>
            
            <span style={{ color: "var(--color-silver)" }}>Assignment</span> internship
          </p>
        </footer>

      </div>
    </main>
  );
}