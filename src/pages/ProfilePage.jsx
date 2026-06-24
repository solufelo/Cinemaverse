import { Navigate } from 'react-router-dom'
import StatusFeed from '../components/StatusFeed'
import { useAuth } from '../context/AuthContext'
import { usePosts } from '../hooks/usePosts'

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const { posts } = usePosts()

  if (!loading && !user) {
    return <Navigate to="/login" replace />
  }

  const mine = posts.filter((p) => p.userId === user?.id)

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="panel mb-8 p-6">
        <p className="font-display text-xs uppercase tracking-widest text-neon">Player profile</p>
        <h1 className="font-display text-3xl font-bold text-white">@{user?.username}</h1>
        <p className="text-slate-400">{user?.email}</p>
        <p className="mt-3 text-sm text-slate-300">{mine.length} films logged</p>
      </div>

      <h2 className="mb-4 font-display text-xl font-bold uppercase text-white">Your log</h2>
      <StatusFeed posts={mine} emptyMessage="You haven't logged any films yet. Hit Log Status." />
    </main>
  )
}
