import { PageShell } from '@/components/shared/page-shell'
import { editorialCardClass, editorialInsetClass } from '@/components/shared/editorial-layout'
import { Card, CardContent } from '@/components/ui/card'

const intro =
  'Aidteck is built with open-source software. We are grateful to the communities behind these projects.'
const items = [
  { name: 'Next.js', note: 'MIT License — React framework and App Router' },
  { name: 'React', note: 'MIT License — UI library' },
  { name: 'Tailwind CSS', note: 'MIT License — utility-first styling' },
  { name: 'Lucide', note: 'ISC License — icons' },
]

export default function LicensesPage() {
  return (
    <PageShell eyebrow="Open source" title="Licenses & acknowledgements" description={intro}>
      <Card className={editorialCardClass}>
        <CardContent className="p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((license) => (
              <div key={license.name} className={editorialInsetClass}>
                <h3 className="text-base font-bold text-[#121c18]">{license.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4a5c54]">{license.note}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageShell>
  )
}
