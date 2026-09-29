import clsx from 'clsx'

interface EyebrowProps {
  children: string
  tone?: 'light' | 'dark'
  className?: string
}

export default function Eyebrow({ children, tone = 'light', className }: EyebrowProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]',
        tone === 'light' ? 'text-accent-deep' : 'text-noir-ink-soft',
        className,
      )}
    >
      <span
        className={clsx('h-[6px] w-[6px] rounded-full', tone === 'light' ? 'bg-accent' : 'bg-accent-soft')}
        aria-hidden="true"
      />
      {children}
    </span>
  )
}
