import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'

const US_STATES = [
  { name: 'Alabama', abbreviation: 'AL' },
  { name: 'Alaska', abbreviation: 'AK' },
  { name: 'Arizona', abbreviation: 'AZ' },
  { name: 'Arkansas', abbreviation: 'AR' },
  { name: 'California', abbreviation: 'CA' },
  { name: 'Colorado', abbreviation: 'CO' },
  { name: 'Connecticut', abbreviation: 'CT' },
  { name: 'Delaware', abbreviation: 'DE' },
  { name: 'Florida', abbreviation: 'FL' },
  { name: 'Georgia', abbreviation: 'GA' },
  { name: 'Hawaii', abbreviation: 'HI' },
  { name: 'Idaho', abbreviation: 'ID' },
  { name: 'Illinois', abbreviation: 'IL' },
  { name: 'Indiana', abbreviation: 'IN' },
  { name: 'Iowa', abbreviation: 'IA' },
  { name: 'Kansas', abbreviation: 'KS' },
  { name: 'Kentucky', abbreviation: 'KY' },
  { name: 'Louisiana', abbreviation: 'LA' },
  { name: 'Maine', abbreviation: 'ME' },
  { name: 'Maryland', abbreviation: 'MD' },
  { name: 'Massachusetts', abbreviation: 'MA' },
  { name: 'Michigan', abbreviation: 'MI' },
  { name: 'Minnesota', abbreviation: 'MN' },
  { name: 'Mississippi', abbreviation: 'MS' },
  { name: 'Missouri', abbreviation: 'MO' },
  { name: 'Montana', abbreviation: 'MT' },
  { name: 'Nebraska', abbreviation: 'NE' },
  { name: 'Nevada', abbreviation: 'NV' },
  { name: 'New Hampshire', abbreviation: 'NH' },
  { name: 'New Jersey', abbreviation: 'NJ' },
  { name: 'New Mexico', abbreviation: 'NM' },
  { name: 'New York', abbreviation: 'NY' },
  { name: 'North Carolina', abbreviation: 'NC' },
  { name: 'North Dakota', abbreviation: 'ND' },
  { name: 'Ohio', abbreviation: 'OH' },
  { name: 'Oklahoma', abbreviation: 'OK' },
  { name: 'Oregon', abbreviation: 'OR' },
  { name: 'Pennsylvania', abbreviation: 'PA' },
  { name: 'Rhode Island', abbreviation: 'RI' },
  { name: 'South Carolina', abbreviation: 'SC' },
  { name: 'South Dakota', abbreviation: 'SD' },
  { name: 'Tennessee', abbreviation: 'TN' },
  { name: 'Texas', abbreviation: 'TX' },
  { name: 'Utah', abbreviation: 'UT' },
  { name: 'Vermont', abbreviation: 'VT' },
  { name: 'Virginia', abbreviation: 'VA' },
  { name: 'Washington', abbreviation: 'WA' },
  { name: 'West Virginia', abbreviation: 'WV' },
  { name: 'Wisconsin', abbreviation: 'WI' },
  { name: 'Wyoming', abbreviation: 'WY' },
]

const CATEGORY_MAP: Record<string, string> = {
  'Financial Mgmt': 'regulatory',
  'Financial Management': 'regulatory',
  'HR': 'regulatory',
  'Procurement': 'regulatory',
  'Revenue': 'regulatory',
}

function createArticleSlug(stateName: string, featureName: string): string {
  const cleanState = stateName.toLowerCase().replace(/\s+/g, '-')
  const cleanFeature = featureName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
  return `${cleanState}-${cleanFeature}`
}

