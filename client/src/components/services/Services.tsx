import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import clsx from 'clsx'
import Container from '../layout/Container'
import Eyebrow from '../layout/Eyebrow'
import Reveal from '../layout/Reveal'
import { services } from '../../data/services'

export default function Services() {
  const [activeId, setActiveId] = useState(services[0].id)
  const active = services.find((s) => s.id === activeId) ?? services[0]
  const ActiveIcon = active.icon

  return (
    <section id="services" className="border-t border-line py-24 md:py-32">
      <Container>
        <Reveal>
          <Eyebrow>Services</Eyebrow>
          <h2 className="mt-5 max-w-[640px] text-[30px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink sm:text-[36px]">
            Six disciplines. One accountable team.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-12 md:gap-10">
          <Reveal delay={80} className="md:col-span-5">
            <ul className="flex flex-col">
              {services.map((service) => (
                <li key={service.id} className="border-b border-line first:border-t">
                  <button
                    type="button"
                    onClick={() => setActiveId(service.id)}
                    onMouseEnter={() => setActiveId(service.id)}
                    aria-pressed={service.id === activeId}
                    className={clsx(
                      'flex w-full items-center gap-5 py-5 text-left transition-colors',
                      service.id === activeId ? 'text-ink' : 'text-ink-soft hover:text-ink',
                    )}
                  >
                    <span className="font-mono text-[13px] text-ink-faint">{service.index}</span>
                    <span className="text-[18px] font-medium">{service.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140} className="md:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-line bg-surface p-8 md:p-10"
              >
                <ActiveIcon className="text-accent-deep" size={28} strokeWidth={1.5} />
                <h3 className="mt-6 text-[22px] font-semibold text-ink">{active.name}</h3>
                <p className="mt-4 text-[16px] leading-[1.7] text-ink-soft">{active.description}</p>
                <ul className="mt-7 flex flex-col gap-3 border-t border-line pt-7">
                  {active.deliverables.map((item) => (
                    <li key={item} className="flex items-baseline gap-3 text-[14px] text-ink-soft">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
