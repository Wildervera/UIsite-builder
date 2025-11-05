// AI Sitemap Generator (simulated)
import type { Page, Section, SectionTemplate } from './sitemap-types'

interface GenerationConfig {
  description: string
  numberOfPages: string
  language: string
}

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9)

// Generate sections based on page type
function generateSectionsForPage(pageTitle: string, language: string): Section[] {
  const sectionsMap: Record<string, Section[]> = {
    'Home': [
      {
        id: generateId(),
        title: 'Navbar',
        description: 'Main navigation bar with logo and menu items',
        color: 'gray',
        order: 0,
      },
      {
        id: generateId(),
        title: 'Hero Header Section',
        description: 'Compelling hero section with main value proposition, description, and call-to-action buttons',
        color: 'blue',
        order: 1,
      },
      {
        id: generateId(),
        title: 'Feature Section',
        description: 'Showcase 3-4 key features with icons, titles, and descriptions',
        color: 'green',
        order: 2,
      },
      {
        id: generateId(),
        title: 'Benefits Section',
        description: 'Explain the main benefits users get from the product or service',
        color: 'green',
        order: 3,
      },
      {
        id: generateId(),
        title: 'Testimonial Section',
        description: 'Display customer testimonials and reviews with photos and ratings',
        color: 'yellow',
        order: 4,
      },
      {
        id: generateId(),
        title: 'Pricing Section',
        description: 'Show pricing plans with features and call-to-action buttons',
        color: 'orange',
        order: 5,
      },
      {
        id: generateId(),
        title: 'CTA Section',
        description: 'Final call-to-action encouraging users to sign up or get started',
        color: 'orange',
        order: 6,
      },
      {
        id: generateId(),
        title: 'Footer',
        description: 'Footer with links, social media, and contact information',
        color: 'gray',
        order: 7,
      },
    ],
    'About': [
      {
        id: generateId(),
        title: 'Navbar',
        description: 'Main navigation bar',
        color: 'gray',
        order: 0,
      },
      {
        id: generateId(),
        title: 'About Section',
        description: 'Company story, mission, and vision',
        color: 'blue',
        order: 1,
      },
      {
        id: generateId(),
        title: 'Team Section',
        description: 'Meet the team members with photos and bios',
        color: 'purple',
        order: 2,
      },
      {
        id: generateId(),
        title: 'Stats Section',
        description: 'Company statistics and achievements',
        color: 'green',
        order: 3,
      },
      {
        id: generateId(),
        title: 'Footer',
        description: 'Footer with links and contact info',
        color: 'gray',
        order: 4,
      },
    ],
    'Features': [
      {
        id: generateId(),
        title: 'Navbar',
        description: 'Main navigation bar',
        color: 'gray',
        order: 0,
      },
      {
        id: generateId(),
        title: 'Hero Header Section',
        description: 'Features overview and introduction',
        color: 'blue',
        order: 1,
      },
      {
        id: generateId(),
        title: 'Features List Section',
        description: 'Detailed list of all features with descriptions and visuals',
        color: 'green',
        order: 2,
      },
      {
        id: generateId(),
        title: 'Benefits Section',
        description: 'How features benefit users',
        color: 'green',
        order: 3,
      },
      {
        id: generateId(),
        title: 'CTA Section',
        description: 'Call-to-action to try features',
        color: 'orange',
        order: 4,
      },
      {
        id: generateId(),
        title: 'Footer',
        description: 'Footer with links',
        color: 'gray',
        order: 5,
      },
    ],
    'Pricing': [
      {
        id: generateId(),
        title: 'Navbar',
        description: 'Main navigation bar',
        color: 'gray',
        order: 0,
      },
      {
        id: generateId(),
        title: 'Pricing Section',
        description: 'Display all pricing tiers with features and pricing',
        color: 'orange',
        order: 1,
      },
      {
        id: generateId(),
        title: 'FAQ Section',
        description: 'Frequently asked questions about pricing',
        color: 'blue',
        order: 2,
      },
      {
        id: generateId(),
        title: 'CTA Section',
        description: 'Encourage users to choose a plan',
        color: 'orange',
        order: 3,
      },
      {
        id: generateId(),
        title: 'Footer',
        description: 'Footer with links',
        color: 'gray',
        order: 4,
      },
    ],
    'Contact': [
      {
        id: generateId(),
        title: 'Navbar',
        description: 'Main navigation bar',
        color: 'gray',
        order: 0,
      },
      {
        id: generateId(),
        title: 'Contact Section',
        description: 'Contact form and information',
        color: 'purple',
        order: 1,
      },
      {
        id: generateId(),
        title: 'Footer',
        description: 'Footer with contact details',
        color: 'gray',
        order: 2,
      },
    ],
    'Blog': [
      {
        id: generateId(),
        title: 'Navbar',
        description: 'Main navigation bar',
        color: 'gray',
        order: 0,
      },
      {
        id: generateId(),
        title: 'Blog List',
        description: 'Grid of blog post cards with images, titles, and excerpts',
        color: 'blue',
        order: 1,
      },
      {
        id: generateId(),
        title: 'Newsletter Section',
        description: 'Subscribe to newsletter',
        color: 'pink',
        order: 2,
      },
      {
        id: generateId(),
        title: 'Footer',
        description: 'Footer with links',
        color: 'gray',
        order: 3,
      },
    ],
  }

  // Return sections for the page or default sections
  return sectionsMap[pageTitle] || [
    {
      id: generateId(),
      title: 'Navbar',
      description: 'Main navigation bar',
      color: 'gray',
      order: 0,
    },
    {
      id: generateId(),
      title: `${pageTitle} Header`,
      description: `Header section for ${pageTitle} page`,
      color: 'blue',
      order: 1,
    },
    {
      id: generateId(),
      title: 'Footer',
      description: 'Footer with links',
      color: 'gray',
      order: 2,
    },
  ]
}

