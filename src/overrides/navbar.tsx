'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'

export const NAVBAR_OVERRIDE_ENABLED = true

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const nav = [
    { key: 'explore', label: 'Explore', route: '/search' },
    { key: 'about', label: 'About Us', route: '/about' },
    { key: 'contact', label: 'Contact Us', route: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-100 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <img src="/favicon.png?v=20260515" alt="aidteck logo" width="44" height="44" className="h-11 w-11 rounded-xl object-cover" />
          <span className="text-4xl font-semibold lowercase tracking-tight text-slate-900">aidteck</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.key}
              href={item.route}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold transition',
                pathname.startsWith(item.route) ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-cyan-50 hover:text-slate-900'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/search" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Search className="h-4 w-4" />
            Search
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/create/article" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                New Article
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link href="/register" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Join
            </Link>
          )}
        </div>

        <button type="button" className="rounded-full border border-slate-200 p-2 lg:hidden" onClick={() => setOpen((s) => !s)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-cyan-100 bg-white px-4 py-4 lg:hidden">
          <div className="space-y-2">
            {nav.map((item) => (
              <Link
                key={item.key}
                href={item.route}
                onClick={() => setOpen(false)}
                className={cn(
                  'block rounded-xl px-4 py-3 text-sm font-semibold',
                  pathname.startsWith(item.route) ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700'
                )}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link href="/create/article" onClick={() => setOpen(false)} className="block rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
                  New Article
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                  className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-800"
                >
                  Sign out
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
