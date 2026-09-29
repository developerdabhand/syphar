import { useEffect, useState, type MouseEvent } from 'react'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import Container from '../layout/Container'
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
          className="font-mono text-sm font-medium uppercase tracking-[0.22em] text-ink"
        >
          Syphar
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={handleNavClick(link.id)}
              className={clsx(
                'text-[14px] transition-colors',
                activeId === link.id ? 'text-ink' : 'text-ink-soft hover:text-ink',
              )}
              aria-current={activeId === link.id ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={handleNavClick('contact')}
            className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-bg transition-colors hover:bg-accent-deep"
          >
            Start a project
          </a>
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
          <a
            href="#contact"
            onClick={handleNavClick('contact')}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3.5 text-[15px] font-medium text-bg"
          >
            Start a project
          </a>
        </div>
      )}
    </header>
  )
}
