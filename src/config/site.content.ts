import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Ideas worth publishing',
    centerLinks: [
      { label: 'Homepage', href: '/' },
      { label: 'News', href: '/articles' },
      { label: 'About us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    submitCta: { label: 'Submit article', href: '/dashboard/articles/new' },
  },
  footer: {
    tagline: 'Independent publishing for modern readers',
    ctaTitle: 'Get in touch',
    ctaDescription: 'Questions about submissions, partnerships, or editorial standards—we read every note.',
    ctaButton: { label: 'Contact the desk', href: '/contact' },
  },
  hero: {
    badge: 'Open submissions · Peer-reviewed tone',
    title: ['Submit your article and', 'join our network'],
    description:
      'Aidteck is a calm, reader-first magazine surface for analysis, reporting, and long-form essays—built for clarity, not clutter.',
    primaryCta: {
      label: 'Submit article',
      href: '/dashboard/articles/new',
    },
    secondaryCta: {
      label: 'Browse news',
      href: '/articles',
    },
    searchPlaceholder: 'Search articles, topics, and authors',
    focusLabel: 'Focus',
    featureCardBadge: 'Cover rotation',
    featureCardTitle: 'Fresh stories set the tone of the homepage.',
    featureCardDescription:
      'The lead story and supporting picks refresh often so returning readers always see something new—without changing how content is stored or delivered.',
  },
  home: {
    metadata: {
      title: 'Aidteck — articles, analysis, and long-form reporting',
      description:
        'An editorial network for thoughtful articles: news, advice, and in-depth stories with generous typography and a calm reading rhythm.',
      openGraphTitle: 'Aidteck — articles and independent journalism',
      openGraphDescription:
        'Read and submit long-form articles on Aidteck. A mint-and-ink editorial experience focused on clarity and craft.',
      keywords: ['Aidteck', 'articles', 'editorial', 'long-form', 'independent publishing', 'news'],
    },
    introBadge: 'Why Aidteck',
    introTitle: 'A single lane for serious reading—no marketplace noise.',
    introParagraphs: [
      'Aidteck is tuned for essays, explainers, and reported pieces. The layout borrows from print magazines: strong headlines, confident whitespace, and imagery that supports the story.',
      'Everything here is article-shaped. You will not find classifieds, listings, or social feeds competing for attention in the main navigation—just publishing, discovery, and contact.',
      'Whether you are browsing on a phone or a large display, the rhythm stays consistent: readable line lengths, soft motion, and clear hierarchy.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Editorial hero with collage imagery and a clear submit path.',
      'Popular works strip with author-forward presentation.',
      'Category filters that deep-link into the news index without extra JavaScript.',
      'Lightweight CSS motion—no heavy animation libraries.',
    ],
    primaryLink: {
      label: 'Browse all articles',
      href: '/articles',
    },
    secondaryLink: {
      label: 'About the publication',
      href: '/about',
    },
    popularWorksTitle: 'Popular works',
    newPublishedTitle: 'New published articles',
    categoryTabAll: 'All categories',
    popularAuthors: [
      { name: 'Nina Park', initials: 'NP' },
      { name: 'Jordan Avery', initials: 'JA' },
      { name: 'Sam Okonkwo', initials: 'SO' },
      { name: 'Riley Chen', initials: 'RC' },
    ],
  },
  cta: {
    badge: 'Read with intention',
    title: 'One destination for articles—crafted like a magazine, delivered on the web.',
    description:
      'Submit drafts, explore the archive, or reach the team. Aidteck keeps the surface editorial so the writing stays central.',
    primaryCta: {
      label: 'Open the archive',
      href: '/articles',
    },
    secondaryCta: {
      label: 'Contact',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'News & articles',
    description: 'Browse reporting, essays, and explainers from Aidteck—organized for comfortable reading.',
  },
  listing: {
    title: 'Listings and discoverable pages',
    description: 'Structured discovery pages when enabled for this deployment.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Short-form notices when enabled for this deployment.',
  },
  image: {
    title: 'Images and visual posts',
    description: 'Visual-first posts when enabled for this deployment.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Identity and profile surfaces when enabled for this deployment.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Bookmark-style resources when enabled for this deployment.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Document library when enabled for this deployment.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Listings connect naturally with articles, images, resources, and other content types so supporting information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context, discover related content, and move between formats without losing your place.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'About Aidteck', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This index collects reporting, essays, guides, and explainers in one calm reading surface. Filters help you move between topics without losing the editorial frame.',
      'Every card uses the same underlying post model as the rest of the platform—only the presentation is tuned for long-form scanning and slower pacing.',
      'Start from a category, open a story, then continue through related pieces using the same routes and APIs you would on any sibling site.',
    ],
    links: [
      { label: 'Submit an article', href: '/dashboard/articles/new' },
      { label: 'Site search', href: '/search' },
      { label: 'Editorial contact', href: '/contact' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Images take the lead in this section through galleries, visual posts, and story-led content where imagery carries the experience.',
      'These posts connect with articles and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories for more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'News index', href: '/articles' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a brand or creator and help visitors understand who is behind the content they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with stories and resources.',
      'Browse profiles to understand people and brands more clearly, then continue into related content from the same source.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Search', href: '/search' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Contact', href: '/contact' },
      { label: 'Search', href: '/search' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with stories and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Team directory', href: '/team' },
      { label: 'Contact', href: '/contact' },
    ],
  },
}
