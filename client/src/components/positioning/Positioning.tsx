import Container from '../layout/Container'
import Reveal from '../layout/Reveal'

const CAPABILITIES = ['Product engineering', 'AI & automation', 'Cloud infrastructure', 'Web platforms', 'Digital transformation']

export default function Positioning() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-6">
            <h2 className="text-[30px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink sm:text-[36px]">
              Technology partner for ambitious businesses.
            </h2>
          </Reveal>
          <Reveal delay={80} className="md:col-span-6 md:pt-2">
            <p className="max-w-[460px] text-[17px] leading-[1.7] text-ink-soft">
              We work as an extension of your team — close enough to understand the business, technical enough to
              carry it through engineering. No handoffs into a black box, no unnecessary layers between you and the
              people building your product.
            </p>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-10">
            {CAPABILITIES.map((item) => (
              <span key={item} className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-faint">
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
