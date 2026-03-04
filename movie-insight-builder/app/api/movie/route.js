import { NextResponse } from "next/server";

const isValidId = (id) => /^tt\d{7,9}$/.test(id?.trim() ?? "");

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "IMDb ID is required" }, { status: 400 });
    }
    if (!isValidId(id)) {
        return NextResponse.json(
            { error: "Invalid format of ID." },
            { status: 400 }
        );
    }

    const key = process.env.OMDB_API_KEY;
    if (!key) {
        return NextResponse.json({ error: "OMDb API key not configured on server" }, { status: 500 });
    }

    try {
        const res = await fetch(
            `https://www.omdbapi.com/?i=${id.trim()}&apikey=${key}&plot=full`,
            { next: { revalidate: 3600 } } // Cache 1 hour
        );

        if (!res.ok) throw new Error(`OMDb responded with HTTP ${res.status}`);

        const data = await res.json();

        if (data.Response === "False") {
            return NextResponse.json(
                { error: data.Error || "Movie not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            movie: {
                imdbId: data.imdbID,
                title: data.Title,
                year: data.Year,
                rated: data.Rated,
                released: data.Released,
                runtime: data.Runtime,
                genre: data.Genre,
                director: data.Director,
                writer: data.Writer,
                actors: data.Actors,
                plot: data.Plot,
                language: data.Language,
                country: data.Country,
                awards: data.Awards,
                poster: data.Poster !== "N/A" ? data.Poster : null,
                ratings: data.Ratings ?? [],
                imdbRating: data.imdbRating,
                imdbVotes: data.imdbVotes,
                boxOffice: data.BoxOffice,
                type: data.Type,
            },
        });
    } catch (err) {
        console.error("[movie/route]", err);
        return NextResponse.json(
            { error: "Failed to fetch movie, please try again" },
            { status: 500 }
        );
    }
}