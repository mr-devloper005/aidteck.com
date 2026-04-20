import { PageShell } from '@/components/shared/page-shell'
import { editorialCardClass, editorialInsetClass } from '@/components/shared/editorial-layout'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'

const lastUpdated = 'April 20, 2026'
const intro =
  'By using Aidteck you agree to these terms. They exist to keep the platform safe for readers, fair for contributors, and sustainable for the publication.'
const sections = [
  {
    title: 'Accounts & eligibility',
    body:
      'You are responsible for your login credentials and for activity under your account. You must provide accurate information and be old enough to enter a binding agreement where you live.',
  },
  {
    title: 'Content & license',
    body:
      'You retain ownership of work you submit. You grant Aidteck a non-exclusive license to host, display, distribute, and promote your content on the platform and in related marketing, with attribution as we reasonably provide.',
  },
  {
    title: 'Acceptable use',
    body:
      'No harassment, spam, malware, impersonation, or illegal content. We may remove material or suspend accounts that violate these rules or undermine reader trust.',
  },
  {
    title: 'Disclaimers',
    body:
      'The site is provided “as is.” We do not guarantee uninterrupted availability. To the extent permitted by law, we limit liability for indirect or consequential damages arising from use of the service.',
  },
  {
    title: 'Changes',
    body:
      'We may update these terms; the “last updated” date will change when we do. Continued use after changes means you accept the revised terms.',
  },
]

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of service"
      description={`${intro} These terms apply to ${SITE_CONFIG.name} and related contributor tools.`}
    >
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
