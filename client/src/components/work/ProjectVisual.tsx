interface ProjectVisualProps {
  seed: number
  className?: string
}

/**
 * Abstract, generated preview tile — used in place of real product screenshots,
 * which we don't have permission to publish. Purely decorative.
 */
export default function ProjectVisual({ seed, className = '' }: ProjectVisualProps) {
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
