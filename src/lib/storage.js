const USERS_KEY = 'cv_users'
const SESSION_KEY = 'cv_session'
const POSTS_KEY = 'cv_posts'

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

async function hashPassword(password) {
  const data = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function getSessionUser() {
  const session = read(SESSION_KEY, null)
  if (!session?.id) return null
  const users = read(USERS_KEY, [])
  return users.find((u) => u.id === session.id) || null
}

export async function signUpLocal({ username, email, password }) {
  const users = read(USERS_KEY, [])
  const normalized = username.trim().toLowerCase()
  const emailNorm = email.trim().toLowerCase()

  if (users.some((u) => u.username.toLowerCase() === normalized)) {
    throw new Error('Username already taken')
  }
  if (users.some((u) => u.email.toLowerCase() === emailNorm)) {
    throw new Error('Email already registered')
  }

  const user = {
    id: crypto.randomUUID(),
    username: username.trim(),
    email: emailNorm,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  }

  users.push(user)
  write(USERS_KEY, users)
  write(SESSION_KEY, { id: user.id })
  return { id: user.id, username: user.username, email: user.email }
}

export async function signInLocal({ email, password }) {
  const users = read(USERS_KEY, [])
  const emailNorm = email.trim().toLowerCase()
  const passwordHash = await hashPassword(password)
  const user = users.find((u) => u.email === emailNorm && u.passwordHash === passwordHash)

  if (!user) throw new Error('Invalid email or password')

  write(SESSION_KEY, { id: user.id })
  return { id: user.id, username: user.username, email: user.email }
}

export function signOutLocal() {
  localStorage.removeItem(SESSION_KEY)
}

export function getPosts() {
  return read(POSTS_KEY, []).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  )
}

export function addPost(post) {
  const posts = read(POSTS_KEY, [])
  const entry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...post,
  }
  posts.unshift(entry)
  write(POSTS_KEY, posts)
  return entry
}

export function getPostsByUser(userId) {
  return getPosts().filter((p) => p.userId === userId)
}
