import { posterUrl } from '../lib/tmdb'

export default function MovieCard({ movie, onSelect, selected }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(movie)}
      className={`group overflow-hidden rounded-xl border text-left transition ${
        selected
          ? 'border-neon shadow-neon'
          : 'border-white/10 hover:border-neon/40 hover:shadow-neon'
      }`}
    >
      <img
        src={posterUrl(movie.poster_path)}
        alt={movie.title}
        className="aspect-[2/3] w-full object-cover transition group-hover:scale-105"
        loading="lazy"
      />
      <div className="bg-panel/95 p-3">
        <h3 className="truncate font-semibold text-white">{movie.title}</h3>
        <p className="mt-1 text-sm text-slate-400">
          {movie.release_date?.slice(0, 4) || '—'} · ⭐ {movie.vote_average?.toFixed(1) || '—'}
        </p>
      </div>
    </button>
  )
}
