import { NextResponse } from "next/server";
import { analyzeMovieSentiment } from "@/lib/groq";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { movieData } = body;
  if (!movieData?.title) {
    return NextResponse.json({ error: "movieData is required" }, { status: 400 });
  }

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: "Groq API key not configured" }, { status: 500 });
  }

  try {
    const insights = await analyzeMovieSentiment(movieData);
    return NextResponse.json({ success: true, insights });
  } catch (err) {
    console.error("[sentiment/route]", err);
    return NextResponse.json(
      { error: "AI analysis failed. Please try again." },
      { status: 500 }
    );
  }
}