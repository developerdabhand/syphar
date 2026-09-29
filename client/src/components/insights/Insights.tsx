import Container from '../layout/Container'
import Eyebrow from '../layout/Eyebrow'
import Reveal from '../layout/Reveal'
import { insights } from '../../data/insights'

export default function Insights() {
  return (
    <section id="insights" className="border-t border-line py-24 md:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <Eyebrow>Insights</Eyebrow>
            <h2 className="mt-5 max-w-[560px] text-[30px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink sm:text-[36px]">
              Notes on engineering and product.
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              First pieces coming soon
            </span>
          </Reveal>
        </div>

        <ul className="mt-14 flex flex-col border-t border-line">
          {insights.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 60}>
              <div className="grid gap-3 border-b border-line py-8 sm:grid-cols-12 sm:items-baseline sm:gap-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-deep sm:col-span-2">
                  {item.category}
                </span>
                <h3 className="font-serif text-[21px] italic leading-snug text-ink sm:col-span-7">{item.title}</h3>
                <p className="text-[14px] leading-[1.6] text-ink-soft sm:col-span-3">{item.summary}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
