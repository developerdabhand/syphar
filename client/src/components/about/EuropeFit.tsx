import Container from '../layout/Container'
import Reveal from '../layout/Reveal'
import Waves from '../../reactbits/Waves'

const POINTS = [
  'Clear, direct communication throughout',
  'Transparent project structure and scope',
  'GDPR-conscious development practices',
  'Secure engineering by default, not as an afterthought',
  'Documentation that outlives the project',
  'Predictable delivery and long-term support',
  'Overlapping working hours across European time zones',
]

export default function EuropeFit() {
  return (
    <section className="relative overflow-hidden border-t border-noir-line bg-noir py-24 md:py-32">
      <Waves
        lineColor="rgba(124, 31, 239, 0.16)"
        backgroundColor="transparent"
        waveSpeedX={0.008}
        waveSpeedY={0.004}
        waveAmpX={22}
        waveAmpY={10}
        friction={0.94}
        tension={0.006}
        maxCursorMove={70}
        xGap={26}
        yGap={40}
        className="opacity-70"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 80% 20%, transparent, var(--color-noir) 75%)' }}
      />

      <Container className="relative">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-noir-ink-soft">European fit</p>
            <h2 className="mt-5 text-[30px] font-semibold leading-[1.2] tracking-[-0.01em] text-noir-ink sm:text-[36px]">
              Built for teams that value clarity.
            </h2>
            <p className="mt-6 max-w-[400px] text-[15px] leading-[1.7] text-noir-ink-soft">
              Working with European businesses means matching how you already operate — direct, documented, and
              accountable at every stage.
            </p>
          </Reveal>

          <Reveal delay={100} className="md:col-span-7">
            <ul className="grid gap-x-8 gap-y-4 border-t border-noir-line pt-8 sm:grid-cols-2">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[14.5px] leading-[1.6] text-noir-ink-soft">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-soft" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
