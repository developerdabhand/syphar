import Container from '../layout/Container'
import Eyebrow from '../layout/Eyebrow'
import Reveal from '../layout/Reveal'

const REASONS = [
  {
    title: 'Business-first engineering',
    description: 'We start with the business problem, not the technology. The stack follows the goal.',
  },
  {
    title: 'Transparent collaboration',
    description: 'Clear communication, predictable milestones, and visible progress throughout the engagement.',
  },
  {
    title: 'Modern engineering',
    description: 'We use current technologies deliberately, without chasing trends for their own sake.',
  },
  {
    title: 'Built for scale',
    description: "Architecture designed around where the product is headed, not just today's minimum.",
  },
  {
    title: 'Long-term partnership',
    description: 'We can stay involved after launch as the product — and the business — keeps evolving.',
  },
]

export default function WhyUs() {
  return (
    <section id="about" className="border-t border-line py-24 md:py-32">
      <Container>
        <Reveal>
          <Eyebrow>Why us</Eyebrow>
          <h2 className="mt-5 max-w-[560px] text-[30px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink sm:text-[36px]">
            Concrete reasons, not superlatives.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-10 border-t border-line pt-10 sm:grid-cols-2">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 60}>
              <h3 className="text-[18px] font-semibold text-ink">{reason.title}</h3>
              <p className="mt-2.5 max-w-[420px] text-[15px] leading-[1.7] text-ink-soft">{reason.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
