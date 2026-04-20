import Link from "next/link"
import { PageShell } from "@/components/shared/page-shell"
import { editorialCardClass, editorialInsetClass } from "@/components/shared/editorial-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SITE_CONFIG } from "@/lib/site-config"

const tagline = "Small team, high craft"
const intro =
  "We are building a calm, reader-first publication on the web. If you care about typography, editorial standards, and fast honest shipping, you will fit in."
const benefits = [
  "Remote-first with overlapping core hours",
  "Health and learning stipends (role-dependent)",
  "Annual editorial retreat and contributor meetups",
  "Hardware allowance for design and engineering roles",
]
const values = [
  "Readers come before engagement tricks.",
  "Clarity beats cleverness in product and in prose.",
  "We ship, measure, and refine—without burning out the team.",
]
const roles = [
  {
    title: "Senior frontend engineer",
    location: "Remote (Americas / EU)",
    type: "Full-time",
    level: "Senior",
    blurb: "Next.js, design systems, and performance for the reading experience.",
  },
  {
    title: "Contributing editor",
    location: "Remote",
    type: "Contract",
    level: "Mid",
    blurb: "Line editing, fact-check coordination, and voice consistency across desks.",
  },
  {
    title: "Product designer",
    location: "New York or remote",
    type: "Full-time",
    level: "Mid",
    blurb: "Editorial UI, contributor tools, and accessible reading layouts.",
  },
]

export default function CareersPage() {
  return (
    <PageShell
      eyebrow="Careers"
      title={`Build ${SITE_CONFIG.name} with us`}
      description={intro}
      actions={
        <Button className="rounded-full bg-[#121c18] px-6 text-white hover:bg-[#24332c]" asChild>
          <Link href="/contact">Introduce yourself</Link>
        </Button>
      }
    >
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#4a5c54]">{tagline}</p>
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="space-y-4">
          {roles.map((role) => (
            <Card key={role.title} className={editorialCardClass}>
              <CardContent className="p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full border-[#cfe5db] bg-[#eef6f3] text-[#24332c]">
                    {role.level}
                  </Badge>
                  <Badge variant="outline" className="rounded-full border-[#e2ebe8]">
                    {role.type}
                  </Badge>
                </div>
                <h2 className="mt-3 text-lg font-bold text-[#121c18]">{role.title}</h2>
                <p className="mt-1 text-sm text-[#4a5c54]">{role.location}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#4a5c54]">{role.blurb}</p>
                <Button variant="outline" className="mt-5 rounded-full border-[#c5ddd4] bg-white" asChild>
                  <Link href="/contact">Discuss this role</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="space-y-4">
          <Card className={editorialCardClass}>
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-lg font-bold text-[#121c18]">Benefits & rhythm</h3>
              <ul className="mt-4 space-y-3 text-sm text-[#4a5c54]">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5a8c78]" aria-hidden />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className={editorialCardClass}>
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-lg font-bold text-[#121c18]">How we work</h3>
              <div className="mt-4 space-y-3">
                {values.map((value) => (
                  <div key={value} className={editorialInsetClass}>
                    <p className="text-sm leading-relaxed text-[#4a5c54]">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  )
}
