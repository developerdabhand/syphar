import type { LucideIcon } from 'lucide-react'

export interface Service {
  id: string
  index: string
  name: string
  summary: string
  description: string
  deliverables: string[]
  icon: LucideIcon
}

export interface ProcessStep {
  index: string
  title: string
  description: string
}

export interface Project {
  id: string
  name: string
  industry: string
  built: string
  technology: string[]
  outcome: string
  /** Path under /public to an illustrative preview image. */
  image?: string
  featured?: boolean
}

export interface TechCategory {
  category: string
  items: string[]
}

export interface Insight {
  category: string
  title: string
  summary: string
}
