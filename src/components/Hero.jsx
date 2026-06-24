import { Link } from 'react-router-dom'
import { Play, Radio, Users } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,245,255,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,45,149,0.12),transparent_35%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="mb-3 font-display text-xs uppercase tracking-[0.35em] text-neon">
            Player One — Online
          </p>
          <h1 className="font-display text-4xl font-black uppercase leading-tight text-white md:text-6xl">
            Log films.
            <br />
            <span className="bg-gradient-to-r from-neon via-cyan-300 to-plasma bg-clip-text text-transparent">
              Share your watch status.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-300">
            CinemaVerse is a barebones gamer-style social layer on TMDB — post what
            you&apos;re watching, completed, or dropped. No fluff. Just your cinema feed.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup" className="btn-primary">
              <Play className="h-4 w-4" />
              Join the lobby
            </Link>
            <Link to="/feed" className="btn-ghost">
              <Radio className="h-4 w-4" />
              View live feed
            </Link>
          </div>
        </div>

        <div className="panel glow-border p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-display text-sm uppercase tracking-widest text-neon">
              Squad activity
            </span>
            <Users className="h-4 w-4 text-plasma" />
          </div>
          <ul className="space-y-3 text-sm">
            {[
              ['nova', 'completed', 'Dune: Part Two'],
              ['pixel_rat', 'watching', 'The Matrix'],
              ['cinema_ghost', 'planned', 'Blade Runner 2049'],
            ].map(([user, status, title]) => (
              <li
                key={title}
                className="flex items-center justify-between rounded-md border border-white/5 bg-void/60 px-3 py-2"
              >
                <span className="text-slate-300">
                  <span className="font-semibold text-white">@{user}</span> — {title}
                </span>
                <span className="font-display text-xs uppercase text-neon">{status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
