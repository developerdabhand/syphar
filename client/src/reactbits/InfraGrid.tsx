import { useEffect, useRef } from 'react'

interface InfraGridProps {
  lineColor?: string
  nodeColor?: string
  activeColor?: string
  gap?: number
  className?: string
}

interface Node {
  x: number
  y: number
  baseX: number
  baseY: number
  phase: number
  active: boolean
}

/**
 * A restrained, blueprint-style node grid used as the hero's technical
 * backdrop. Static (single paint) when the user prefers reduced motion.
 */
export default function InfraGrid({
  lineColor = 'rgba(124, 31, 239, 0.14)',
  nodeColor = 'rgba(23, 20, 28, 0.22)',
  activeColor = 'rgba(124, 31, 239, 0.65)',
  gap = 64,
  className = '',
}: InfraGridProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let nodes: Node[] = []
    let cols = 0
    let rows = 0
    let width = 0
    let height = 0
    let pointer = { x: -9999, y: -9999 }
    let frameId = 0

    function buildGrid() {
      const rect = container!.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      cols = Math.ceil(width / gap) + 1
      rows = Math.ceil(height / gap) + 1
      const xStart = (width - (cols - 1) * gap) / 2
      const yStart = (height - (rows - 1) * gap) / 2

      nodes = []
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = xStart + i * gap
          const y = yStart + j * gap
          nodes.push({
            x,
            y,
            baseX: x,
            baseY: y,
            phase: Math.random() * Math.PI * 2,
            active: Math.random() > 0.88,
          })
        }
      }
    }

    function index(i: number, j: number) {
      return j * cols + i
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height)

      ctx!.strokeStyle = lineColor
      ctx!.lineWidth = 1
      ctx!.beginPath()
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const n = nodes[index(i, j)]
          if (i < cols - 1) {
            const right = nodes[index(i + 1, j)]
            ctx!.moveTo(n.x, n.y)
            ctx!.lineTo(right.x, right.y)
          }
          if (j < rows - 1) {
            const down = nodes[index(i, j + 1)]
            ctx!.moveTo(n.x, n.y)
            ctx!.lineTo(down.x, down.y)
          }
        }
      }
      ctx!.stroke()

      nodes.forEach((n) => {
        const dx = n.baseX - pointer.x
        const dy = n.baseY - pointer.y
        const dist = Math.hypot(dx, dy)
        const proximity = Math.max(0, 1 - dist / 220)

        const pulse = n.active && !prefersReducedMotion ? (Math.sin(time * 0.0012 + n.phase) + 1) / 2 : n.active ? 0.6 : 0
        const radius = 1.3 + pulse * 1.6 + proximity * 2.2

        if (n.active || proximity > 0.05) {
          ctx!.beginPath()
          ctx!.fillStyle = proximity > 0.05 ? activeColor : nodeColor
          ctx!.globalAlpha = n.active ? 0.35 + pulse * 0.5 + proximity * 0.4 : proximity
          ctx!.arc(n.x, n.y, radius, 0, Math.PI * 2)
          ctx!.fill()
          ctx!.globalAlpha = 1
        } else {
          ctx!.beginPath()
          ctx!.fillStyle = nodeColor
          ctx!.arc(n.x, n.y, 1.3, 0, Math.PI * 2)
          ctx!.fill()
        }
      })
    }

    function tick(time: number) {
      draw(time)
      frameId = requestAnimationFrame(tick)
    }

    function onPointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect()
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    function onPointerLeave() {
      pointer = { x: -9999, y: -9999 }
    }

    function onResize() {
      buildGrid()
      if (prefersReducedMotion) draw(0)
    }

    buildGrid()
    if (prefersReducedMotion) {
      draw(0)
    } else {
      frameId = requestAnimationFrame(tick)
    }

    window.addEventListener('resize', onResize)
    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerleave', onPointerLeave)

    return () => {
      window.removeEventListener('resize', onResize)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerleave', onPointerLeave)
      cancelAnimationFrame(frameId)
    }
  }, [lineColor, nodeColor, activeColor, gap])

  return (
    <div ref={containerRef} className={className} style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