function generatePlainLanguageSummary(record: any, stateName: string): string {
  const feature = record.featureName
  const level = record.complianceLevel
  
  if (feature.includes('Single Audit')) {
    return `Single Audit is a federal requirement for local governments in ${stateName} that spend more than $750,000 in federal grants per year. This audit ensures your organization is using federal funds correctly and following all compliance rules. You'll need to track federal spending carefully and have an independent auditor review your spending annually.`
  }
  
  if (feature.includes('GASB 54')) {
    return `GASB 54 requires local governments in ${stateName} to classify fund balances in their financial reports. This standard helps make your financial statements clearer by showing which funds are available to spend and which have restrictions. Your finance team needs to categorize fund balances as nonspendable, restricted, committed, assigned, or unassigned.`
  }
  
  if (feature.includes('Encumbrance')) {
    return `Encumbrance accounting helps ${stateName} local governments track purchase orders and commitments before money is actually spent. This gives you better budget control by reserving funds when you commit to a purchase, not just when you pay the bill. It's ${ level === 'required' ? 'required' : 'recommended'} for maintaining accurate budget tracking.`
  }
  
  if (feature.includes('Grant Management')) {
    return `Grant management systems help ${stateName} local governments track federal, state, and foundation grants from application through closeout. You need to monitor grant budgets, track spending by grant program, and ensure compliance with each grantor's requirements. Proper grant management prevents audit findings and potential repayment of grant funds.`
  }
  
  if (feature.includes('Property Tax')) {
    return `Property tax ${feature.includes('Assessment') ? 'assessment' : 'billing and collection'} is ${level === 'required' ? 'required' : 'recommended'} for local governments in ${stateName}. This involves ${feature.includes('Assessment') ? 'maintaining property records, calculating assessed values, and integrating with CAMA systems' : 'generating tax bills, processing payments, and managing delinquencies'}. Proper systems ensure accurate revenue collection and compliance with state laws.`
  }
  
  return `This ${level} compliance requirement for ${stateName} local governments relates to ${feature}. Proper implementation ensures your organization meets state and federal standards while maintaining accurate records and reporting.`
}

function generateKeyRequirements(record: any): string[] {
  if (record.requirements && record.requirements.length > 0) {
    return record.requirements.slice(0, 8)
  }
  
  return [
    'Maintain accurate and timely records',
    'Comply with applicable state and federal regulations',
    'Submit required reports to oversight agencies',
    'Implement appropriate internal controls',
  ]
}

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting seed...')

  // Create admin user
  console.log('Creating admin user...')
  try {
    await payload.create({
      collection: 'users',
      data: {
        email: process.env.ADMIN_EMAIL || 'admin@example.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        name: 'Admin User',
        role: 'admin',
      },
    })
    console.log('✅ Admin user created')
  } catch (error) {
    console.log('⚠️  Admin user may already exist')
  }

  // Create states
  console.log('Creating states...')
  for (const state of US_STATES) {
    try {
      await payload.create({
        collection: 'states',
        data: {
          name: state.name,
          abbreviation: state.abbreviation,
          slug: state.name.toLowerCase().replace(/\s+/g, '-'),
          status: 'published',
          hero: {
            title: `${state.name} Compliance Guide`,
            subtitle: `Complete compliance information for local governments in ${state.name}`,
            lastUpdated: new Date().toISOString(),
          },
          quickStats: [
            {
              label: 'Local Governments',
              value: '500+',
              icon: '🏛️',
            },
            {
              label: 'Compliance Rate',
              value: '98%',
              icon: '✅',
            },
          ],
        },
      })
      console.log(`✅ Created ${state.name}`)
    } catch (error) {
      console.log(`⚠️  ${state.name} may already exist`)
    }
  }

  // Create sample articles
  console.log('Creating sample articles...')
  const sampleArticles = [
    {
      title: 'Understanding GASB 96: Subscription-Based IT Arrangements',
      slug: 'understanding-gasb-96-sbitas',
      excerpt: 'A comprehensive guide to implementing GASB Statement No. 96 for subscription-based information technology arrangements.',
      category: 'gasb',
      publishedDate: new Date().toISOString(),
    },
    {
      title: 'Best Practices for Annual Budget Planning',
      slug: 'best-practices-budget-planning',
      excerpt: 'Essential strategies and methodologies for effective government budget planning and execution.',
      category: 'best-practices',
      publishedDate: new Date().toISOString(),
    },
    {
      title: 'Digital Transformation in Local Government',
      slug: 'digital-transformation-local-government',
      excerpt: 'How modern technology is reshaping operations and service delivery in local governments.',
      category: 'technology',
      publishedDate: new Date().toISOString(),
    },
  ]

  const { docs: users } = await payload.find({
    collection: 'users',
    limit: 1,
  })

  for (const article of sampleArticles) {
    try {
      await payload.create({
        collection: 'articles',
        data: {
          ...article,
          author: users[0].id,
          status: 'published',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: article.excerpt,
                    },
                  ],
                },
              ],
            },
          },
        },
      })
      console.log(`✅ Created article: ${article.title}`)
    } catch (error) {
      console.log(`⚠️  Article "${article.title}" may already exist`)
    }
  }

  console.log('🎉 Seed completed!')
  process.exit(0)
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error)
  process.exit(1)
})
