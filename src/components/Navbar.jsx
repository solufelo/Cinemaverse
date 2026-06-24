import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Film, LogOut, Menu, User, X, Zap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/feed', label: 'Feed' },
  { to: '/log', label: 'Log Status' },
]

export default function Navbar() {
  const { user, signOut } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-void/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-neon to-plasma shadow-neon">
            <Film className="h-5 w-5 text-void" />
            <Zap className="absolute -right-1 -top-1 h-3 w-3 text-acid" />
          </span>
          <span className="font-display text-lg font-bold tracking-wide text-white">
            CINEMA<span className="text-neon">VERSE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-md px-4 py-2 font-display text-sm uppercase tracking-wider transition ${
                  isActive
                    ? 'bg-neon/15 text-neon'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-slate-200 hover:border-neon/40"
              >
                <User className="h-4 w-4 text-neon" />
                {user.username}
              </Link>
              <button type="button" onClick={signOut} className="btn-ghost py-2">
                <LogOut className="h-4 w-4" />
                Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost py-2">
                Sign In
              </Link>
              <Link to="/signup" className="btn-primary py-2">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-panel px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 font-display uppercase tracking-wider text-slate-200 hover:bg-white/5"
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 border-t border-white/10 pt-3">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setOpen(false)} className="block py-2">
                    Profile — {user.username}
                  </Link>
                  <button type="button" onClick={signOut} className="btn-ghost mt-2 w-full">
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-ghost w-full">
                    Sign In
                  </Link>
                  <Link to="/signup" onClick={() => setOpen(false)} className="btn-primary w-full">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
