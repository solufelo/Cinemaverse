import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseEnabled = Boolean(url && anonKey)

export const supabase = supabaseEnabled
  ? createClient(url, anonKey)
  : null

export async function signUpSupabase({ email, password, username }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  })
  if (error) throw error
  return data.user
}

export async function signInSupabase({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data.user
}

export async function signOutSupabase() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSessionSupabase() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

export async function fetchPostsSupabase() {
  const { data, error } = await supabase
    .from('status_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)
  if (error) throw error
  return data.map(mapPost)
}

export async function createPostSupabase(post) {
  const { data: session } = await supabase.auth.getSession()
  const user = session.session?.user
  if (!user) throw new Error('Not signed in')

  const username = user.user_metadata?.username || user.email?.split('@')[0] || 'player'

  const { data, error } = await supabase
    .from('status_posts')
    .insert({
      user_id: user.id,
      username,
      tmdb_id: post.tmdbId,
      media_type: post.mediaType,
      title: post.title,
      poster_path: post.posterPath,
      status: post.status,
      note: post.note || null,
      rating: post.rating || null,
    })
    .select()
    .single()

  if (error) throw error
  return mapPost(data)
}

function mapPost(row) {
  return {
    id: row.id,
    userId: row.user_id,
    username: row.username,
    tmdbId: row.tmdb_id,
    mediaType: row.media_type,
    title: row.title,
    posterPath: row.poster_path,
    status: row.status,
    note: row.note,
    rating: row.rating,
    createdAt: row.created_at,
  }
}
