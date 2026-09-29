import Container from '../layout/Container'
import Eyebrow from '../layout/Eyebrow'
import Reveal from '../layout/Reveal'
import { technologies } from '../../data/technologies'

export default function Technology() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <Reveal>
          <Eyebrow>Technology</Eyebrow>
          <h2 className="mt-5 max-w-[560px] text-[30px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink sm:text-[36px]">
            A current, deliberately small toolkit.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {technologies.map((group, i) => (
            <Reveal key={group.category} delay={i * 60}>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">{group.category}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-[16px] leading-tight text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
