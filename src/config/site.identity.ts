export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'bnd4acecef',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Aidteck',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Article platform',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'An independent article network for thoughtful reporting, essays, and long-form analysis — built for readers who value clarity.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'aidteck.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://aidteck.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

