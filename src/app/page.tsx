import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bookmark, Building2, Compass, FileText, Globe2, Image as ImageIcon, LayoutGrid, MapPin, ShieldCheck, Tag, User } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind, type ProductKind } from '@/design/factory/get-product-kind'
import type { SitePost } from '@/lib/site-connector'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type EnabledTask = (typeof SITE_CONFIG.tasks)[number]
type TaskFeedItem = { task: EnabledTask; posts: SitePost[] }

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: Bookmark,
  classified: Tag,
  image: ImageIcon,
  profile: User,
}

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (value === 'listing' || value === 'classified' || value === 'article' || value === 'image' || value === 'profile' || value === 'sbm') return value
  return fallback
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
    ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
    ? (post.content as any).logo
    : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getPostMeta(post?: SitePost | null) {
  if (!post || typeof post.content !== 'object' || !post.content) return { location: '', category: '' }
  const content = post.content as Record<string, unknown>
  return {
    location: typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : '',
    category: typeof content.category === 'string' ? content.category : typeof post.tags?.[0] === 'string' ? post.tags[0] : '',
  }
}

function getDirectoryTone(brandPack: string) {
  if (brandPack === 'market-utility') {
    return {
      shell: 'bg-[#f5f7f1] text-[#1f2617]',
      hero: 'bg-[linear-gradient(180deg,#eef4e4_0%,#f8faf4_100%)]',
      panel: 'border border-[#d5ddc8] bg-white shadow-[0_24px_64px_rgba(64,76,34,0.08)]',
      soft: 'border border-[#d5ddc8] bg-[#eff3e7]',
      muted: 'text-[#5b664c]',
      title: 'text-[#1f2617]',
      badge: 'bg-[#1f2617] text-[#edf5dc]',
      action: 'bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
      actionAlt: 'border border-[#d5ddc8] bg-white text-[#1f2617] hover:bg-[#eef3e7]',
    }
  }
  return {
    shell: 'bg-[#f8fbff] text-slate-950',
    hero: 'bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_100%)]',
    panel: 'border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.08)]',
    soft: 'border border-slate-200 bg-slate-50',
    muted: 'text-slate-600',
    title: 'text-slate-950',
    badge: 'bg-slate-950 text-white',
    action: 'bg-slate-950 text-white hover:bg-slate-800',
    actionAlt: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-100',
  }
}

function getEditorialTone() {
  return {
    shell: 'bg-[#f9fcfb] text-[#121c18]',
    panel: 'border border-[#c8ddd4] bg-white shadow-[0_22px_58px_rgba(18,40,32,0.08)]',
    soft: 'border border-[#cfe5db] bg-[#f1f8f5]',
    heroInset: 'bg-[#e6f2ee]',
    muted: 'text-[#4a5c54]',
    title: 'text-[#121c18]',
    badge: 'bg-[#121c18] text-white',
    action: 'bg-[#121c18] text-white hover:bg-[#24332c]',
    actionAlt: 'border border-[#b9d4c9] bg-white text-[#121c18] hover:bg-[#eef6f3]',
    overlay: 'bg-gradient-to-t from-black/82 via-black/28 to-transparent',
  }
}

function getVisualTone() {
  return {
    shell: 'bg-[#07101f] text-white',
    panel: 'border border-white/10 bg-[rgba(11,18,31,0.78)] shadow-[0_28px_80px_rgba(0,0,0,0.35)]',
    soft: 'border border-white/10 bg-white/6',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-[#8df0c8] text-[#07111f]',
    action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    actionAlt: 'border border-white/10 bg-white/6 text-white hover:bg-white/10',
  }
}

function getCurationTone() {
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4] shadow-[0_24px_60px_rgba(91,56,37,0.08)]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    title: 'text-[#261811]',
    badge: 'bg-[#5b2b3b] text-[#fff0f5]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    actionAlt: 'border border-[#ddcdbd] bg-transparent text-[#261811] hover:bg-[#efe3d6]',
  }
}

