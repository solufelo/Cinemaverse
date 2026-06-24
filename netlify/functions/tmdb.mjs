export default async (request) => {
  const apiKey = process.env.TMDB_API_KEY || process.env.VITE_TMDB_API_KEY

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'TMDB_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const url = new URL(request.url)
  const path = url.searchParams.get('path') || 'trending/movie/week'
  const params = new URLSearchParams(url.searchParams)
  params.delete('path')
  params.set('api_key', apiKey)

  const tmdbUrl = `https://api.themoviedb.org/3/${path}?${params.toString()}`

  try {
    const res = await fetch(tmdbUrl)
    const data = await res.json()
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
    })
  } catch {
    return new Response(JSON.stringify({ error: 'TMDB fetch failed' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
