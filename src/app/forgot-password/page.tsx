"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { Footer } from "@/components/shared/footer"
import { editorialCardClass } from "@/components/shared/editorial-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#f9fcfb]">
      <NavbarShell />
      <main className="mx-auto max-w-lg px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#4a5c54] transition-colors hover:text-[#121c18]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>

        <div className={`mt-10 p-8 sm:p-10 ${editorialCardClass}`}>
          {!isSubmitted ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4a5c54]">Account</p>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#121c18] sm:text-3xl">Reset your password</h1>
              <p className="mt-3 text-sm leading-relaxed text-[#4a5c54]">
                Enter the email you use for Aidteck. If an account exists, we will send a reset link—check spam folders
                just in case.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#121c18]">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6b7f76]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-2xl border-[#e2ebe8] bg-[#f9fcfb] pl-10 text-[#121c18] placeholder:text-[#6b7f76] focus-visible:ring-[#5a8c78]/30"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-full bg-[#121c18] text-white hover:bg-[#24332c]"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending…" : "Send reset link"}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#cfe5db] bg-[#eef6f3]">
                <CheckCircle className="h-8 w-8 text-[#3d6b58]" aria-hidden />
              </div>
              <h1 className="mt-6 text-2xl font-bold text-[#121c18] sm:text-3xl">Check your email</h1>
              <p className="mt-3 text-sm leading-relaxed text-[#4a5c54]">
                We sent a reset link to <span className="font-medium text-[#121c18]">{email}</span>
              </p>
              <Button asChild variant="outline" className="mt-8 w-full rounded-full border-[#c5ddd4] bg-white">
                <Link href="/login">Back to sign in</Link>
              </Button>
              <p className="mt-6 text-sm text-[#4a5c54]">
                Didn&apos;t receive it?{" "}
                <button type="button" onClick={() => setIsSubmitted(false)} className="font-medium text-[#121c18] underline underline-offset-4">
                  Try again
                </button>
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