function DirectoryHome({ primaryTask, enabledTasks, listingPosts, classifiedPosts, profilePosts, brandPack }: {
  primaryTask?: EnabledTask
  enabledTasks: EnabledTask[]
  listingPosts: SitePost[]
  classifiedPosts: SitePost[]
  profilePosts: SitePost[]
  brandPack: string
}) {
  const tone = getDirectoryTone(brandPack)
  const featuredListings = (listingPosts.length ? listingPosts : classifiedPosts).slice(0, 3)
  const featuredTaskKey: TaskKey = listingPosts.length ? 'listing' : 'classified'
  const quickRoutes = enabledTasks.slice(0, 4)

  return (
    <main>
      <section className={tone.hero}>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
                <Compass className="h-3.5 w-3.5" />
                Local discovery product
              </span>
              <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
                Search businesses, compare options, and act fast without digging through generic feeds.
              </h1>
              <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>

              <div className={`mt-8 grid gap-3 rounded-[2rem] p-4 ${tone.panel} md:grid-cols-[1.25fr_0.8fr_auto]`}>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">What do you need today?</div>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">Choose area or city</div>
                <Link href={primaryTask?.route || '/listings'} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                  Browse now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['Verified businesses', `${featuredListings.length || 3}+ highlighted surfaces`],
                  ['Fast scan rhythm', 'More utility, less filler'],
                  ['Action first', 'Call, visit, shortlist, compare'],
                ].map(([label, value]) => (
                  <div key={label} className={`rounded-[1.4rem] p-4 ${tone.soft}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">{label}</p>
                    <p className="mt-2 text-lg font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className={`rounded-[2rem] p-6 ${tone.panel}`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">Primary lane</p>
                    <h2 className="mt-2 text-3xl font-semibold">{primaryTask?.label || 'Listings'}</h2>
                  </div>
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className={`mt-4 text-sm leading-7 ${tone.muted}`}>{primaryTask?.description || 'Structured discovery for services, offers, and business surfaces.'}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {quickRoutes.map((task) => {
                  const Icon = taskIcons[task.key as TaskKey] || LayoutGrid
                  return (
                    <Link key={task.key} href={task.route} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                      <Icon className="h-5 w-5" />
                      <h3 className="mt-4 text-lg font-semibold">{task.label}</h3>
                      <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Featured businesses</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Strong listings with clearer trust cues.</h2>
          </div>
          <Link href="/listings" className="text-sm font-semibold text-primary hover:opacity-80">Open listings</Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredListings.map((post) => (
            <TaskPostCard key={post.id} post={post} href={getTaskHref(featuredTaskKey, post.slug)} taskKey={featuredTaskKey} />
          ))}
        </div>
      </section>

      <section className={`${tone.shell}`}>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">What makes this different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Built like a business directory, not a recolored content site.</h2>
            <ul className={`mt-6 space-y-3 text-sm leading-7 ${tone.muted}`}>
              <li>Search-first hero instead of a magazine headline.</li>
              <li>Action-oriented listing cards with trust metadata.</li>
              <li>Support lanes for offers, businesses, and profiles.</li>
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(profilePosts.length ? profilePosts : classifiedPosts).slice(0, 4).map((post) => {
              const meta = getPostMeta(post)
              const taskKey = resolveTaskKey(post.task, profilePosts.length ? 'profile' : 'classified')
              return (
                <Link key={post.id} href={getTaskHref(taskKey, post.slug)} className={`overflow-hidden rounded-[1.8rem] ${tone.panel}`}>
                  <div className="relative h-44 overflow-hidden">
                    <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">{meta.category || post.task || 'Profile'}</p>
                    <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                    <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Quick access to local information and related surfaces.'}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

function formatPostDate(post?: SitePost | null) {
  const raw = post?.publishedAt || post?.createdAt
  if (!raw) return ''
  try {
    return new Date(raw).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return ''
  }
}

function EditorialHome({ primaryTask, articlePosts }: { primaryTask?: EnabledTask; articlePosts: SitePost[] }) {
  const tone = getEditorialTone()
  const lead = articlePosts[0]
  const rail = articlePosts.slice(1, 4)
  const popularShow = articlePosts.slice(0, 3)
  const grid = articlePosts.slice(4, 10)
  const heroFrames = [0, 1, 2].map((i) =>
    articlePosts[i] ? getPostImage(articlePosts[i]) : '/placeholder.svg?height=960&width=640'
  )
  const categoryChips = [
    { name: siteContent.home.categoryTabAll, slug: 'all' as const },
    ...CATEGORY_OPTIONS.slice(0, 7),
  ]

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 pb-6 pt-10 sm:px-6 lg:px-8 lg:pb-10 lg:pt-14">
        <div className={`grid gap-10 overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:py-12 ${tone.heroInset}`}>
          <div className="max-w-xl">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white ${tone.badge}`}>
              <FileText className="h-3.5 w-3.5" />
              {siteContent.hero.badge}
            </span>
            <h1 className={`mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.15rem] ${tone.title}`}>
              {siteContent.hero.title[0]} <span className="text-balance">{siteContent.hero.title[1]}</span>
            </h1>
            <p className={`mt-5 text-base leading-8 ${tone.muted}`}>{siteContent.hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={siteContent.hero.primaryCta.href}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-sm transition-transform duration-300 hover:-translate-y-0.5 ${tone.action}`}
              >
                {siteContent.hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={siteContent.hero.secondaryCta.href}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${tone.actionAlt}`}
              >
                {siteContent.hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex h-[min(420px,52vw)] w-full max-w-md items-end justify-center gap-3 sm:max-w-none sm:justify-end lg:h-[460px]">
            <div className="relative h-[88%] w-[30%] translate-y-4 overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(15,32,26,0.12)] sm:w-[28%]">
              <ContentImage
                src={heroFrames[0]}
                alt={articlePosts[0]?.title ? `Illustration for ${articlePosts[0].title}` : 'Editorial photography'}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-[1] h-full w-[34%] overflow-hidden rounded-2xl shadow-[0_28px_70px_rgba(15,32,26,0.16)] sm:w-[32%]">
              <ContentImage
                src={heroFrames[1]}
                alt={articlePosts[1]?.title ? `Illustration for ${articlePosts[1].title}` : 'Editorial photography'}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[78%] w-[30%] -translate-y-2 overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(15,32,26,0.12)] sm:w-[28%]">
              <ContentImage
                src={heroFrames[2]}
                alt={articlePosts[2]?.title ? `Illustration for ${articlePosts[2].title}` : 'Editorial photography'}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 border-b border-[#dce8e4] pb-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5a6b65]">{siteContent.home.sideBadge}</p>
              <h2 className={`mt-2 font-serif text-3xl tracking-[-0.03em] sm:text-4xl ${tone.title}`}>{siteContent.home.popularWorksTitle}</h2>
            </div>
            <Link href={primaryTask?.route || '/articles'} className="text-sm font-semibold text-[#0f1714] underline-offset-4 hover:underline">
              {siteContent.home.primaryLink.label}
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 border-b border-[#cfe5db]/80 pb-8">
            {siteContent.home.popularAuthors.map((author) => (
              <div key={author.name} className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#b9d4c9] bg-white text-sm font-semibold text-[#24332c] shadow-sm">
                  {author.initials}
                </div>
                <span className={`text-sm font-medium ${tone.title}`}>{author.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {popularShow.length
              ? popularShow.map((post) => (
                  <div key={post.id} className={`flex gap-4 rounded-2xl p-5 ${tone.soft}`}>
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#c8ddd4] bg-white">
                      <ContentImage src={getPostImage(post)} alt="" fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4a5c54]">{getPostMeta(post).category || 'Essay'}</p>
                      <p className={`mt-1 font-semibold leading-snug ${tone.title}`}>{post.title}</p>
                      <p className={`mt-2 text-sm leading-relaxed ${tone.muted}`}>
                        {post.summary || 'Contributor-led perspective with room for nuance.'}
                      </p>
                    </div>
                  </div>
                ))
              : ['Field notes', 'Desk analysis', 'Reader letters'].map((label, idx) => (
                  <div key={label} className={`flex gap-4 rounded-2xl p-5 ${tone.soft}`}>
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#c8ddd4] bg-[#e6f2ee]" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4a5c54]">Coming soon</p>
                      <p className={`mt-1 font-semibold leading-snug ${tone.title}`}>{label}</p>
                      <p className={`mt-2 text-sm leading-relaxed ${tone.muted}`}>
                        {['Ideas from contributors this month.', 'Explainers with a sharper point of view.', 'Short reactions to what we published.'][idx]}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {categoryChips.map((cat) => {
            const active = cat.slug === 'all'
            const href = cat.slug === 'all' ? '/articles' : `/articles?category=${cat.slug}`
            return (
              <Link
                key={cat.slug}
                href={href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? `${tone.badge} shadow-sm` : 'border border-[#dce8e4] bg-white text-[#0f1714] hover:border-[#0f1714]/25'
                }`}
              >
                {cat.name}
              </Link>
            )
          })}
        </div>

        {lead ? (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <Link href={`/articles/${lead.slug}`} className={`group relative block min-h-[340px] overflow-hidden rounded-[1.75rem] ${tone.panel}`}>
              <ContentImage src={getPostImage(lead)} alt={lead.title} fill className="object-cover transition duration-700 group-hover:scale-[1.02]" />
              <div className={`absolute inset-0 ${tone.overlay}`} />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">Featured</p>
                <h3 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.03em]">{lead.title}</h3>
                <p className="mt-3 line-clamp-2 text-sm text-white/85">{lead.summary || 'Open the story for the full essay and supporting context.'}</p>
              </div>
            </Link>

            <div className="flex flex-col gap-4">
              {rail.length ? (
                rail.map((post) => (
                  <Link
                    key={post.id}
                    href={`/articles/${post.slug}`}
                    className={`group flex gap-4 rounded-2xl p-4 transition-colors hover:bg-white ${tone.soft}`}
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-[#dce8e4] bg-white">
                      <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5a6b65]">{getPostMeta(post).category || 'Article'}</p>
                      <p className={`mt-1 font-semibold leading-snug ${tone.title}`}>{post.title}</p>
                      <p className={`mt-1 text-xs ${tone.muted}`}>{formatPostDate(post)}</p>
                      <p className={`mt-2 line-clamp-2 text-sm ${tone.muted}`}>{post.summary || 'A concise excerpt from the piece.'}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className={`rounded-2xl p-6 text-sm ${tone.muted}`}>More stories will appear here as they publish.</div>
              )}
            </div>
          </div>
        ) : (
          <div className={`mt-12 rounded-[1.75rem] border border-dashed border-[#c5d9d2] bg-white/80 p-10 text-center ${tone.muted}`}>
            <p className="font-medium text-[#0f1714]">Stories are on the way.</p>
            <p className="mt-2 text-sm">The archive will populate as articles go live—browse categories above or visit the news desk.</p>
            <Link href="/articles" className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ${tone.action}`}>
              Open articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {grid.length ? (
          <div className="mt-16">
            <h2 className={`font-serif text-3xl tracking-[-0.03em] sm:text-4xl ${tone.title}`}>{siteContent.home.newPublishedTitle}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {grid.map((post) => (
                <Link key={post.id} href={`/articles/${post.slug}`} className={`group overflow-hidden rounded-2xl ${tone.soft} transition hover:-translate-y-1 hover:shadow-md`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4a5c54]">{getPostMeta(post).category || 'Story'}</p>
                    <h3 className={`mt-2 text-lg font-semibold leading-snug ${tone.title}`}>{post.title}</h3>
                    <p className={`mt-2 text-xs ${tone.muted}`}>{formatPostDate(post)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-20 rounded-[2rem] border border-[#b9d4c9] bg-[#e6f2ee] px-6 py-12 text-center sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4a5c54]">{siteContent.footer.ctaTitle}</p>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[#2f3f38]">{siteContent.footer.ctaDescription}</p>
          <Link
            href={siteContent.footer.ctaButton.href}
            className={`mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 ${tone.action}`}
          >
            {siteContent.footer.ctaButton.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}

function VisualHome({ primaryTask, imagePosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; imagePosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getVisualTone()
  const gallery = imagePosts.length ? imagePosts.slice(0, 5) : articlePosts.slice(0, 5)
  const creators = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <ImageIcon className="h-3.5 w-3.5" />
              Visual publishing system
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Image-led discovery with creator profiles and a more gallery-like browsing rhythm.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/images'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Meet creators
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.slice(0, 5).map((post, index) => (
              <Link
                key={post.id}
                href={getTaskHref(resolveTaskKey(post.task, 'image'), post.slug)}
                className={index === 0 ? `col-span-2 row-span-2 overflow-hidden rounded-[2.4rem] ${tone.panel}` : `overflow-hidden rounded-[1.8rem] ${tone.soft}`}
              >
                <div className={index === 0 ? 'relative h-[360px]' : 'relative h-[170px]'}>
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Visual notes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Larger media surfaces, fewer boxes, stronger pacing.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>This product avoids business-directory density and publication framing. The homepage behaves more like a visual board, with profile surfaces and imagery leading the experience.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {creators.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-40 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Creator profile and visual identity surface.'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function CurationHome({ primaryTask, bookmarkPosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; bookmarkPosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getCurationTone()
  const collections = bookmarkPosts.length ? bookmarkPosts.slice(0, 4) : articlePosts.slice(0, 4)
  const people = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <Bookmark className="h-3.5 w-3.5" />
              Curated collections
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Save, organize, and revisit resources through shelves, boards, and curated collections.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/sbm'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open collections
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Explore curators
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {collections.map((post) => (
              <Link key={post.id} href={getTaskHref(resolveTaskKey(post.task, 'sbm'), post.slug)} className={`rounded-[1.8rem] p-6 ${tone.panel}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Collection</p>
                <h3 className="mt-3 text-2xl font-semibold">{post.title}</h3>
                <p className={`mt-3 text-sm leading-8 ${tone.muted}`}>{post.summary || 'A calmer bookmark surface with room for context and grouping.'}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Why this feels different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">More like saved boards and reading shelves than a generic post feed.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>The structure is calmer, the cards are less noisy, and the page encourages collecting and returning instead of forcing everything into a fast-scrolling list.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {people.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-32 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>Curator profile, saved resources, and collection notes.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const taskFeed: TaskFeedItem[] = (
    await Promise.all(
      enabledTasks.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 8, { allowMockFallback: false, fresh: true }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]
  const listingPosts = taskFeed.find(({ task }) => task.key === 'listing')?.posts || []
  const classifiedPosts = taskFeed.find(({ task }) => task.key === 'classified')?.posts || []
  const articlePosts = taskFeed.find(({ task }) => task.key === 'article')?.posts || []
  const imagePosts = taskFeed.find(({ task }) => task.key === 'image')?.posts || []
  const profilePosts = taskFeed.find(({ task }) => task.key === 'profile')?.posts || []
  const bookmarkPosts = taskFeed.find(({ task }) => task.key === 'sbm')?.posts || []

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      {productKind === 'directory' ? (
        <DirectoryHome
          primaryTask={primaryTask}
          enabledTasks={enabledTasks}
          listingPosts={listingPosts}
          classifiedPosts={classifiedPosts}
          profilePosts={profilePosts}
          brandPack={recipe.brandPack}
        />
      ) : null}
      {productKind === 'editorial' ? (
        <EditorialHome primaryTask={primaryTask} articlePosts={articlePosts} />
      ) : null}
      {productKind === 'visual' ? (
        <VisualHome primaryTask={primaryTask} imagePosts={imagePosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      {productKind === 'curation' ? (
        <CurationHome primaryTask={primaryTask} bookmarkPosts={bookmarkPosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      <Footer />
    </div>
  )
}
