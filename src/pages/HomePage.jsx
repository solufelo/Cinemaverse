import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import MovieCard from '../components/MovieCard'
import StatusFeed from '../components/StatusFeed'
import { usePosts } from '../hooks/usePosts'
import { getTrending } from '../lib/tmdb'

export default function HomePage() {
  const [trending, setTrending] = useState([])
  const { posts, loading } = usePosts()

  useEffect(() => {
    getTrending()
      .then(setTrending)
      .catch(() => setTrending([]))
  }, [])

  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase text-white">Trending films</h2>
            <p className="text-slate-400">Powered by TMDB — pick one and log your status.</p>
          </div>
          <Link to="/log" className="btn-ghost hidden sm:inline-flex">
            Log a film
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {trending.slice(0, 10).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold uppercase text-white">Recent feed</h2>
          <Link to="/feed" className="text-sm text-neon hover:underline">
            View all
          </Link>
        </div>
        {loading ? (
          <p className="text-slate-400">Loading feed...</p>
        ) : (
          <StatusFeed posts={posts.slice(0, 5)} />
        )}
      </section>
    </main>
  )
}
