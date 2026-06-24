import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  getSessionUser,
  signInLocal,
  signOutLocal,
  signUpLocal,
} from '../lib/storage'
import {
  getSessionSupabase,
  signInSupabase,
  signOutSupabase,
  signUpSupabase,
  supabase,
  supabaseEnabled,
} from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const mode = supabaseEnabled ? 'supabase' : 'local'

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        if (supabaseEnabled) {
          const session = await getSessionSupabase()
          if (!mounted) return
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email,
              username:
                session.user.user_metadata?.username ||
                session.user.email?.split('@')[0] ||
                'player',
            })
          }
        } else {
          setUser(getSessionUser())
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    if (supabaseEnabled && supabase) {
      const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            username:
              session.user.user_metadata?.username ||
              session.user.email?.split('@')[0] ||
              'player',
          })
        } else {
          setUser(null)
        }
      })
      return () => {
        mounted = false
        sub.subscription.unsubscribe()
      }
    }

    return () => {
      mounted = false
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      mode,
      async signUp({ username, email, password }) {
        if (supabaseEnabled) {
          await signUpSupabase({ username, email, password })
          const session = await getSessionSupabase()
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email,
              username,
            })
          }
          return
        }
        const u = await signUpLocal({ username, email, password })
        setUser(u)
      },
      async signIn({ email, password }) {
        if (supabaseEnabled) {
          const authUser = await signInSupabase({ email, password })
          setUser({
            id: authUser.id,
            email: authUser.email,
            username:
              authUser.user_metadata?.username ||
              authUser.email?.split('@')[0] ||
              'player',
          })
          return
        }
        const u = await signInLocal({ email, password })
        setUser(u)
      },
      async signOut() {
        if (supabaseEnabled) await signOutSupabase()
        else signOutLocal()
        setUser(null)
      },
    }),
    [user, loading, mode],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
