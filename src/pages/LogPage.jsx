import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import MovieCard from '../components/MovieCard'
import StatusComposer from '../components/StatusComposer'
import { useAuth } from '../context/AuthContext'
import { usePosts } from '../hooks/usePosts'
import { getTrending, searchMovies } from '../lib/tmdb'

export default function LogPage() {
  const { user, loading: authLoading } = useAuth()
  const { createPost } = usePosts()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    getTrending().then((items) => setResults(items.slice(0, 8))).catch(() => {})
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      getTrending().then((items) => setResults(items.slice(0, 8))).catch(() => {})
      return
    }

    const timer = setTimeout(() => {
      searchMovies(query).then(setResults).catch(() => setResults([]))
    }, 350)

    return () => clearTimeout(timer)
  }, [query])

  if (!authLoading && !user) {
    return <Navigate to="/login" replace state={{ from: '/log' }} />
  }

  const handleSubmit = async ({ status, note, rating }) => {
    if (!selected || !user) return
    setSubmitting(true)
    setMessage('')
    try {
      await createPost({ user, movie: selected, status, note, rating })
      setMessage('Posted to feed!')
      setSelected(null)
    } catch (err) {
      setMessage(err.message || 'Failed to post')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold uppercase text-white">Log status</h1>
        <p className="text-slate-400">Search TMDB, pick a film, share your watch state.</p>
      </div>

      <div className="relative mb-6 max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
        <input
          className="input-field pl-11"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                selected={selected?.id === movie.id}
                onSelect={setSelected}
              />
            ))}
          </div>
        </div>

        <div>
          <StatusComposer movie={selected} onSubmit={handleSubmit} submitting={submitting} />
          {message ? (
            <p className="mt-3 text-sm text-neon">
              {message}{' '}
              <Link to="/feed" className="underline">
                View feed
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </main>
  )
}
