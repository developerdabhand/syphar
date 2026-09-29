import Container from '../layout/Container'
import Eyebrow from '../layout/Eyebrow'
import Reveal from '../layout/Reveal'
import Orb from '../../reactbits/Orb'
import { processSteps } from '../../data/process'

export default function Process() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <Reveal>
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-5 max-w-[560px] text-[30px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink sm:text-[36px]">
            A process built for clarity, not surprises.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <ol className="flex flex-col border-t border-line">
              {processSteps.map((step, i) => (
                <Reveal as="li" key={step.index} delay={i * 70}>
                  <div className="flex gap-5 border-b border-line py-7">
                    <span className="font-serif text-[26px] italic leading-none text-accent-deep/70">
                      {step.index}
                    </span>
                    <div>
                      <h3 className="text-[18px] font-semibold text-ink">{step.title}</h3>
                      <p className="mt-2 max-w-[360px] text-[14px] leading-[1.65] text-ink-soft">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={140} className="md:col-span-7">
            <div className="relative h-[360px] overflow-hidden rounded-2xl border border-noir-line bg-noir sm:h-[440px] md:h-full md:min-h-[520px]">
              <Orb hue={0} hoverIntensity={0.35} rotateOnHover backgroundColor="#0e0c13" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-noir-ink-soft">
                  Five steps. One accountable process.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
