import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

const values = [
  { title: "Curated for clarity", description: "We focus on trustworthy, readable content that is easy to browse." },
  { title: "Designed for focus", description: "A clean and calm interface helps visitors discover what matters quickly." },
  { title: "Built for continuity", description: "Every page stays connected so discovery feels smooth from start to finish." },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a modern platform for creators, communities, and curated digital discovery.`}
      actions={
        <>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Our Story</Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              A single home for knowledge and discovery.
            </h2>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.name} brings together publishing, discovery, and curation in one simple experience, so visitors can
              explore content without distractions.
            </p>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </PageShell>
  );
}
