import type { Project } from '../components/ProjectCard'

export const projects: Project[] = [
  {
    slug: 'field-ops',
    name: 'Field Ops',
    badge: 'Current build',
    tagline: 'A professional marketplace with real-world constraints',
    description:
      'A full-stack marketplace with Rails API + React + React Native, geolocation, offline-first considerations, and admin tooling. Built to feel cohesive across platforms.',
    stack: ['Rails API', 'React', 'React Native', 'Postgres', 'Auth', 'Offline sync'],
    highlights: [
      'Designed APIs around user flows and operational realities',
      'Cross-platform UI patterns to keep the experience consistent',
      'Admin dashboards for safety, moderation, and operations',
    ],
    links: [
      { label: 'Case Study', href: '/projects/field-ops' },
      { label: 'Repo (private-ish)', href: '#' },
    ],
  },
  {
    slug: 'glass-cannon',
    name: 'Glass Cannon',
    badge: 'Game dev',
    tagline: 'A survivors-like with crisp systems and strong aesthetic',
    description:
      'A top-down action game exploring randomized weapons, factions, and UI inspired by cassette futurism. I build games to stay sharp on systems design and polish.',
    stack: ['GameMaker', 'Shaders', 'Procedural systems', 'UI design'],
    highlights: [
      'Designed weapon generation schema + progression systems',
      'Built UI language consistent across screens and flows',
      'Shipped prototypes fast, iterated with playtesting',
    ],
    links: [
      { label: 'Devlog', href: '/writing/glass-cannon' },
      { label: 'Screens', href: '/projects/glass-cannon' },
    ],
  },
  {
    slug: 'next-text',
    name: 'Next Text',
    badge: 'Writing platform',
    tagline: 'Interactive storytelling where text reveals more text',
    description:
      'A Medium-ish platform for interactive posts where underlined text expands the narrative inline. Built to make reading feel playful and nonlinear.',
    stack: ['Vite', 'TanStack Router', 'TanStack Query', 'Supabase'],
    highlights: [
      'Designed a post “runtime” that can nest interactive reveals',
      'Architected reader/writer experiences cleanly',
      'Focused on minimal UX so the writing stays center stage',
    ],
    links: [
      { label: 'Reader Demo', href: '/posts/test' },
      { label: 'Architecture Notes', href: '/writing/next-text-architecture' },
    ],
  },
]