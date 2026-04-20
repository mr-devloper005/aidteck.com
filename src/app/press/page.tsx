'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PageShell } from '@/components/shared/page-shell'
import { editorialCardClass, editorialInsetClass } from '@/components/shared/editorial-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <PageShell
      eyebrow="Media"
      title="Press & brand"
      description="Logos, screenshots, and coverage—presented in the same mint-and-ink system as the rest of Aidteck."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className={editorialCardClass}>
          <CardContent className="space-y-4 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#121c18]">Press kit</h2>
            <p className="text-sm leading-relaxed text-[#4a5c54]">
              Download logos, product screenshots, and brand guidelines for editorial use. Prefer the wordmark on light mint
              backgrounds when possible.
            </p>
            <div className="grid gap-3">
              {mockPressAssets.map((asset) => (
                <div key={asset.id} className={editorialInsetClass}>
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#121c18]">{asset.title}</p>
                      <p className="text-xs text-[#4a5c54]">{asset.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="rounded-full border-[#cfe5db] bg-[#eef6f3] text-[#24332c]">
                        {asset.fileType}
                      </Badge>
                      <Button size="sm" variant="outline" onClick={() => setActiveAssetId(asset.id)}>
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          toast({
                            title: 'Download started',
                            description: `${asset.title} is downloading.`,
                          })
                        }
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {mockPressCoverage.map((item) => (
            <Card key={item.id} className={`${editorialCardClass} transition-transform hover:-translate-y-0.5`}>
              <CardContent className="p-6 sm:p-7">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7f76]">{item.outlet}</div>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[#121c18]">{item.headline}</p>
                <p className="mt-2 text-xs text-[#4a5c54]">{item.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl border-[#e2ebe8] bg-[#fcfefd]">
          <DialogHeader>
            <DialogTitle>{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[#e2ebe8] bg-[#f4faf7]">
              <Image
                src={activeAsset.previewUrl}
                alt={activeAsset.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <p className="text-sm leading-relaxed text-[#4a5c54]">{activeAsset?.description}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
