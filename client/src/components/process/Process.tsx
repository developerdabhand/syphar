import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import Container from '../layout/Container'
import Eyebrow from '../layout/Eyebrow'
import Reveal from '../layout/Reveal'
import { processSteps } from '../../data/process'

export default function Process() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 26, mass: 0.2 })

  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <Reveal>
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-5 max-w-[560px] text-[30px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink sm:text-[36px]">
            A process built for clarity, not surprises.
          </h2>
        </Reveal>

        <div ref={sectionRef} className="relative mt-16 pl-10 sm:pl-14">
          <div className="absolute left-[3px] top-2 bottom-2 w-px bg-line sm:left-[5px]" aria-hidden="true">
            <motion.div
              className="w-full origin-top bg-accent"
              style={{ scaleY: progress, height: '100%' }}
            />
          </div>

          <ol className="flex flex-col gap-12">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.index} delay={i * 60} className="relative">
                <span
                  className="absolute -left-10 top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-bg bg-accent sm:-left-14"
                  aria-hidden="true"
                />
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[13px] text-ink-faint">{step.index}</span>
                  <h3 className="text-[20px] font-semibold text-ink">{step.title}</h3>
                </div>
                <p className="mt-2 max-w-[480px] text-[15px] leading-[1.7] text-ink-soft">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
