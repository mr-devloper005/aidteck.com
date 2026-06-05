import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: '',
  },
  footer: {
    tagline: 'Curated digital platform',
  },
  hero: {
    badge: 'Fresh updates and insights',
    title: ['A thoughtful home for', 'curated content and discovery.'],
    description: 'A modern platform for clean discovery, structured publishing, and better browsing.',
    primaryCta: {
      label: 'Start exploring',
      href: '/search',
    },
    secondaryCta: {
      label: 'Learn more',
      href: '/about',
    },
    searchPlaceholder: 'Search pages, updates, and resources',
    focusLabel: 'Focus',
    featureCardBadge: 'latest cover rotation',
    featureCardTitle: 'Recent updates shape the visual identity of the homepage.',
    featureCardDescription:
      'Recent highlights stay at the center of the experience with a cleaner and more focused browsing flow.',
  },
  home: {
    metadata: {
      title: 'Curated content and discoverable updates',
      description: 'A modern platform for clean discovery, structured publishing, and better browsing.',
      openGraphTitle: 'Curated content and discoverable updates',
      openGraphDescription:
        'Discover connected content through a calm, readable, and easy-to-explore experience.',
      keywords: ['content platform', 'curated content', 'digital discovery', 'knowledge hub'],
    },
    introBadge: 'About the platform',
    introTitle: 'Built for reading, browsing, and discovering connected content.',
    introParagraphs: [
      'This platform brings together reading, visual browsing, and structured discovery so visitors can move naturally through content.',
      'Instead of disconnected sections, everything stays connected in one place with consistent navigation and easier exploration.',
      'Whether someone starts with a post, a highlight, or a resource page, they can keep discovering related content without friction.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Reading-first homepage with clear visual hierarchy.',
      'Connected sections for updates, highlights, and supporting resources.',
      'Cleaner browsing rhythm designed to make exploration feel easier.',
      'Lightweight interactions that keep the experience fast and readable.',
    ],
    primaryLink: {
      label: 'Browse updates',
      href: '/search',
    },
    secondaryLink: {
      label: 'Open about page',
      href: '/about',
    },
  },
  cta: {
    badge: 'Start exploring',
    title: 'Explore updates, highlights, and resources through one connected experience.',
    description: 'A modern platform for clean discovery, structured publishing, and better browsing.',
    primaryCta: {
      label: 'Explore now',
      href: '/search',
    },
    secondaryCta: {
      label: 'Contact Sales',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Curated updates',
    description: 'A modern platform for clean discovery, structured publishing, and better browsing.',
  },
  listing: {
    title: 'Curated updates',
    description: 'A modern platform for clean discovery, structured publishing, and better browsing.',
  },
  classified: {
    title: 'Curated updates',
    description: 'A modern platform for clean discovery, structured publishing, and better browsing.',
  },
  image: {
    title: 'Curated updates',
    description: 'A modern platform for clean discovery, structured publishing, and better browsing.',
  },
  profile: {
    title: 'Curated updates',
    description: 'A modern platform for clean discovery, structured publishing, and better browsing.',
  },
  sbm: {
    title: 'Curated updates',
    description: 'A modern platform for clean discovery, structured publishing, and better browsing.',
  },
  pdf: {
    title: 'Curated updates',
    description: 'A modern platform for clean discovery, structured publishing, and better browsing.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Curated updates and discoverable pages',
    paragraphs: [
      'Explore discoverable pages across categories with cleaner structure and easier scanning.',
      'Each section connects naturally with the rest of the platform so supporting information stays easy to reach.',
      'Browse by category to compare updates in context and continue to related content without losing your place.',
    ],
    links: [
      { label: 'Open search', href: '/search' },
      { label: 'Learn more', href: '/about' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
  article: {
    title: 'Readable, structured, and connected content',
    paragraphs: [
      'This section is built for thoughtful reading, explainers, and practical guides across topics.',
      'Content stays connected so deeper reading can lead naturally into related discovery.',
      'Browse updates, revisit useful writing, and continue to supporting content when you want more context.',
    ],
    links: [
      { label: 'Open search', href: '/search' },
      { label: 'Learn more', href: '/about' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
  classified: {
    title: 'Timely updates in a fast-scanning format',
    paragraphs: [
      'This section surfaces notices, opportunities, and time-sensitive updates in a quick-to-scan layout.',
      'Short updates connect with deeper pages, helping visitors move from quick context to full detail.',
      'Browse by category to find updates quickly and continue into related sections when needed.',
    ],
    links: [
      { label: 'Open search', href: '/search' },
      { label: 'Learn more', href: '/about' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
  image: {
    title: 'Visual-first content and highlighted updates',
    paragraphs: [
      'Visual content takes the lead here through galleries and image-rich updates.',
      'Each visual surface connects with deeper pages so highlights can become entry points into full context.',
      'Browse the latest visuals, then continue into related pages for more detail.',
    ],
    links: [
      { label: 'Open search', href: '/search' },
      { label: 'Learn more', href: '/about' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
  profile: {
    title: 'Identity pages and trust-focused context',
    paragraphs: [
      'Identity pages help visitors understand who is behind the content they are exploring.',
      'These pages act as trust anchors and connect naturally with updates, resources, and related context.',
      'Browse identity pages to understand people and teams more clearly, then continue into connected content.',
    ],
    links: [
      { label: 'Open search', href: '/search' },
      { label: 'Learn more', href: '/about' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
  sbm: {
    title: 'Saved links and curated references',
    paragraphs: [
      'This section collects useful links, tools, and references in a clean text-first browsing format.',
      'Saved items stay connected to the rest of the platform, making deeper discovery easier.',
      'Use this section to organize helpful sources and continue exploring without leaving the broader experience.',
    ],
    links: [
      { label: 'Open search', href: '/search' },
      { label: 'Learn more', href: '/about' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
  pdf: {
    title: 'Downloadable documents and reference files',
    paragraphs: [
      'This library hosts reports, guides, and downloadable files that support learning and discovery.',
      'Document-style resources stay connected with other pages, helping visitors keep context while exploring.',
      'Browse by category to find relevant files quickly and continue into related sections when needed.',
    ],
    links: [
      { label: 'Open search', href: '/search' },
      { label: 'Learn more', href: '/about' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Open search', href: '/search' },
      { label: 'Learn more', href: '/about' },
      { label: 'Contact us', href: '/contact' },
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
      { label: 'Open search', href: '/search' },
      { label: 'Learn more', href: '/about' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Open search', href: '/search' },
      { label: 'Learn more', href: '/about' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
}
