import { PageShell } from '@/components/shared/page-shell'
import { editorialCardClass, editorialInsetClass } from '@/components/shared/editorial-layout'
import { Card, CardContent } from '@/components/ui/card'

const lastUpdated = 'April 20, 2026'
const intro =
  'We use a small set of cookies and local storage to keep sessions secure and to understand how readers use Aidteck. Here is how they break down.'
const sections = [
  {
    title: 'Essential',
    body:
      'Required for sign-in, security, load balancing, and basic preferences. These cannot be disabled without breaking core functionality.',
  },
  {
    title: 'Analytics',
    body:
      'Help us see which sections are read most, how search is used, and where the experience can improve—aggregated and not sold to third parties for unrelated advertising.',
  },
  {
    title: 'Preferences',
    body:
      'Remember UI choices such as category filters or reading settings on this device so the layout feels consistent when you return.',
  },
]

export default function CookiesPage() {
  return (
    <PageShell eyebrow="Legal" title="Cookie policy" description={intro}>
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
    </PageShell>
  )
}
