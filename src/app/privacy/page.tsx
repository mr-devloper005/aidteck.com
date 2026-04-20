import { PageShell } from '@/components/shared/page-shell'
import { editorialCardClass, editorialInsetClass } from '@/components/shared/editorial-layout'
import { Card, CardContent } from '@/components/ui/card'

const lastUpdated = 'April 20, 2026'
const intro =
  'Aidteck is built for readers and writers first. This policy explains what we collect, why we collect it, and the choices you have—without burying the details in legalese.'
const sections = [
  {
    title: 'Information you provide',
    body:
      'When you create an account, submit an article, or contact the desk, we store the details you send us—such as your name, email address, and message content—so we can respond and operate the service.',
  },
  {
    title: 'How we use information',
    body:
      'We use account and usage data to keep the site secure, improve discovery and search, personalize what you see where appropriate, and communicate about your submissions or account.',
  },
  {
    title: 'Cookies & similar technologies',
    body:
      'We use cookies for sign-in sessions, preferences, and aggregated analytics. You can control many cookies through your browser; essential cookies are required for core features like authentication.',
  },
  {
    title: 'Data retention & deletion',
    body:
      'We retain information as long as your account is active or as needed to provide the service and meet legal obligations. You may request deletion of your account subject to any records we must keep by law.',
  },
  {
    title: 'Contact',
    body:
      'Questions about this policy? Reach the team through the contact page—we read every note routed to editorial and operations.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell eyebrow="Legal" title="Privacy policy" description={intro}>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <Card className={editorialCardClass}>
          <CardContent className="space-y-6 p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#6b7f76]">Last updated · {lastUpdated}</p>
            <div className="space-y-5">
              {sections.map((section) => (
                <div key={section.title} className={editorialInsetClass}>
                  <h2 className="text-base font-bold text-[#121c18]">{section.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#4a5c54]">{section.body}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <aside className="space-y-4 rounded-2xl border border-[#e2ebe8] bg-[#f4faf7] p-6 text-sm text-[#4a5c54]">
          <p className="font-semibold text-[#121c18]">Plain-language summary</p>
          <p>
            We collect what we need to run Aidteck, protect accounts, and improve reading—nothing more. You can ask
            questions or request changes by contacting the desk.
          </p>
        </aside>
      </div>
    </PageShell>
  )
}
