import Container from '../layout/Container'
import Eyebrow from '../layout/Eyebrow'
import Reveal from '../layout/Reveal'
import ProjectVisual from './ProjectVisual'
import { projects } from '../../data/projects'

export default function Work() {
  const featured = projects.find((p) => p.featured) ?? projects[0]
  const rest = projects.filter((p) => p.id !== featured.id)

  return (
    <section id="work" className="border-t border-line py-24 md:py-32">
      <Container>
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
          <h2 className="mt-5 max-w-[560px] text-[30px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink sm:text-[36px]">
            Real projects, honestly described.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <article className="mt-16 grid gap-8 rounded-2xl border border-line p-6 transition-colors hover:border-accent/40 sm:p-8 md:grid-cols-2 md:items-center md:gap-12 md:p-10">
            <ProjectVisual seed={1} src={featured.image} alt={`${featured.name} preview`} className="aspect-[4/3] w-full" />
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-faint">{featured.industry}</p>
              <h3 className="mt-3 text-[24px] font-semibold text-ink">{featured.name}</h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-ink-soft">{featured.built}</p>
              <p className="mt-4 border-l-2 border-accent pl-4 text-[14px] leading-[1.6] text-ink-soft">
                {featured.outcome}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {featured.technology.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-ink-soft"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {rest.map((project, i) => (
            <Reveal key={project.id} delay={i * 70} className="h-full">
              <article className="group flex h-full flex-col rounded-2xl border border-line p-6 transition-colors hover:border-accent/40">
                <ProjectVisual seed={i + 2} src={project.image} alt={`${project.name} preview`} className="aspect-[16/10] w-full" />
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                  {project.industry}
                </p>
                <h3 className="mt-2 text-[17px] font-semibold text-ink">{project.name}</h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-ink-soft">{project.built}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {project.technology.map((tech) => (
                    <span key={tech} className="font-mono text-[11px] text-ink-faint">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
