import { PageShell } from '@/components/shared/page-shell'
import { editorialCardClass, editorialInsetClass } from '@/components/shared/editorial-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const tagline = 'All systems operational'
const intro = 'Status for the public site and contributor tools. Times shown in UTC.'
const services = [
  { name: 'Reader web app', detail: 'Articles, search, static pages', status: 'Operational' as const },
  { name: 'Contributor workspace', detail: 'Drafts and submissions', status: 'Operational' as const },
  { name: 'Media delivery', detail: 'Images and embeds', status: 'Operational' as const },
]
const incidents = [
  { date: 'Apr 8, 2026', title: 'Scheduled maintenance — search index', status: 'Resolved' },
  { date: 'Mar 12, 2026', title: 'Delayed notification emails', status: 'Resolved' },
  { date: 'Feb 22, 2026', title: 'Elevated latency on media CDN', status: 'Resolved' },
]

export default function StatusPage() {
  return (
    <PageShell eyebrow="Operations" title={tagline} description={intro}>
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.name} className={editorialCardClass}>
              <CardContent className="p-6 sm:p-7">
                <h2 className="text-lg font-bold text-[#121c18]">{service.name}</h2>
                <p className="mt-1 text-sm text-[#4a5c54]">{service.detail}</p>
                <Badge
                  className="mt-4 rounded-full border-[#cfe5db] bg-[#eef6f3] text-[#24332c] hover:bg-[#eef6f3]"
                  variant="secondary"
                >
                  {service.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={editorialCardClass}>
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#121c18]">Incident history</h3>
            <p className="mt-1 text-sm text-[#4a5c54]">Recent events affecting availability or delivery.</p>
            <div className="mt-6 space-y-3">
              {incidents.map((incident) => (
                <div key={incident.title} className={editorialInsetClass}>
                  <div className="text-xs font-medium uppercase tracking-[0.16em] text-[#6b7f76]">{incident.date}</div>
                  <div className="mt-1 text-sm font-semibold text-[#121c18]">{incident.title}</div>
                  <div className="mt-1 text-xs text-[#4a5c54]">{incident.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
