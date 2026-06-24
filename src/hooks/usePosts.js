import { useCallback, useEffect, useState } from 'react'
import { addPost, getPosts } from '../lib/storage'
import { createPostSupabase, fetchPostsSupabase, supabaseEnabled } from '../lib/supabase'

export function usePosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      if (supabaseEnabled) {
        setPosts(await fetchPostsSupabase())
      } else {
        setPosts(getPosts())
      }
    } catch (err) {
      setError(err.message || 'Failed to load feed')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const createPost = async ({ user, movie, status, note, rating }) => {
    const payload = {
      userId: user.id,
      username: user.username,
      tmdbId: movie.id,
      mediaType: 'movie',
      title: movie.title,
      posterPath: movie.poster_path,
      status,
      note,
      rating,
    }

    if (supabaseEnabled) {
      const created = await createPostSupabase(payload)
      setPosts((prev) => [created, ...prev])
      return created
    }

    const created = addPost(payload)
    setPosts((prev) => [created, ...prev])
    return created
  }

  return { posts, loading, error, refresh, createPost }
}
