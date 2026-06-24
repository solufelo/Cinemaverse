import { usePosts } from '../hooks/usePosts'
import StatusFeed from '../components/StatusFeed'
import { supabaseEnabled } from '../lib/supabase'

export default function FeedPage() {
  const { posts, loading, error, refresh } = usePosts()

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold uppercase text-white">Squad feed</h1>
          <p className="text-slate-400">Live watch-status posts from players.</p>
        </div>
        <button type="button" onClick={refresh} className="btn-ghost py-2">
          Refresh
        </button>
      </div>

      {!supabaseEnabled && (
        <p className="mb-4 rounded-md border border-acid/30 bg-acid/10 px-4 py-3 text-sm text-acid">
          Demo mode: posts are stored in this browser. Add Supabase env vars on Netlify for a shared
          live feed.
        </p>
      )}

      {error ? <p className="mb-4 text-red-400">{error}</p> : null}
      {loading ? <p className="text-slate-400">Loading...</p> : <StatusFeed posts={posts} />}
    </main>
  )
}
