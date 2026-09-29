import type { MouseEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import Container from '../layout/Container'
import InfraGrid from '../../reactbits/InfraGrid'
import DecryptedText from '../../reactbits/DecryptedText'
import SpecularButton from '../../reactbits/SpecularButton'

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
            <SpecularButton
              size="md"
              radius={999}
              tint="#16141c"
              tintOpacity={1}
              textColor="#faf8f5"
              baseColor="#7c1fef"
              lineColor="#c9a6ff"
              shineSize={14}
              proximity={260}
              onClick={handleClick('contact')}
            >
              Start a project
              <ArrowRight size={16} />
            </SpecularButton>
            <SpecularButton
              size="md"
              radius={999}
              tint="#faf8f5"
              tintOpacity={0}
              textColor="#16141c"
              baseColor="#d8d2e2"
              lineColor="#7c1fef"
              shineSize={16}
              proximity={220}
              className="border border-line"
              onClick={handleClick('work')}
            >
              Explore our work
            </SpecularButton>
          </div>

          <p className="mt-8 flex items-center gap-2 text-[13px] text-ink-faint">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Working with ambitious teams across Europe.
          </p>
        </div>
      </Container>
    </section>
  )
}
