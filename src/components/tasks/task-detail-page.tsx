import { ContentImage } from "@/components/shared/content-image";
import { ImageLightbox } from "@/components/shared/image-lightbox";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Globe, Phone, Tag, Mail } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG, getTaskConfig, type TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { cn } from "@/lib/utils";
import { ArticleComments } from "@/components/tasks/article-comments";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { getFactoryState } from "@/design/factory/get-factory-state";
import { getProductKind } from "@/design/factory/get-product-kind";
import { DirectoryTaskDetailPage } from "@/design/products/directory/task-detail-page";
import { TASK_DETAIL_PAGE_OVERRIDE_ENABLED, TaskDetailPageOverride } from "@/overrides/task-detail-page";

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
  latitude?: number | string;
  longitude?: number | string;
};

const isValidImageUrl = (value?: string | null) =>
  typeof value === "string" && (value.startsWith("/") || /^https?:\/\//i.test(value));

const absoluteUrl = (value?: string | null) => {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (!value.startsWith("/")) return null;
  return `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${value}`;
};

const getContent = (post: SitePost): PostContent => {
  const content = post.content && typeof post.content === "object" ? post.content : {};
  return content as PostContent;
};

const formatArticleHtml = (content: PostContent, post: SitePost) => {
  const raw =
    (typeof content.body === "string" && content.body.trim()) ||
    (typeof content.description === "string" && content.description.trim()) ||
    (typeof post.summary === "string" && post.summary.trim()) ||
    "";

  return formatRichHtml(raw, "Details coming soon.");
};

const getImageUrls = (post: SitePost, content: PostContent) => {
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

export async function TaskDetailPage({ task, slug }: { task: TaskKey; slug: string }) {
  if (TASK_DETAIL_PAGE_OVERRIDE_ENABLED) {
    return await TaskDetailPageOverride({ task, slug });
  }

  const taskConfig = getTaskConfig(task);
  let post: SitePost | null = null;
  try {
    post = await fetchTaskPostBySlug(task, slug);
  } catch (error) {
    console.warn("Failed to load post detail", error);
  }

  if (!post) {
    notFound();
  }

  const content = getContent(post);
  const isClassified = task === "classified";
  const isArticle = task === "article";
  const isBookmark = task === "sbm" || task === "social";
  const category = content.category || post.tags?.[0] || taskConfig?.label || task;
  const description = content.description || post.summary || "Details coming soon.";
  const detailHtml = formatRichHtml(
    content.body || content.description || post.summary,
    "Details coming soon."
  );
  const articleHtml = isArticle ? formatArticleHtml(content, post) : "";
  const articleSummary = post.summary || (typeof content.excerpt === "string" ? content.excerpt : "") || "";
  const articleAuthor =
    (typeof content.author === "string" && content.author.trim()) || post.authorName || "Editorial Team";
  const articleDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const postTags = Array.isArray(post.tags) ? post.tags.filter((tag) => typeof tag === "string") : [];
  const location = content.address || content.location;
  const images = getImageUrls(post, content);
  const mapEmbedUrl = buildMapEmbedUrl(content.latitude, content.longitude, location);
  const hideSidebar = isClassified || isArticle || task === "image" || isBookmark;
  const related = (await fetchTaskPosts(task, 6))
    .filter((item) => item.slug !== post.slug)
    .filter((item) => {
      if (!content.category) return true;
      const itemContent = getContent(item);
      return itemContent.category === content.category;
    })
    .slice(0, 3);
  const articleUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${taskConfig?.route || "/articles"}/${post.slug}`;
  const articleImage = absoluteUrl(images[0]) || absoluteUrl(SITE_CONFIG.defaultOgImage);
  const articleSchema = isArticle
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: articleSummary || description,
        image: articleImage ? [articleImage] : [],
        author: {
          "@type": "Person",
          name: articleAuthor,
        },
        datePublished: post.publishedAt || undefined,
        dateModified: post.publishedAt || undefined,
        articleSection: category,
        keywords: postTags.join(", "),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
      }
    : null;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.baseUrl.replace(/\/$/, ""),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: taskConfig?.label || "Posts",
        item: `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${taskConfig?.route || "/"}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${taskConfig?.route || "/posts"}/${post.slug}`,
      },
    ],
  };
  const schemaPayload = articleSchema ? [articleSchema, breadcrumbSchema] : breadcrumbSchema;
  const { recipe } = getFactoryState();
  const productKind = getProductKind(recipe);

  if (productKind === "directory" && (task === "listing" || task === "classified" || task === "profile")) {
    return (
      <div className="min-h-screen bg-[#f8fbff]">
        <NavbarShell />
        <DirectoryTaskDetailPage
          task={task}
          taskLabel={taskConfig?.label || task}
          taskRoute={taskConfig?.route || "/"}
          post={post}
          description={description}
          category={category}
          images={images}
          mapEmbedUrl={mapEmbedUrl}
          related={related}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SchemaJsonLd data={schemaPayload} />
        <Link
          href={taskConfig?.route || "/"}
          className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to {taskConfig?.label || "posts"}
        </Link>

        <div className={cn("grid gap-10", hideSidebar ? "lg:grid-cols-1" : "lg:grid-cols-[2fr_1fr]")}>
          <div className={cn("space-y-8", isClassified ? "mx-auto w-full" : "")}>
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
                      <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[1.5rem] border border-[#ecdccf] bg-white/85 p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8f6c59]">
                            Written by
                          </p>
                          <p className="mt-2 text-sm font-semibold text-[#251813]">{articleAuthor}</p>
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
                                alt={`${post.title} featured image`}
                                fill
                                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                                intrinsicWidth={1200}
                                intrinsicHeight={1500}
                              />
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-5 text-white">
                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                                  Visual preview
                                </p>
                                <p className="mt-2 text-sm leading-6 text-white/90">
                                  Click to open the image in a larger popup view.
                                </p>
                              </div>
                            </button>
                          }
                        />
                      ) : null}
                    </div>
                  </div>
                </section>

                {postTags.length ? (
                  <div className="flex flex-wrap gap-2">
                    {postTags.map((tag) => (
                      <Badge key={tag} variant="outline" className="rounded-full px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : null}

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_290px]">
                  <article className="rounded-[2rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)] sm:p-8">
                    <RichContent
                      html={articleHtml}
                      className="leading-8 prose-p:my-6 prose-h2:my-8 prose-h3:my-6 prose-ul:my-6"
                    />
                  </article>
                  <aside className="space-y-4">
                    <div className="rounded-[1.75rem] border border-border bg-card/80 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Article snapshot
                      </p>
                      <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                        <div>
                          <p className="font-semibold text-foreground">Category</p>
                          <p className="mt-1">{category}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Author</p>
                          <p className="mt-1">{articleAuthor}</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[1.75rem] border border-border bg-card/80 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Keep exploring
                      </p>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        Browse more stories in this lane or jump into related posts below.
                      </p>
                      {taskConfig?.route ? (
                        <Button className="mt-4 w-full" asChild>
                          <Link href={taskConfig.route}>Browse all {taskConfig.label}</Link>
                        </Button>
                      ) : null}
                    </div>
                  </aside>
                </div>

                <ArticleComments slug={post.slug} />
              </div>
            ) : null}

            {!isArticle ? (
              <>
                <div
                  className={cn(
                    "overflow-hidden rounded-[2rem] border border-border/70 bg-card/90 shadow-[0_18px_45px_rgba(15,23,42,0.05)]",
                    isClassified ? "mx-auto w-full max-w-4xl" : "mt-6"
                  )}
                >
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
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                      A clearer detail page built for scanning, contact actions, and richer post content.
                    </p>
                  </div>
                  <div className="p-6 sm:p-8">
                    <RichContent html={detailHtml} className="max-w-none" />
                  </div>
                </div>
              </>
            ) : null}

            {isClassified ? (
              <div className="mx-auto w-full max-w-4xl rounded-2xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground">Business details</h2>
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
            ) : null}

            {content.highlights?.length && !isArticle ? (
              <div
                className={cn(
                  "mt-8 rounded-2xl border border-border bg-card p-6",
                  isClassified ? "mx-auto w-full max-w-4xl" : ""
                )}
              >
                <h2 className="text-lg font-semibold text-foreground">Highlights</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {content.highlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {isClassified && mapEmbedUrl ? (
              <div className="mx-auto w-full max-w-4xl rounded-2xl border border-border bg-card p-4">
                <p className="text-sm font-semibold text-foreground">Location map</p>
                <div className="mt-4 overflow-hidden rounded-xl border border-border">
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

          {!hideSidebar ? (
            <aside className="space-y-6">
              {mapEmbedUrl ? (
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-sm font-semibold text-foreground">Location map</p>
                  <div className="mt-4 overflow-hidden rounded-xl border border-border">
                    <iframe
                      title="Business location map"
                      src={mapEmbedUrl}
                      className="h-56 w-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : null}
            </aside>
          ) : null}
        </div>

        <section className="mt-12">
          {related.length ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">More in {category}</h2>
                {taskConfig?.route ? (
                  <Link
                    href={taskConfig.route}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    View all
                  </Link>
                ) : null}
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <TaskPostCard key={item.id} post={item} href={buildPostUrl(task, item.slug)} />
                ))}
              </div>
            </>
          ) : null}
          <nav className="mt-6 rounded-2xl border border-border bg-card/60 p-4">
            <p className="text-sm font-semibold text-foreground">Related links</p>
            <ul className="mt-2 space-y-2 text-sm">
              {related.map((item) => (
                <li key={`link-${item.id}`}>
                  <Link
                    href={buildPostUrl(task, item.slug)}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              {taskConfig?.route ? (
                <li>
                  <Link
                    href={taskConfig.route}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Browse all {taskConfig.label}
                  </Link>
                </li>
              ) : null}
              <li>
                <Link
                  href={`/search?q=${encodeURIComponent(category)}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Search more in {category}
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </main>
      <Footer />
    </div>
  );
}
