import Link from 'next/link'
import { LifeBuoy } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { editorialCardClass } from '@/components/shared/editorial-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const topics = [
  {
    title: 'Writing & submissions',
    description:
      'Format drafts for the desk, use the contributor workspace, and understand review timelines before your piece goes live.',
  },
  {
    title: 'Reading & discovery',
    description:
      'Browse the news index, filter by category, and use search to jump straight to a topic or author mention.',
  },
  {
    title: 'Account & workspace',
    description:
      'Sign in on a new device, manage your session, and keep your contributor profile aligned with what readers see.',
  },
  {
    title: 'Partnerships',
    description:
      'Syndication, events, and editorial collaborations—route questions through contact so the right editor replies.',
  },
]

const faqs = [
  {
    id: 'submit',
    question: 'How do I submit an article?',
    answer:
      'Use “Submit article” in the navigation to open the contributor workspace. Add a title, summary, and body, then send it for review. You will receive status updates through the same flow.',
  },
  {
    id: 'review',
    question: 'How long does review take?',
    answer:
      'Most pitches and drafts receive a first response within several business days. Complex reporting may take longer; the desk will communicate if we need more time or revisions.',
  },
  {
    id: 'categories',
    question: 'How do categories work?',
    answer:
      'Categories help readers browse the archive. You can pick a primary topic when publishing; filters on the news index deep-link without changing underlying URLs.',
  },
  {
    id: 'search',
    question: 'Can I search within stories?',
    answer:
      'Yes. The search page scans titles, summaries, body text, and tags across published posts. Use quotes for exact phrases when needed.',
  },
  {
    id: 'account',
    question: 'Where is my account data stored?',
    answer:
      'Session data for sign-in may be stored locally in your browser for a smoother return. See the privacy policy for full detail on what we store on servers.',
  },
]

export default function HelpPage() {
  return (
    <PageShell
      eyebrow="Support"
      title="Help center"
      description="Guides for reading Aidteck, submitting work, and using the contributor workspace—organized like the rest of the site, with calm spacing and clear hierarchy."
      actions={
        <Button className="rounded-full bg-[#121c18] px-6 text-white hover:bg-[#24332c]" asChild>
          <Link href="/contact">Contact the desk</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <Card key={topic.title} className={`${editorialCardClass} transition-transform hover:-translate-y-0.5`}>
              <CardContent className="p-6 sm:p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#e2ebe8] bg-[#f4faf7] text-[#121c18]">
                  <LifeBuoy className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-bold text-[#121c18]">{topic.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#4a5c54]">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={editorialCardClass}>
          <CardContent className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4a5c54]">FAQ</p>
            <h3 className="mt-2 text-xl font-bold text-[#121c18]">Common questions</h3>
            <Accordion type="single" collapsible className="mt-6 w-full space-y-2">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="rounded-2xl border border-[#e2ebe8] bg-[#f9fcfb] px-4 data-[state=open]:bg-white"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold text-[#121c18] hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-[#4a5c54]">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
