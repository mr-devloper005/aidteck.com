"use client";

import type { ReactNode } from "react";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ContentImage } from "@/components/shared/content-image";
import { X } from "lucide-react";

export function ImageLightbox({
  src,
  alt,
  trigger,
}: {
  src: string;
  alt: string;
  trigger: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="max-w-6xl border-white/10 bg-black/95 p-0 shadow-2xl"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <div className="relative">
          <DialogClose
            aria-label="Close image preview"
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 transition hover:bg-white"
          >
            <X className="h-4 w-4" />
          </DialogClose>
          <div className="relative max-h-[85vh] min-h-[320px] w-full overflow-hidden rounded-[1.75rem]">
            <ContentImage
              src={src}
              alt={alt}
              className="max-h-[85vh] w-full object-contain"
              intrinsicWidth={1600}
              intrinsicHeight={1100}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
