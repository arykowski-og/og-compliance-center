import { getPayload } from 'payload'
import config from '../payload.config'

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