// Determine pages based on description
function determinePagesFromDescription(description: string, numberOfPages: string): string[] {
  const lowercaseDesc = description.toLowerCase()

  // Always include Home
  const pages: string[] = ['Home']

  // Common pages based on keywords in description
  const pageKeywords: Record<string, string[]> = {
    'About': ['about', 'company', 'team', 'story', 'mission'],
    'Features': ['features', 'capabilities', 'functionality', 'tools'],
    'Pricing': ['pricing', 'plans', 'subscription', 'cost', 'price'],
    'Contact': ['contact', 'support', 'help'],
    'Blog': ['blog', 'articles', 'news', 'content'],
    'Services': ['services', 'offering', 'solutions'],
    'Portfolio': ['portfolio', 'projects', 'work', 'showcase'],
    'Testimonials': ['testimonials', 'reviews', 'feedback'],
    'FAQ': ['faq', 'questions', 'help'],
    'Careers': ['careers', 'jobs', 'hiring'],
  }

  // Add pages based on keywords found
  for (const [page, keywords] of Object.entries(pageKeywords)) {
    if (keywords.some(keyword => lowercaseDesc.includes(keyword))) {
      if (!pages.includes(page)) {
        pages.push(page)
      }
    }
  }

  // Determine target number of pages
  let targetPages = 4 // default
  if (numberOfPages === '2-5') targetPages = Math.floor(Math.random() * 4) + 2
  else if (numberOfPages === '6-10') targetPages = Math.floor(Math.random() * 5) + 6
  else if (numberOfPages === '11-20') targetPages = Math.floor(Math.random() * 10) + 11
  else if (numberOfPages === '20+') targetPages = Math.floor(Math.random() * 10) + 20

  // Add generic pages to reach target
  const genericPages = ['About', 'Features', 'Pricing', 'Contact', 'Blog', 'Services']
  for (const page of genericPages) {
    if (pages.length >= targetPages) break
    if (!pages.includes(page)) {
      pages.push(page)
    }
  }

  // If still need more, add numbered pages
  let counter = 1
  while (pages.length < targetPages) {
    pages.push(`Page ${counter}`)
    counter++
  }

  return pages.slice(0, targetPages)
}

// Main generator function
export async function generateSitemap(config: GenerationConfig): Promise<Page[]> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const pageNames = determinePagesFromDescription(config.description, config.numberOfPages)

  const pages: Page[] = pageNames.map((pageName, index) => ({
    id: generateId(),
    title: pageName,
    isHomePage: pageName === 'Home',
    sections: generateSectionsForPage(pageName, config.language),
    order: index,
  }))

  return pages
}

