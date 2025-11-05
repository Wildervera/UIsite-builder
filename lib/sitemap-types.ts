// Types for the Sitemap system

export type SectionColor = 'blue' | 'purple' | 'green' | 'orange' | 'gray' | 'red' | 'yellow' | 'pink' | 'none'

export interface Section {
  id: string
  title: string
  description: string
  color: SectionColor
  order: number
}

export interface Page {
  id: string
  title: string
  isHomePage: boolean
  sections: Section[]
  order: number
}

export interface SitemapProject {
  id: string
  name: string
  description: string
  numberOfPages: string
  language: string
  pages: Page[]
}

export interface SectionTemplate {
  id: string
  name: string
  category: string
  description: string
  defaultColor: SectionColor
}

// Pre-defined section templates based on Relume documentation
export const SECTION_TEMPLATES: SectionTemplate[] = [
  { id: 'navbar', name: 'Navbar', category: 'Navigation', description: 'Main navigation bar', defaultColor: 'gray' },
  { id: 'hero', name: 'Hero Header Section', category: 'Headers', description: 'Main hero section with title and CTA', defaultColor: 'blue' },
  { id: 'feature', name: 'Feature Section', category: 'Features', description: 'Showcase key features', defaultColor: 'green' },
  { id: 'features-list', name: 'Features List Section', category: 'Features', description: 'List of features with descriptions', defaultColor: 'green' },
  { id: 'benefits', name: 'Benefits Section', category: 'Benefits', description: 'Explain product benefits', defaultColor: 'green' },
  { id: 'services', name: 'Services Section', category: 'Services', description: 'Description of services offered', defaultColor: 'purple' },
  { id: 'testimonial', name: 'Testimonial Section', category: 'Social Proof', description: 'Customer testimonials and reviews', defaultColor: 'yellow' },
  { id: 'pricing', name: 'Pricing Section', category: 'Pricing', description: 'Pricing plans and options', defaultColor: 'orange' },
  { id: 'cta', name: 'CTA Section', category: 'Call to Action', description: 'Call-to-action section', defaultColor: 'orange' },
  { id: 'faq', name: 'FAQ Section', category: 'FAQ', description: 'Frequently asked questions', defaultColor: 'blue' },
  { id: 'contact', name: 'Contact Section', category: 'Contact', description: 'Contact form and information', defaultColor: 'purple' },
  { id: 'newsletter', name: 'Newsletter Section', category: 'Forms', description: 'Newsletter subscription form', defaultColor: 'pink' },
  { id: 'footer', name: 'Footer', category: 'Navigation', description: 'Footer with links and information', defaultColor: 'gray' },
  { id: 'about', name: 'About Section', category: 'About', description: 'About the company or product', defaultColor: 'blue' },
  { id: 'team', name: 'Team Section', category: 'About', description: 'Team members showcase', defaultColor: 'purple' },
  { id: 'gallery', name: 'Gallery Section', category: 'Media', description: 'Image or video gallery', defaultColor: 'pink' },
  { id: 'blog-list', name: 'Blog List', category: 'Blog', description: 'List of blog posts', defaultColor: 'blue' },
  { id: 'stats', name: 'Stats Section', category: 'Social Proof', description: 'Statistics and numbers', defaultColor: 'green' },
  { id: 'logos', name: 'Logo Cloud', category: 'Social Proof', description: 'Client or partner logos', defaultColor: 'gray' },
  { id: 'blank', name: 'Blank Section', category: 'Blank', description: 'Empty section to customize', defaultColor: 'none' },
]

export const SECTION_CATEGORIES = [
  'All',
  'Navigation',
  'Headers',
  'Features',
  'Benefits',
  'Services',
  'Social Proof',
  'Pricing',
  'Call to Action',
  'FAQ',
  'Contact',
  'Forms',
  'About',
  'Media',
  'Blog',
  'Blank',
]
