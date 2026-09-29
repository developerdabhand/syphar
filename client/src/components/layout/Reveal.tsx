import type { ReactNode } from 'react'
import clsx from 'clsx'
import { useReveal } from '../../lib/useReveal'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li'
}

export default function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>()
  const Tag = as

  return (
    <Tag
      ref={ref as never}
      className={clsx('reveal', isVisible && 'is-visible', className)}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}
