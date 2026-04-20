import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { editorialCardRadius } from "@/components/shared/editorial-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "Stories in the archive", value: "Growing" },
  { label: "Readers monthly", value: "12k+" },
  { label: "Contributor voices", value: "40+" },
];

const values = [
  {
    title: "Curated by people",
    description:
      "Editors assign, shape, and line-read—so what reaches readers feels intentional, not algorithmically flattened.",
  },
  {
    title: "Designed for focus",
    description:
      "Generous line length, restrained motion, and mint panels keep the interface quiet so sentences stay loud.",
  },
  {
    title: "Built to publish",
    description:
      "Contributor tools, review states, and the public archive share one design language—fewer handoffs, clearer status.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="Publication"
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is an independent editorial desk for analysis, reporting, and essays—built with the same mint surfaces, ink type, and generous spacing you see on the homepage.`}
      actions={
        <>
          <Button variant="outline" className="rounded-full border-[#c5ddd4] bg-white px-5" asChild>
            <Link href="/team">Meet the Team</Link>
          </Button>
          <Button className="rounded-full bg-[#121c18] px-6 text-white hover:bg-[#24332c]" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className={`border-[#e2ebe8] bg-white shadow-sm ${editorialCardRadius}`}>
          <CardContent className="space-y-4 p-6 sm:p-8">
            <Badge variant="secondary" className="rounded-full border-[#cfe5db] bg-[#eef6f3] text-[#24332c]">
              Our Story
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight text-[#121c18]">
              A calm home for long-form reading and independent journalism.
            </h2>
            <p className="text-sm leading-relaxed text-[#4a5c54]">
              {SITE_CONFIG.name} brings reporters, essayists, and contributors together on one surface—no marketplace
              clutter in the main experience, just stories, context, and a clear path to the desk.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[#e2ebe8] bg-[#f4faf7] p-4 text-center sm:text-left"
                >
                  <div className="text-2xl font-bold text-[#121c18]">{item.value}</div>
                  <div className="text-xs text-[#4a5c54]">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className={`border-[#e2ebe8] bg-white shadow-sm ${editorialCardRadius}`}>
              <CardContent className="p-6 sm:p-7">
                <h3 className="text-lg font-bold text-[#121c18]">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4a5c54]">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <section className="mt-12 rounded-3xl border border-[#d5e8df] bg-[linear-gradient(135deg,#f4faf7_0%,#eef6f3_100%)] p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4a5c54]">Read with intention</p>
        <h2 className="mt-3 max-w-3xl text-2xl font-bold tracking-tight text-[#121c18] sm:text-[1.65rem]">
          One destination for articles—crafted like a magazine, delivered on the web.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#4a5c54]">
          Submit drafts, explore the archive, or reach the team. Aidteck keeps the surface editorial so the writing stays
          central.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button className="rounded-full bg-[#121c18] px-6 text-white hover:bg-[#24332c]" asChild>
            <Link href="/articles">Open the archive</Link>
          </Button>
          <Button variant="outline" className="rounded-full border-[#c5ddd4] bg-white px-5" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </section>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {mockTeamMembers.map((member) => (
          <Card
            key={member.id}
            className={`border-[#e2ebe8] bg-white shadow-sm transition-transform hover:-translate-y-0.5 ${editorialCardRadius}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-[#e2ebe8]">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-[#121c18]">{member.name}</p>
                  <p className="text-xs text-[#4a5c54]">{member.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#4a5c54]">{member.bio}</p>
              <p className="mt-3 text-xs text-[#6b7f76]">{member.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
