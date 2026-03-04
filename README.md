# CineAI — AI Movie Insight Builder

A full-stack Next.js application that takes an IMDb movie ID and returns complete movie details with AI-powered audience sentiment analysis, powered by Groq's LLaMA 3.3 70B model.

## 🌐 Live Demo

> [https://cinescope-ai-virid.vercel.app/](https://cinescope-ai-virid.vercel.app/)

---

## ✨ Features

- 🎬 Fetch full movie details via **OMDb API** — poster, cast, plot, ratings, awards
- 🤖 **AI sentiment analysis** using **Groq + LLaMA 3.3 70B** — summary, sentiment score, key themes, audience profile, standout aspects
- ⭐ Multi-source rating bars — IMDb, Rotten Tomatoes, Metacritic
- 🎭 Cast display with auto-generated color avatars
- ✅ Input validation with clear error messages
- ⚡ Non-blocking UX — movie data shows instantly, AI loads separately
- 📱 Fully responsive — mobile, tablet, desktop
- 🎨 Deep space cinema design with custom animations (no gradients, unique color palette)

---

## 🛠 Tech Stack & Rationale

| Technology | Version | Why |
|---|---|---|
| **Next.js** | 16 | Full-stack in one repo — API Routes replace a separate Node.js backend, App Router gives clean file-based routing |
| **React** | 19 | Latest stable, required by the assignment, pairs naturally with Next.js |
| **Groq SDK** | 0.37 | Fastest free LLM inference available — LLaMA 3.3 70B responses in ~1s, no credit card needed |
| **OMDb API** | — | Comprehensive free movie database, returns structured JSON with ratings from IMDb, Rotten Tomatoes, and Metacritic |
| **Tailwind CSS** | v4 | Utility-first CSS, v4 uses `@theme` in CSS instead of a config file — faster builds, cleaner setup |
| **Lucide React** | 0.577 | Lightweight, consistent icon library |
| **Framer Motion** | 12 | Available in dependencies for future animation enhancements |
| **Jest** | 29 | Simple unit testing with zero configuration |

**Why no separate backend?**
Next.js API Routes (`/app/api/`) act as a Node.js backend. This keeps the codebase in one repo, simplifies deployment to Vercel, and avoids managing two servers — aligned with the assignment's "avoid over-engineering" principle.

---

## 📁 Project Structure
```
movie-insight-builder/
├── app/
│   ├── api/
│   │   ├── movie/route.js        # Fetches movie data from OMDb
│   │   └── sentiment/route.js    # Calls Groq for AI analysis
│   ├── globals.css               # Tailwind v4 theme + all custom CSS
│   ├── layout.js                 # Root layout with metadata
│   └── page.js                   # Main page — state + search flow
├── components/
│   ├── SearchForm.jsx            # Input, validation, example pills
│   ├── MovieCard.jsx             # Full movie display container
│   ├── CastList.jsx              # Cast members with avatars
│   ├── SentimentBadge.jsx        # Positive/mixed/negative badge + bar
│   ├── AIInsights.jsx            # AI summary, themes, aspects
│   ├── RatingBar.jsx             # Animated rating progress bars
│   └── LoadingSkeleton.jsx       # Shimmer loading state
├── lib/
│   └── groq.js                   # Groq client + prompt logic
├── __tests__/
│   └── movie.test.js             # Unit tests (validation, sentiment, shape)
├── .env.local                    # Secret keys (not committed)
├── .env.local.example            # Template for keys
└── next.config.js                # Image domain allowlist
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/movie-insight-builder.git
cd movie-insight-builder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Get free API keys

| Service | URL | Time |
|---|---|---|
| OMDb API | https://www.omdbapi.com/apikey.aspx | ~1 min (email verify) |
| Groq API | https://console.groq.com/keys | ~1 min (GitHub login) |

Both are completely free. No credit card required.

### 4. Configure environment variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
OMDB_API_KEY=your_omdb_key_here
GROQ_API_KEY=your_groq_key_here
```

### 5. Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Run tests
```bash
npm test
```

---

## 🚀 Deployment (Vercel)

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your repo
3. In **Environment Variables**, add:
   - `OMDB_API_KEY` → your OMDb key
   - `GROQ_API_KEY` → your Groq key
4. Click **Deploy**

Your app will be live in ~60 seconds.

---

## 🧪 Testing the App

| Test | Input | Expected |
|---|---|---|
| Empty submit | *(nothing)* | Error: "Please enter an IMDb ID" |
| Wrong format | `batman` | Error: format message |
| Not found | `tt9999999` | Error: "Movie not found" |
| Valid movie | `tt0133093` | Full movie card + AI insights |
| Example pills | Click "Dark Knight" | Loads tt0468569 |

**Test IMDb IDs:**
- `tt0133093` — The Matrix (1999)
- `tt0468569` — The Dark Knight (2008)
- `tt1375666` — Inception (2010)
- `tt0816692` — Interstellar (2014)
- `tt0110912` — Pulp Fiction (1994)

---

## 💡 Assumptions & Notes

1. **Sentiment source** — IMDb's ToS prohibits scraping user reviews directly. Instead, AI sentiment is derived from structured signals: IMDb rating + vote count, Rotten Tomatoes %, Metacritic score, awards, and plot. This provides reliable, legally sound audience sentiment without scraping.

2. **Caching** — OMDb responses are cached for 1 hour via Next.js fetch caching (`revalidate: 3600`). Groq responses are not cached so each analysis is fresh.

3. **AI loading** — AI insights are fetched after the movie data loads, intentionally. This means users see the movie immediately and the AI panel fills in ~1-2 seconds later, giving a faster perceived load time.

4. **Poster fallback** — When OMDb returns no poster, a styled fallback placeholder is shown instead of a broken image.

---

## 🤖 AI Tools Used

This project was built with assistance from Claude (Anthropic) for code generation and structure, following the assignment's open policy on AI tools. All code has been reviewed, understood, and reflects original engineering decisions.

---

## 📄 License

MIT — built for the Brew (STIR) Full-Stack Developer Internship assignment.