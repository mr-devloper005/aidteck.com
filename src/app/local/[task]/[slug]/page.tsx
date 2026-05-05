"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { MapPin, Globe, Phone, Tag, Mail } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { TaskImageCarousel } from "@/components/tasks/task-image-carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContentImage } from "@/components/shared/content-image";
import { ImageLightbox } from "@/components/shared/image-lightbox";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { SITE_CONFIG, type TaskKey } from "@/lib/site-config";
import { getLocalPostBySlug } from "@/lib/local-posts";

type PostContent = {
  category?: string;
  location?: string;
  address?: string;
  website?: string;
  phone?: string;
  email?: string;
  description?: string;
  body?: string;
  excerpt?: string;
  author?: string;
  highlights?: string[];
  logo?: string;
  images?: string[];
  fileUrl?: string;
  latitude?: number | string;
  longitude?: number | string;
};

const isValidImageUrl = (value?: string | null) =>
  typeof value === "string" && (value.startsWith("/") || /^https?:\/\//i.test(value));

const getContent = (post: any): PostContent => {
  const content = post?.content && typeof post.content === "object" ? post.content : {};
  return content as PostContent;
};

const getImageUrls = (post: any, content: PostContent) => {
  const media = Array.isArray(post.media) ? post.media : [];
  const mediaImages = media
    .map((item) => item?.url)
    .filter((url): url is string => isValidImageUrl(url));
  const contentImages = Array.isArray(content.images)
    ? content.images.filter((url): url is string => isValidImageUrl(url))
    : [];
  const merged = [...mediaImages, ...contentImages];
  if (merged.length) return merged;
  if (isValidImageUrl(content.logo)) return [content.logo as string];
  return ["/placeholder.svg?height=900&width=1400"];
};

const toNumber = (value?: number | string) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const buildMapEmbedUrl = (
  latitude?: number | string,
  longitude?: number | string,
  address?: string
) => {
  const lat = toNumber(latitude);
  const lon = toNumber(longitude);
  const normalizedAddress = typeof address === "string" ? address.trim() : "";
  const googleMapsEmbedApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY?.trim();

  if (googleMapsEmbedApiKey) {
    const query = lat !== null && lon !== null ? `${lat},${lon}` : normalizedAddress;
    if (!query) return null;
    return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(
      googleMapsEmbedApiKey
    )}&q=${encodeURIComponent(query)}`;
  }

  if (lat !== null && lon !== null) {
    const delta = 0.01;
    const left = lon - delta;
    const right = lon + delta;
    const bottom = lat - delta;
    const top = lat + delta;
    const bbox = `${left},${bottom},${right},${top}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
      bbox
    )}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lon}`)}`;
  }

  if (normalizedAddress) {
    return `https://www.google.com/maps?q=${encodeURIComponent(normalizedAddress)}&output=embed`;
  }

  return null;
};

