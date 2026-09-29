import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'b2b-platform',
    name: 'B2B Operations Platform',
    industry: 'B2B / Operations',
    built:
      'A custom platform for managing business-to-business operations — accounts, orders, and day-to-day workflows in one system instead of scattered spreadsheets and email threads.',
    technology: ['React', 'Node.js', 'PostgreSQL'],
    outcome: 'Replaced manual, spreadsheet-driven processes with a single system the whole team works from.',
    featured: true,
  },
  {
    id: 'social-platform',
    name: 'Custom Social Platform',
    industry: 'Social / Community',
    built:
      'A purpose-built social application with its own feed, profiles, and interaction model — designed for a specific community rather than adapted from a generic template.',
    technology: ['React', 'Node.js', 'MongoDB'],
    outcome: 'Delivered a social product tailored to one community’s behavior, not a stock social-network clone.',
  },
  {
    id: 'erp-system',
    name: 'ERP System',
    industry: 'Enterprise / Resource Planning',
    built:
      'An enterprise resource planning system covering inventory, operations, and reporting, built around how the business actually works rather than forcing a fit to off-the-shelf software.',
    technology: ['React', 'Node.js', 'PostgreSQL'],
    outcome: 'Gave the business one source of truth across inventory, operations, and reporting.',
  },
  {
    id: 'business-websites',
    name: 'Business & Marketing Websites',
    industry: 'Web',
    built:
      'High-performance corporate and marketing websites — built for speed, clarity, and search visibility rather than templated page builders.',
    technology: ['React', 'Vite', 'TypeScript'],
    outcome: 'Fast, maintainable sites built to represent the business properly online.',
  },
]
