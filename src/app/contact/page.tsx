import Link from 'next/link'
import { FileText, Mail, Sparkles } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { editorialCardRadius } from '@/components/shared/editorial-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const lanes = [
  {
    icon: FileText,
    title: 'Editorial submissions',
    body: 'Pitch essays, reporting, and columns that fit the publication’s voice and standards.',
  },
  {
    icon: Mail,
    title: 'Partnerships & press',
    body: 'Sponsorships, syndication, and media inquiries—we route each note to the right editor.',
  },
  {
    icon: Sparkles,
    title: 'Contributor support',
    body: 'Questions on drafts, formatting, or workflow? We help writers ship with confidence.',
  },
]

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <PageShell
      eyebrow="Editorial desk"
      title={`Contact ${SITE_CONFIG.name}`}
      description="Pitch a story, ask about syndication, or get help with your contributor account. Messages go to real editors—expect a thoughtful reply, not an auto-ticket."
      actions={
        <>
          <Button variant="outline" className="rounded-full border-[#c5ddd4] bg-white px-5" asChild>
            <Link href="/articles">Browse news</Link>
          </Button>
          <Button className="rounded-full bg-[#121c18] px-6 text-white hover:bg-[#24332c]" asChild>
            <Link href="/dashboard/articles/new">Submit article</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-5">
          {lanes.map((lane) => (
            <Card key={lane.title} className={`border-[#e2ebe8] bg-white shadow-sm ${editorialCardRadius}`}>
              <CardContent className="flex gap-4 p-6 sm:p-7">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#e2ebe8] bg-[#f4faf7] text-[#121c18]">
                  <lane.icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#121c18]">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#4a5c54]">{lane.body}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className={`border-[#e2ebe8] bg-white shadow-md ${editorialCardRadius}`}>
          <CardContent className="p-6 sm:p-8">
            <Badge variant="secondary" className="rounded-full border-[#cfe5db] bg-[#eef6f3] text-[#24332c]">
              Send a message
            </Badge>
            <h2 className="mt-4 text-xl font-bold text-[#121c18] sm:text-2xl">We’ll get back to you</h2>
            <p className="mt-2 text-sm text-[#4a5c54]">Share enough context so we can route your note—no change to how messages are processed on the server.</p>
            <form className="mt-8 grid gap-4">
              <input
                className="h-12 rounded-2xl border border-[#e2ebe8] bg-[#f9fcfb] px-4 text-sm text-[#121c18] outline-none ring-[#5a8c78]/30 placeholder:text-[#6b7f76] focus:ring-2"
                placeholder="Your name"
                name="name"
                autoComplete="name"
              />
              <input
                className="h-12 rounded-2xl border border-[#e2ebe8] bg-[#f9fcfb] px-4 text-sm text-[#121c18] outline-none placeholder:text-[#6b7f76] focus:ring-2 focus:ring-[#5a8c78]/30"
                placeholder="Email address"
                name="email"
                type="email"
                autoComplete="email"
              />
              <input
                className="h-12 rounded-2xl border border-[#e2ebe8] bg-[#f9fcfb] px-4 text-sm text-[#121c18] outline-none placeholder:text-[#6b7f76] focus:ring-2 focus:ring-[#5a8c78]/30"
                placeholder="Subject"
                name="subject"
              />
              <textarea
                className="min-h-[160px] rounded-2xl border border-[#e2ebe8] bg-[#f9fcfb] px-4 py-3 text-sm text-[#121c18] outline-none placeholder:text-[#6b7f76] focus:ring-2 focus:ring-[#5a8c78]/30"
                placeholder="How can we help?"
                name="message"
              />
              <Button type="submit" className="h-12 rounded-full bg-[#121c18] text-white hover:bg-[#24332c]">
                Send message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
