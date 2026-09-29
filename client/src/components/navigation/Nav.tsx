import { useEffect, useState, type MouseEvent } from 'react'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import Container from '../layout/Container'
import SpecularButton from '../../reactbits/SpecularButton'
import { useActiveSection } from '../../lib/useActiveSection'

const LINKS = [
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'insights', label: 'Insights' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const activeId = useActiveSection(LINKS.map((l) => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNavClick = (id: string) => (e: MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-line/80 bg-bg/85 backdrop-blur-md' : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-18 items-center justify-between">
        <a
          href="#top"
          onClick={handleNavClick('top')}
          className="flex items-center gap-2.5 font-mono text-sm font-medium uppercase tracking-[0.22em] text-ink"
        >
          <img src="/favicon.svg" alt="" className="h-6 w-auto" />
          Syphar
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={handleNavClick(link.id)}
              className={clsx(
                'relative py-1 text-[14px] transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:content-[""] hover:after:scale-x-100',
                activeId === link.id ? 'text-ink after:scale-x-100' : 'text-ink-soft hover:text-ink',
              )}
              aria-current={activeId === link.id ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <SpecularButton
            size="sm"
            radius={999}
            tint="#16141c"
            tintOpacity={1}
            textColor="#faf8f5"
            baseColor="#7c1fef"
            lineColor="#c9a6ff"
            shineSize={14}
            proximity={200}
            onClick={handleNavClick('contact')}
          >
            Start a project
          </SpecularButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-line bg-bg px-6 pb-8 pt-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={handleNavClick(link.id)}
                className="py-3 text-[17px] text-ink border-b border-line last:border-none"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <SpecularButton
            size="md"
            radius={999}
            tint="#16141c"
            tintOpacity={1}
            textColor="#faf8f5"
            baseColor="#7c1fef"
            lineColor="#c9a6ff"
            shineSize={14}
            proximity={200}
            className="mt-6 w-full"
            onClick={handleNavClick('contact')}
          >
            Start a project
          </SpecularButton>
        </div>
      )}
    </header>
  )
}