export default function LocalPostDetailPage() {
  const params = useParams();
  const task = params?.task as TaskKey;
  const slug = params?.slug as string;
  const taskConfig = SITE_CONFIG.tasks.find((item) => item.key === task);
  const post = getLocalPostBySlug(task, slug);

  const content = useMemo(() => (post ? getContent(post) : {}), [post]);

  if (!post || !taskConfig) {
    return (
      <div className="min-h-screen bg-background">
        <NavbarShell />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Post not found</h1>
          <p className="mt-2 text-muted-foreground">
            This local post is not available on this device.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/">Back home</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const category = content.category || post.tags?.[0] || taskConfig.label;
  const location = content.address || content.location;
  const images = getImageUrls(post, content);
  const isArticle = task === "article";
  const isPdf = task === "pdf";
  const articleSummary = post.summary || content.excerpt || "";
  const articleAuthor = content.author || post.authorName || "Editorial Team";
  const articleDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const detailHtml = formatRichHtml(content.body || content.description || post.summary, "Details coming soon.");
  const mapEmbedUrl = buildMapEmbedUrl(content.latitude, content.longitude, location);

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href={taskConfig.route}
          className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to {taskConfig.label}
        </Link>

        {isArticle ? (
          <div className="mx-auto w-full max-w-6xl space-y-8">
            <section className="overflow-hidden rounded-[2rem] border border-[#e6d7c8] bg-[linear-gradient(180deg,#fffaf4_0%,#fffdf9_100%)] shadow-[0_24px_70px_rgba(89,52,24,0.08)]">
              <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="p-7 sm:p-10 lg:p-12">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#e6d7c8] bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7d5330]">
                    <Tag className="h-3.5 w-3.5" />
                    {category}
                  </div>
                  <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.05em] text-[#251813] sm:text-5xl">
                    {post.title}
                  </h1>
                  {articleSummary ? (
                    <p className="mt-5 max-w-2xl text-base leading-8 text-[#6f584b] sm:text-lg">
                      {articleSummary}
                    </p>
                  ) : null}
                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-[1.5rem] border border-[#ecdccf] bg-white/85 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8f6c59]">
                        Written by
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#251813]">{articleAuthor}</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-[#ecdccf] bg-white/85 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8f6c59]">
                        Published
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#251813]">
                        {articleDate || "Recently updated"}
                      </p>
                    </div>
                    <div className="rounded-[1.5rem] border border-[#ecdccf] bg-white/85 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8f6c59]">
                        Topic
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#251813]">{category}</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-[#ecdccf] bg-[#f7ecdf] p-5 lg:border-l lg:border-t-0 lg:p-6">
                  {images[0] ? (
                    <ImageLightbox
                      src={images[0]}
                      alt={`${post.title} featured image`}
                      trigger={
                        <button
                          type="button"
                          className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-[#e6d7c8] bg-[#e9dacb] text-left"
                          aria-label="Open featured image"
                        >
                          <ContentImage
                            src={images[0]}
                            alt={post.title}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-[1.03]"
                            intrinsicWidth={1200}
                            intrinsicHeight={1500}
                          />
                        </button>
                      }
                    />
                  ) : null}
                </div>
              </div>
            </section>

            <article className="rounded-[2rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)] sm:p-8">
              <RichContent html={detailHtml} className="leading-8 prose-p:my-6 prose-h2:my-8 prose-h3:my-6 prose-ul:my-6" />
            </article>
          </div>
        ) : isPdf ? (
          <div className="mx-auto w-full max-w-4xl">
            <h1 className="text-3xl font-semibold text-foreground">{post.title}</h1>
            <RichContent html={detailHtml} className="mt-2 text-sm" />
            {content.fileUrl ? (
              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white">
                <iframe
                  title={post.title}
                  src={`${content.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="h-[70vh] w-full"
                />
              </div>
            ) : null}
            {content.fileUrl ? (
              <Button className="mt-6" asChild>
                <Link href={content.fileUrl} target="_blank" rel="noreferrer">
                  Download PDF
                </Link>
              </Button>
            ) : null}
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div>
              <TaskImageCarousel images={images} />
              <div className="mt-6 overflow-hidden rounded-[2rem] border border-border/70 bg-card/90 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
                <div className="border-b border-border/70 bg-[linear-gradient(180deg,rgba(255,250,244,0.95),rgba(255,255,255,0.88))] p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="inline-flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5" />
                      {category}
                    </Badge>
                    {location ? (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {location}
                      </span>
                    ) : null}
                  </div>
                  <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
                    {post.title}
                  </h1>
                </div>
                <div className="p-6 sm:p-8">
                  <RichContent html={detailHtml} className="max-w-none" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h2 className="text-base font-semibold text-foreground">Details</h2>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {content.website ? (
                    <div className="flex items-start gap-2">
                      <Globe className="mt-0.5 h-4 w-4" />
                      <a
                        href={content.website}
                        className="break-all text-foreground hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {content.website}
                      </a>
                    </div>
                  ) : null}
                  {content.phone ? (
                    <div className="flex items-start gap-2">
                      <Phone className="mt-0.5 h-4 w-4" />
                      <span>{content.phone}</span>
                    </div>
                  ) : null}
                  {content.email ? (
                    <div className="flex items-start gap-2">
                      <Mail className="mt-0.5 h-4 w-4" />
                      <a
                        href={`mailto:${content.email}`}
                        className="break-all text-foreground hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {content.email}
                      </a>
                    </div>
                  ) : null}
                  {location ? (
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4" />
                      <span>{location}</span>
                    </div>
                  ) : null}
                </div>
              </div>
              {content.highlights?.length ? (
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h2 className="text-base font-semibold text-foreground">Highlights</h2>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {content.highlights.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {mapEmbedUrl ? (
                <div className="rounded-2xl border border-border bg-card p-4">
                  <h2 className="text-base font-semibold text-foreground">Location map</h2>
                  <div className="mt-3 overflow-hidden rounded-xl border border-border">
                    <iframe
                      title="Business location map"
                      src={mapEmbedUrl}
                      className="h-56 w-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
