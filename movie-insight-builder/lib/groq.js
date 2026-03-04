import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function analyzeMovieSentiment(movie) {
    const ratingsText = movie.ratings?.length
        ? movie.ratings.map((r) => `${r.Source}: ${r.Value}`).join(" | ")
        : "No external ratings available";

    const prompt = `You are a film analyst. Based ONLY on the structured data below, generate audience sentiment analysis.

Title: ${movie.title} (${movie.year})
Genre: ${movie.genre}
Director: ${movie.director}
Cast: ${movie.actors}
Plot: ${movie.plot}
IMDb Rating: ${movie.imdbRating}/10 (${movie.imdbVotes} votes)
External Ratings: ${ratingsText}
Awards: ${movie.awards || "None listed"}
Box Office: ${movie.boxOffice || "Unknown"}

Return ONLY a valid JSON object — no markdown, no explanation, nothing else:
{
  "summary": "2-3 sentences on how audiences received this film and why",
  "sentiment": "positive" | "mixed" | "negative",
  "sentimentScore": <integer 0-100>,
  "keyThemes": ["theme1", "theme2", "theme3", "theme4"],
  "audienceProfile": "One sentence on who loves this film",
  "criticalConsensus": "One crisp sentence on critical reception",
  "standoutAspects": ["aspect1", "aspect2", "aspect3"]
}

Rules: sentiment=positive if imdbRating>=7.5, mixed if 5.5-7.4, negative if <5.5.`;

    const res = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.6,
        max_tokens: 600,
    });

    const raw = res.choices[0]?.message?.content || "";

    // Extract JSON block 
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Groq response did not contain JSON");

    return JSON.parse(match[0]);
}