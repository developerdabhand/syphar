import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'

interface LazyMountProps {
  children: ReactNode
  className?: string
  /** 'visible' waits until the wrapper nears the viewport; 'idle' waits for the browser to be idle. */
  when?: 'visible' | 'idle'
  rootMargin?: string
}

/** Mounts heavy children (WebGL effects, code-split chunks) only when they're needed. */
export default function LazyMount({ children, className, when = 'visible', rootMargin = '300px 0px' }: LazyMountProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (when === 'idle') {
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 250))
      const cancel = window.cancelIdleCallback ?? window.clearTimeout
      const id = idle(() => setReady(true))
      return () => cancel(id)
    }
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setReady(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [when, rootMargin])

  return (
    <div ref={ref} className={className}>
      {ready && <Suspense fallback={null}>{children}</Suspense>}
    </div>
  )
}
