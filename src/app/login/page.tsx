import { Bookmark, Building2, FileText, Image as ImageIcon } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'
import { LoginForm } from '@/components/auth/login-form'

function getLoginConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#f4faf7] text-[#14211c]',
      panel: 'border border-[#c5ddd4] bg-white shadow-[0_24px_60px_rgba(25,45,40,0.06)]',
      side: 'border border-[#c5ddd4] bg-[#e8f4ef]',
      muted: 'text-[#3d5248]',
      action: 'bg-[#14211c] text-white hover:bg-[#243832]',
      icon: Building2,
      title: 'Access your workspace',
      body: 'Sign in to manage drafts, submissions, and account settings. Sessions stay on this device until you sign out.',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#f9fcfb] text-[#121c18]',
      panel: 'border border-[#e2ebe8] bg-white shadow-[0_28px_70px_rgba(18,40,32,0.07)]',
      side: 'border border-[#cfe5db] bg-[#eef6f3]',
      muted: 'text-[#4a5c54]',
      action: 'bg-[#121c18] text-white hover:bg-[#24332c]',
      icon: FileText,
      title: 'Sign in to Aidteck',
      body:
        'Use your email to open the contributor workspace. Sessions stay on this device until you sign out—same mint-and-ink shell as the homepage.',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      side: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      action: 'bg-[#c8eadf] text-[#07111f] hover:bg-[#b0dfcf]',
      icon: ImageIcon,
      title: 'Enter the studio',
      body: 'Open your creative tools and saved drafts. Sign-in state is stored locally on this device.',
    }
  }
  return {
    shell: 'bg-[#f4faf7] text-[#14211c]',
    panel: 'border border-[#c5ddd4] bg-white shadow-[0_24px_60px_rgba(25,45,40,0.06)]',
    side: 'border border-[#c5ddd4] bg-[#e8f4ef]',
    muted: 'text-[#3d5248]',
    action: 'bg-[#14211c] text-white hover:bg-[#243832]',
    icon: Bookmark,
    title: 'Open your collections',
    body: 'Manage saved resources and notes. We keep your session on this device until you sign out.',
  }
}

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getLoginConfig(productKind)
  const Icon = config.icon

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Icon className="h-8 w-8" />
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {(productKind === 'editorial'
                ? [
                    'Mint surfaces and ink type—aligned with the reader site',
                    'Accessible fields with clear focus rings',
                    'Local session storage for a faster return visit',
                  ]
                : ['Calm chrome matched to this product family', 'Readable forms with strong focus states', 'Lightweight session storage on device']
              ).map((item) => (
                <div
                  key={item}
                  className={
                    productKind === 'editorial'
                      ? 'rounded-[1.5rem] border border-[#e2ebe8] bg-white/80 px-4 py-4 text-sm leading-relaxed text-[#4a5c54]'
                      : 'rounded-[1.5rem] border border-current/10 bg-white/40 px-4 py-4 text-sm backdrop-blur-sm'
                  }
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <LoginForm actionClass={config.action} mutedClass={config.muted} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
