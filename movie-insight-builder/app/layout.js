import "./globals.css";

export const metadata = {
  title: "CineAI — AI Movie Insight Builder",
  description:
    "Enter any IMDb movie ID to get AI-powered sentiment analysis, audience insights, and complete movie details.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="grain">{children}</body>
    </html>
  );
}