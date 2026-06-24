const TMDB_IMG = 'https://image.tmdb.org/t/p/w500'

const FALLBACK_MOVIES = [
  {
    id: 278,
    title: 'The Shawshank Redemption',
    poster_path: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    release_date: '1994-09-23',
    vote_average: 8.7,
  },
  {
    id: 238,
    title: 'The Godfather',
    poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    release_date: '1972-03-24',
    vote_average: 8.7,
  },
  {
    id: 155,
    title: 'The Dark Knight',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    release_date: '2008-07-16',
    vote_average: 8.5,
  },
  {
    id: 680,
    title: 'Pulp Fiction',
    poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    release_date: '1994-09-10',
    vote_average: 8.5,
  },
  {
    id: 550,
    title: 'Fight Club',
    poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    release_date: '1999-10-15',
    vote_average: 8.4,
  },
]

export function posterUrl(path) {
  if (!path) return '/placeholder-poster.svg'
  return `${TMDB_IMG}${path}`
}

async function tmdbFetch(path, params = {}) {
  const query = new URLSearchParams(params).toString()
  const suffix = query ? `?${query}` : ''

  try {
    const devKey = import.meta.env.VITE_TMDB_API_KEY
    if (devKey && import.meta.env.DEV) {
      const res = await fetch(`https://api.themoviedb.org/3/${path}${suffix}&api_key=${devKey}`)
      if (!res.ok) throw new Error('TMDB request failed')
      return res.json()
    }

    const res = await fetch(
      `/.netlify/functions/tmdb?path=${encodeURIComponent(path)}${query ? `&${query}` : ''}`,
    )
    if (!res.ok) throw new Error('TMDB proxy failed')
    return res.json()
  } catch {
    if (path.startsWith('search/movie') && params.query) {
      const q = params.query.toLowerCase()
      return {
        results: FALLBACK_MOVIES.filter((m) => m.title.toLowerCase().includes(q)),
      }
    }
    return { results: FALLBACK_MOVIES }
  }
}

export async function getTrending() {
  const data = await tmdbFetch('trending/movie/week')
  return data.results || []
}

export async function searchMovies(query) {
  if (!query.trim()) return []
  const data = await tmdbFetch('search/movie', { query: query.trim() })
  return data.results || []
}

export const STATUS_OPTIONS = [
  { value: 'watching', label: 'Watching', color: 'text-neon' },
  { value: 'completed', label: 'Completed', color: 'text-acid' },
  { value: 'planned', label: 'Queued', color: 'text-plasma' },
  { value: 'dropped', label: 'Dropped', color: 'text-red-400' },
]

export function statusLabel(value) {
  return STATUS_OPTIONS.find((s) => s.value === value)?.label || value
}

export function statusColor(value) {
  return STATUS_OPTIONS.find((s) => s.value === value)?.color || 'text-slate-300'
}
