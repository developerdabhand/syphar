import { Boxes, Cloud, Cpu, Globe, RefreshCw, Compass } from 'lucide-react'
import type { Service } from '../types'

export const services: Service[] = [
  {
    id: 'product-engineering',
    index: '01',
    name: 'Product Engineering',
    summary: 'Custom web applications and digital products designed around real business requirements.',
    description:
      'We design and build the software itself — from the first architecture decision through to a maintainable, well-tested product your team can keep evolving.',
    deliverables: ['Custom web applications', 'Internal tooling', 'API & systems design'],
    icon: Boxes,
  },
  {
    id: 'ai-automation',
    index: '02',
    name: 'AI & Intelligent Automation',
    summary: 'AI integrations, internal tools, workflow automation, and intelligent business systems.',
    description:
      'We apply AI where it removes real friction — automating manual work, surfacing information faster, and giving your team tools that make decisions easier.',
    deliverables: ['LLM & AI integrations', 'Workflow automation', 'Internal AI tooling'],
    icon: Cpu,
  },
  {
    id: 'cloud-infrastructure',
    index: '03',
    name: 'Cloud & Infrastructure',
    summary: 'Scalable, secure, and maintainable cloud infrastructure.',
    description:
      'We design infrastructure that stays out of the way — provisioned as code, observable in production, and built to scale with the business rather than against it.',
    deliverables: ['Cloud architecture', 'CI/CD pipelines', 'Monitoring & reliability'],
    icon: Cloud,
  },
  {
    id: 'web-development',
    index: '04',
    name: 'Web Development',
    summary: 'High-performance websites and platforms using modern technologies.',
    description:
      'From marketing sites to full platforms, we build fast, accessible, and easy to maintain — engineered with the same rigor as the product behind it.',
    deliverables: ['Marketing & corporate sites', 'Web platforms', 'Performance & SEO'],
    icon: Globe,
  },
  {
    id: 'digital-transformation',
    index: '05',
    name: 'Digital Transformation',
    summary: 'Modernizing legacy processes and turning manual workflows into efficient digital systems.',
    description:
      'We work with teams still running on spreadsheets and manual handoffs, and replace them with systems that scale without adding headcount.',
    deliverables: ['Legacy modernization', 'Process digitization', 'Systems integration'],
    icon: RefreshCw,
  },
  {
    id: 'technical-consulting',
    index: '06',
    name: 'Technical Consulting',
    summary: 'Architecture, technology strategy, product planning, and engineering guidance.',
    description:
      'Sometimes the most valuable work is deciding what to build and how. We advise on architecture and technology strategy before a single line of code is written.',
    deliverables: ['Architecture review', 'Technology strategy', 'Product planning'],
    icon: Compass,
  },
]
