import type { MouseEvent } from 'react'
import { services } from '../../data/services'
import Container from '../layout/Container'

const LEGAL_PENDING = ['Terms of Service']

function scrollTo(id: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-bg py-16">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="flex items-center gap-2.5 font-mono text-sm font-medium uppercase tracking-[0.22em] text-ink">
              <img src="/logo-96.png" alt="" width={32} height={32} loading="lazy" className="h-8 w-8" />
              Syphar
            </p>
            <p className="mt-4 max-w-[240px] text-[14px] leading-[1.7] text-ink-soft">
              A technology partner for ambitious European businesses — software, AI, and cloud, built around how you
              actually work.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">Services</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a href="#services" onClick={scrollTo('services')} className="text-[14px] text-ink-soft hover:text-ink">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">Company</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a href="#work" onClick={scrollTo('work')} className="text-[14px] text-ink-soft hover:text-ink">
                  Work
                </a>
              </li>
              <li>
                <a href="#about" onClick={scrollTo('about')} className="text-[14px] text-ink-soft hover:text-ink">
                  About
                </a>
              </li>
              <li>
                <a href="#insights" onClick={scrollTo('insights')} className="text-[14px] text-ink-soft hover:text-ink">
                  Insights
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">Contact</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a href="#contact" onClick={scrollTo('contact')} className="text-[14px] text-ink-soft hover:text-ink">
                  Start a project
                </a>
              </li>
              <li className="pt-1 text-[13px] text-ink-faint">Working across European time zones</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-ink-faint">
            &copy; {year} Syphar. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a href="/privacy.html" className="text-[13px] text-ink-faint hover:text-ink-soft">
                Privacy Policy
              </a>
            </li>
            {LEGAL_PENDING.map((item) => (
              <li key={item} className="text-[13px] text-ink-faint" title="Published soon">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
