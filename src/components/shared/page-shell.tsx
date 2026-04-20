'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { editorialShellHeroClass, editorialPageWrapClass } from '@/components/shared/editorial-layout'

export { editorialCardRadius } from '@/components/shared/editorial-layout'

export function PageShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f9fcfb]">
      <NavbarShell />
      <main>
        <section className={editorialShellHeroClass}>
          <div className={`${editorialPageWrapClass} py-10 sm:py-12`}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                {eyebrow ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4a5c54]">{eyebrow}</p>
                ) : null}
                <h1
                  className={`text-3xl font-bold tracking-tight text-[#121c18] sm:text-4xl ${eyebrow ? 'mt-3' : ''}`}
                >
                  {title}
                </h1>
                {description && (
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#4a5c54]">{description}</p>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className={`${editorialPageWrapClass} py-10 sm:py-12`}>{children}</section>
      </main>
      <Footer />
    </div>
  )
}
