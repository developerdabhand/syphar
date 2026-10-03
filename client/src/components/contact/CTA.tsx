import { useRef, useState, type ChangeEvent, type FormEvent, type MouseEvent } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import clsx from 'clsx'
import Container from '../layout/Container'
import Reveal from '../layout/Reveal'
import SpecularButton from '../../reactbits/SpecularButton'
import { services } from '../../data/services'

const API_URL = import.meta.env.VITE_API_URL || ''

const MAX_LENGTH = { name: 100, email: 254, company: 200, message: 5000 }

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function CTA() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [interests, setInterests] = useState<string[]>([])
  const [website, setWebsite] = useState('') // honeypot — left blank by real visitors
  const startedAtRef = useRef(Date.now())

  const toggleInterest = (name: string) =>
    setInterests((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]))

  const handleChange = (field: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return

    setStatus('submitting')
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          // The API takes a fixed set of fields, so service interest travels with the message.
          message: interests.length ? `Interested in: ${interests.join(', ')}\n\n${form.message}` : form.message,
          website,
          startedAt: startedAtRef.current,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setForm({ name: '', email: '', company: '', message: '' })
      setInterests([])
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-noir-line bg-noir py-24 md:py-32">
      <Container className="relative">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <h2 className="text-[32px] font-semibold leading-[1.15] tracking-[-0.01em] text-noir-ink sm:text-[40px]">
              Have a product worth building?
            </h2>
            <p className="mt-6 max-w-[420px] text-[16px] leading-[1.7] text-noir-ink-soft">
              Tell us what you&rsquo;re trying to build, improve, or automate. We&rsquo;ll help you determine the
              right technical approach.
            </p>
            <a
              href="#work"
              onClick={(e: MouseEvent) => {
                e.preventDefault()
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-noir-ink-soft transition-colors hover:text-noir-ink"
            >
              View our work
              <ArrowRight size={15} />
            </a>
            <div className="mt-10 border-t border-noir-line pt-8">
              <ul className="flex flex-col gap-2 text-[13.5px] text-noir-ink-soft">
                <li>&bull; A reply from an engineer within one business day</li>
                <li>&bull; No obligation, no sales scripts</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100} className="md:col-span-7">
            {status === 'success' ? (
              <div className="flex h-full min-h-[320px] flex-col justify-center rounded-2xl border border-noir-line bg-noir-raised p-8">
                <p className="text-[18px] font-medium text-noir-ink">Thank you — message received.</p>
                <p className="mt-3 text-[14px] leading-[1.6] text-noir-ink-soft">
                  We read every inquiry ourselves and reply within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl border border-noir-line bg-noir-raised p-6 sm:p-8">
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute h-0 w-0 overflow-hidden opacity-0"
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Name *"
                    id="name"
                    value={form.name}
                    onChange={handleChange('name')}
                    required
                    autoComplete="name"
                    maxLength={MAX_LENGTH.name}
                  />
                  <Field
                    label="Email *"
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    required
                    autoComplete="email"
                    maxLength={MAX_LENGTH.email}
                  />
                </div>
                <div className="mt-5">
                  <Field
                    label="Company (optional)"
                    id="company"
                    value={form.company}
                    onChange={handleChange('company')}
                    autoComplete="organization"
                    maxLength={MAX_LENGTH.company}
                  />
                </div>
                <fieldset className="mt-5">
                  <legend className="font-mono text-[11px] uppercase tracking-[0.12em] text-noir-ink-soft">
                    I&rsquo;m interested in (optional)
                  </legend>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {services.map((service) => {
                      const on = interests.includes(service.name)
                      return (
                        <button
                          key={service.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleInterest(service.name)}
                          className={clsx(
                            'rounded-full border px-3.5 py-1.5 text-[13px] transition-colors',
                            on
                              ? 'border-accent-soft bg-accent/25 text-noir-ink'
                              : 'border-white/15 text-noir-ink-soft hover:border-white/30 hover:text-noir-ink',
                          )}
                        >
                          {service.name}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>
                <div className="mt-5">
                  <label htmlFor="message" className="block font-mono text-[11px] uppercase tracking-[0.12em] text-noir-ink-soft">
                    What are you trying to build? *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    maxLength={MAX_LENGTH.message}
                    value={form.message}
                    onChange={handleChange('message')}
                    className="mt-2.5 w-full resize-none rounded-lg border border-white/15 bg-white/4 px-4 py-3 text-[15px] text-noir-ink outline-none transition-colors placeholder:text-noir-ink-soft/60 focus:border-accent-soft"
                  />
                </div>

                <SpecularButton
                  type="submit"
                  disabled={status === 'submitting'}
                  size="md"
                  radius={999}
                  tint="#7c1fef"
                  tintOpacity={1}
                  textColor="#f5f3f8"
                  baseColor="#17141f"
                  lineColor="#ffffff"
                  shineSize={14}
                  proximity={260}
                  className="mt-7 w-full sm:w-auto"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending
                    </>
                  ) : (
                    'Start a conversation'
                  )}
                </SpecularButton>

                <p className="mt-4 text-[12.5px] leading-[1.6] text-noir-ink-soft">
                  We only use this to reply to your message — see our{' '}
                  <a href="/privacy.html" className="underline decoration-white/20 underline-offset-2 hover:text-noir-ink">
                    Privacy Policy
                  </a>
                  .
                </p>

                {status === 'error' && (
                  <p role="alert" className="mt-4 text-[13px] text-noir-ink-soft">
                    Something went wrong — please try again in a moment.
                  </p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

interface FieldProps {
  label: string
  id: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
  autoComplete?: string
  maxLength?: number
}

function Field({ label, id, value, onChange, type = 'text', required, autoComplete, maxLength }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[11px] uppercase tracking-[0.12em] text-noir-ink-soft">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        className="mt-2.5 w-full rounded-lg border border-white/15 bg-white/4 px-4 py-3 text-[15px] text-noir-ink outline-none transition-colors focus:border-accent-soft"
      />
    </div>
  )
}
