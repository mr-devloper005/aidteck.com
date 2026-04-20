'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export function LoginForm({
  actionClass,
  mutedClass,
}: {
  actionClass: string
  mutedClass: string
}) {
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    await login(email.trim(), password)
    router.push('/')
    router.refresh()
  }

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Welcome back</p>
      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <input
          className="h-12 rounded-xl border border-[#c5ddd4]/90 bg-white/90 px-4 text-sm text-[#14211c] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none ring-offset-2 focus:ring-2 focus:ring-[#5a8c78]/35"
          placeholder="Email address"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          required
        />
        <input
          className="h-12 rounded-xl border border-[#c5ddd4]/90 bg-white/90 px-4 text-sm text-[#14211c] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none ring-offset-2 focus:ring-2 focus:ring-[#5a8c78]/35"
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-opacity disabled:opacity-60 ${actionClass}`}
        >
          {isLoading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <div className={`mt-6 flex items-center justify-between text-sm ${mutedClass}`}>
        <Link href="/forgot-password" className="hover:underline">
          Forgot password?
        </Link>
        <Link href="/register" className="inline-flex items-center gap-2 font-semibold hover:underline">
          <Sparkles className="h-4 w-4" />
          Create account
        </Link>
      </div>
    </>
  )
}