// Generate sections for a page using AI (simulated)
export async function generateSectionsForPageAI(pageTitle: string, prompt: string): Promise<Section[]> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Parse prompt for clues about what to generate
  const lowercasePrompt = prompt.toLowerCase()
  const sections: Section[] = []

  // Always add navbar if not already present
  sections.push({
    id: generateId(),
    title: 'Navbar',
    description: 'Main navigation bar',
    color: 'gray',
    order: 0,
  })

  // Check for specific section requests
  if (lowercasePrompt.includes('pricing')) {
    sections.push({
      id: generateId(),
      title: 'Pricing Section',
      description: prompt.includes('tier') ?
        `Pricing section with ${prompt.match(/\d+/)?.[0] || '3'} tiers` :
        'Display pricing plans and options',
      color: 'orange',
      order: sections.length,
    })
  }

  if (lowercasePrompt.includes('testimonial') || lowercasePrompt.includes('review')) {
    sections.push({
      id: generateId(),
      title: 'Testimonial Section',
      description: prompt.match(/\d+/) ?
        `Customer testimonials section with ${prompt.match(/\d+/)?.[0]} reviews` :
        'Customer testimonials and reviews',
      color: 'yellow',
      order: sections.length,
    })
  }

  if (lowercasePrompt.includes('faq') || lowercasePrompt.includes('question')) {
    sections.push({
      id: generateId(),
      title: 'FAQ Section',
      description: prompt.match(/\d+/) ?
        `FAQ section with ${prompt.match(/\d+/)?.[0]} questions` :
        'Frequently asked questions',
      color: 'blue',
      order: sections.length,
    })
  }

  if (lowercasePrompt.includes('feature')) {
    sections.push({
      id: generateId(),
      title: 'Features Section',
      description: 'Showcase key features and benefits',
      color: 'green',
      order: sections.length,
    })
  }

  if (lowercasePrompt.includes('cta') || lowercasePrompt.includes('call to action')) {
    sections.push({
      id: generateId(),
      title: 'CTA Section',
      description: 'Call-to-action section',
      color: 'orange',
      order: sections.length,
    })
  }

  if (lowercasePrompt.includes('team')) {
    sections.push({
      id: generateId(),
      title: 'Team Section',
      description: 'Team members showcase',
      color: 'purple',
      order: sections.length,
    })
  }

  if (lowercasePrompt.includes('contact')) {
    sections.push({
      id: generateId(),
      title: 'Contact Section',
      description: 'Contact form and information',
      color: 'purple',
      order: sections.length,
    })
  }

  // If no specific sections were added, add some default ones
  if (sections.length === 1) {
    sections.push({
      id: generateId(),
      title: 'Hero Section',
      description: 'Main hero section based on your prompt',
      color: 'blue',
      order: 1,
    })
    sections.push({
      id: generateId(),
      title: 'Content Section',
      description: prompt,
      color: 'green',
      order: 2,
    })
  }

  // Always add footer
  sections.push({
    id: generateId(),
    title: 'Footer',
    description: 'Footer with links and information',
    color: 'gray',
    order: sections.length,
  })

  return sections
}

// Import sitemap from URL (simulated)
export async function importSitemapFromUrl(url: string): Promise<Page[]> {
  // Simulate fetching and parsing
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Generate a generic sitemap based on common website structure
  return [
    {
      id: generateId(),
      title: 'Home',
      isHomePage: true,
      sections: generateSectionsForPage('Home', 'English (US)'),
      order: 0,
    },
    {
      id: generateId(),
      title: 'About',
      isHomePage: false,
      sections: generateSectionsForPage('About', 'English (US)'),
      order: 1,
    },
    {
      id: generateId(),
      title: 'Products',
      isHomePage: false,
      sections: generateSectionsForPage('Features', 'English (US)'),
      order: 2,
    },
    {
      id: generateId(),
      title: 'Contact',
      isHomePage: false,
      sections: generateSectionsForPage('Contact', 'English (US)'),
      order: 3,
    },
  ]
}
