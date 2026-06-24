import { posterUrl, statusColor, statusLabel } from '../lib/tmdb'

export default function StatusFeed({ posts, emptyMessage }) {
  if (!posts.length) {
    return (
      <div className="panel p-8 text-center text-slate-400">
        {emptyMessage || 'No posts yet. Be the first to log a film.'}
      </div>
    )
  }

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.id} className="panel flex gap-4 p-4">
          <img
            src={posterUrl(post.posterPath)}
            alt={post.title}
            className="h-28 w-20 flex-shrink-0 rounded-md object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-sm font-bold text-neon">@{post.username}</span>
              <span className={`font-display text-xs uppercase ${statusColor(post.status)}`}>
                {statusLabel(post.status)}
              </span>
              <span className="text-xs text-slate-500">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            <h3 className="mt-1 truncate text-lg font-semibold text-white">{post.title}</h3>
            {post.rating ? (
              <p className="text-sm text-acid">Rating: {post.rating}/10</p>
            ) : null}
            {post.note ? <p className="mt-2 text-slate-300">{post.note}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  )
}
