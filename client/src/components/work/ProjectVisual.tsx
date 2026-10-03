interface ProjectVisualProps {
  seed: number
  className?: string
  /** Illustrative preview image. Falls back to the generated pattern without it. */
  src?: string
  alt?: string
}

/**
 * Preview tile for a project. We don't have permission to publish real product
 * screenshots, so this shows an illustrative mockup (or, without one, an
 * abstract generated pattern) and says so.
 */
export default function ProjectVisual({ seed, className = '', src, alt = '' }: ProjectVisualProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-xl border border-line bg-accent-tint ${className}`}>
        <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
        <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur-sm">
          Illustrative
        </span>
      </div>
    )
  }

  const angle = 24 + ((seed * 37) % 40)
  const gap = 18 + ((seed * 13) % 14)

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-line bg-accent-tint ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(${angle}deg, rgba(124,31,239,0.14) 0, rgba(124,31,239,0.14) 1px, transparent 1px, transparent ${gap}px)`,
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-end justify-end p-5">
        <div className="h-9 w-9 rounded-full border border-accent/30 bg-bg/70" />
      </div>
    </div>
  )
}
