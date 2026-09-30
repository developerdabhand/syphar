import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'

/** Mobile-only bar: keeps the primary action one tap away once the hero is scrolled past. */
export default function StickyCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const contact = document.getElementById('contact')
    let pastHero = false
    let atContact = false
    const update = () => setShow(pastHero && !atContact)

    const onScroll = () => {
      const next = window.scrollY > window.innerHeight * 0.8
      if (next !== pastHero) {
        pastHero = next
        update()
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const io = contact
      ? new IntersectionObserver(([entry]) => {
          atContact = entry.isIntersecting
          update()
        })
      : null
    if (contact) io?.observe(contact)

    return () => {
      window.removeEventListener('scroll', onScroll)
      io?.disconnect()
    }
  }, [])

  return (
    <div
      className={clsx(
        'fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 md:hidden',
        show ? 'translate-y-0' : 'translate-y-full',
      )}
      aria-hidden={!show}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <a
        href="#contact"
        tabIndex={show ? 0 : -1}
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-semibold text-bg"
      >
        Start a project
        <ArrowRight size={16} />
      </a>
    </div>
  )
}
