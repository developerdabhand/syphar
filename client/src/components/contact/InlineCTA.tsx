import { ArrowRight } from 'lucide-react'
import Container from '../layout/Container'
import Reveal from '../layout/Reveal'

export default function InlineCTA() {
  return (
    <section className="border-t border-line bg-accent-tint/60 py-14 md:py-16">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-ink sm:text-[28px]">
              Have something similar in mind?
            </h2>
            <p className="mt-2 max-w-[520px] text-[15px] leading-[1.6] text-ink-soft">
              Send us a few lines about what you&rsquo;re building. You&rsquo;ll hear back from an engineer within one
              business day.
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-ink px-7 text-[15px] font-semibold text-bg transition-colors hover:bg-accent-deep"
          >
            Tell us about your project
            <ArrowRight size={16} />
          </a>
        </Reveal>
      </Container>
    </section>
  )
}
