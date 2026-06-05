import Link from 'next/link'
import { ArrowRight, Zap, ShieldCheck, Globe2 } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'

export const HOME_PAGE_OVERRIDE_ENABLED = true

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (value === 'listing' || value === 'classified' || value === 'article' || value === 'image' || value === 'profile' || value === 'sbm') return value
  return fallback
}

function getPostImage(post: any) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item: any) => typeof item?.url === 'string' && item.url)?.url
  const contentImages = Array.isArray(post?.content?.images) ? post.content.images : []
  return mediaUrl || contentImages[0] || '/placeholder.jpg'
}

export async function HomePageOverride() {
  const tasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const primary = tasks[0]
  const secondary = tasks.slice(1, 4)

  const settledFeed = await Promise.allSettled(
    tasks.slice(0, 4).map(async (task) => ({
      task,
      posts: await fetchTaskPosts(task.key, 4, { allowMockFallback: true, fresh: true }),
    }))
  )

  const feed = settledFeed
    .filter((result): result is PromiseFulfilledResult<{ task: (typeof tasks)[number]; posts: any[] }> => result.status === 'fulfilled')
    .map((result) => result.value)

  const featured = feed.flatMap((item) => item.posts).slice(0, 3)
  const spotlight = featured[0]

  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_0%_0%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_100%_0%,rgba(59,130,246,0.18),transparent_24%),linear-gradient(180deg,#f5fcff_0%,#ffffff_44%,#ecfeff_100%)]">
      <div className="pointer-events-none absolute -left-24 top-28 h-64 w-64 rounded-full bg-cyan-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-8 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />

      <section className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">
              Welcome to aidteck, a smarter and cleaner way to discover what matters.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Discover trusted resources, fresh posts, and actionable listings in a cleaner, bolder flow designed for speed and clarity.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primary?.route || '/search'} className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                Explore
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Learn More
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Zap, label: 'Faster Discovery', value: 'Optimized front-page flow' },
                { icon: ShieldCheck, label: 'Trust Focused', value: 'Stronger content curation' },
                { icon: Globe2, label: 'Always Fresh', value: 'Live multi-task feed surfaces' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-cyan-100 bg-white/85 p-4 shadow-sm">
                  <item.icon className="h-4 w-4 text-cyan-600" />
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {spotlight ? (
              <Link href={`/${resolveTaskKey(spotlight.task, primary?.key || 'article')}/${spotlight.slug}`} className="overflow-hidden rounded-[2rem] border border-cyan-100 bg-white shadow-[0_24px_70px_rgba(2,132,199,0.14)]">
                <div className="relative h-72">
                  <ContentImage src={getPostImage(spotlight)} alt={spotlight.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">Spotlight Story</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">{spotlight.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-7 text-slate-600">{spotlight.summary || 'A high-priority featured update from the platform.'}</p>
                </div>
              </Link>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              {secondary.map((task) => (
                <Link key={task.key} href={task.route} className="rounded-2xl border border-cyan-100 bg-white/85 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">{task.label}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{task.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.2rem] border border-slate-200 bg-white/90 p-7 shadow-[0_20px_55px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Fresh picks</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-950">Featured content across active categories</h2>
            </div>
            <Link href="/search" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">
              Open global search
            </Link>
          </div>

          <div className="mt-7 grid gap-6 lg:grid-cols-3">
            {featured.map((post) => (
              <TaskPostCard
                key={post.id}
                post={post}
                taskKey={resolveTaskKey(post.task, primary?.key || 'article')}
                href={`/${resolveTaskKey(post.task, primary?.key || 'article')}/${post.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
