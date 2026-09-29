import type { MouseEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import Container from '../layout/Container'
import InfraGrid from '../../reactbits/InfraGrid'
import DecryptedText from '../../reactbits/DecryptedText'

export default function Hero() {
  const handleClick = (id: string) => (e: MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-18">
      <InfraGrid className="opacity-90" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 30% 40%, transparent, var(--color-bg) 78%)' }}
      />

      <Container className="relative">
        <div className="max-w-[760px]">
          <p className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink-soft">
            Software&nbsp;·&nbsp;AI&nbsp;·&nbsp;Cloud&nbsp;·&nbsp;Automation
          </p>

          <h1 className="mt-7 text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[54px] lg:text-[68px]">
            Technology built around your{' '}
            <span className="text-accent-deep">
              <DecryptedText
                text="business."
                animateOn="view"
                sequential
                revealDirection="start"
                speed={32}
                maxIterations={8}
                className="text-accent-deep"
                encryptedClassName="text-accent-soft/50"
              />
            </span>
          </h1>

          <p className="mt-7 max-w-[520px] text-[18px] leading-[1.6] text-ink-soft">
            We help European companies design, build, and scale modern digital products — from custom platforms and
            AI-driven automation to the cloud infrastructure that runs them.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              onClick={handleClick('contact')}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-bg transition-colors hover:bg-accent-deep"
            >
              Start a project
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#work"
              onClick={handleClick('work')}
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-[15px] font-medium text-ink transition-colors hover:border-ink"
            >
              Explore our work
            </a>
          </div>

          <p className="mt-8 text-[13px] text-ink-faint">Working with ambitious teams across Europe.</p>
        </div>
      </Container>
    </section>
  )
}
