import { useState } from 'react'
import { Send } from 'lucide-react'
import { STATUS_OPTIONS } from '../lib/tmdb'

export default function StatusComposer({ movie, onSubmit, submitting }) {
  const [status, setStatus] = useState('watching')
  const [note, setNote] = useState('')
  const [rating, setRating] = useState(0)

  if (!movie) {
    return (
      <div className="panel p-6 text-center text-slate-400">
        Pick a film from search or trending to log your status.
      </div>
    )
  }

  return (
    <form
      className="panel space-y-4 p-6"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ status, note, rating: rating || null })
      }}
    >
      <div>
        <p className="font-display text-xs uppercase tracking-widest text-neon">Selected</p>
        <h3 className="text-xl font-bold text-white">{movie.title}</h3>
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">Status</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setStatus(opt.value)}
              className={`rounded-md border px-3 py-2 font-display text-xs uppercase tracking-wider ${
                status === opt.value
                  ? 'border-neon bg-neon/15 text-neon'
                  : 'border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">Rating (optional)</label>
        <input
          type="range"
          min="0"
          max="10"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full accent-neon"
        />
        <p className="text-sm text-slate-400">{rating > 0 ? `${rating}/10` : 'No rating'}</p>
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">Note</label>
        <textarea
          className="input-field min-h-24 resize-none"
          placeholder="Quick take for the feed..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={280}
        />
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        <Send className="h-4 w-4" />
        {submitting ? 'Posting...' : 'Share to feed'}
      </button>
    </form>
  )
}
