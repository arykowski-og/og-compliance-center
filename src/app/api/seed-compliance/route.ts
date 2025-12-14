import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import complianceData from '../../../../state-compliance-data.json'

const US_STATES_MAP: Record<string, string> = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
  'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
  'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
  'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
  'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
  'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
  'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
  'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
  'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
  'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
  'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
  'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
  'WI': 'Wisconsin', 'WY': 'Wyoming'
}

function mapCategoryToSlug(category: string): string {
  const categoryMap: Record<string, string> = {
    'Financial Mgmt': 'financial-management',
    'Financial Management': 'financial-management',
    'HR': 'hr-employment',
    'Procurement': 'procurement-purchasing',
    'Revenue': 'revenue-taxation',
  }
  return categoryMap[category] || 'financial-management'
}

function createSlug(stateName: string, featureName: string): string {
  const cleanState = stateName.toLowerCase().replace(/\s+/g, '-')
  const cleanFeature = featureName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return `${cleanState}-${cleanFeature}`
}

function generateSummary(record: any, stateName: string): string {
  const feature = record.featureName
  const level = record.complianceLevel
  
  if (feature.includes('Single Audit')) {
    return `Single Audit is a federal requirement for local governments in ${stateName} that spend more than $750,000 in federal grants per year. This audit ensures your organization is using federal funds correctly and following all compliance rules. You'll need to track federal spending carefully and have an independent auditor review your spending annually.`
  }
  
  if (feature.includes('GASB 54')) {
    return `GASB 54 requires local governments in ${stateName} to classify fund balances in their financial reports. This standard helps make your financial statements clearer by showing which funds are available to spend and which have restrictions. Your finance team needs to categorize fund balances as nonspendable, restricted, committed, assigned, or unassigned.`
  }
  
  return `This ${level} compliance requirement for ${stateName} local governments relates to ${feature}. Proper implementation ensures your organization meets state and federal standards while maintaining accurate records and reporting.`
}

export async function POST() {
  try {
    const payload = await getPayload({ config })

    const { docs: users } = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (users.length === 0) {
      return NextResponse.json(
        { error: 'No users found. Please create an admin user first.' },
        { status: 400 }
      )
    }

    const authorId = users[0].id
    let created = 0
    let skipped = 0

    // Phase 1: CA, TX, CO only (about 33 articles)
    const PHASE_1_STATES = ['CA', 'TX', 'CO']
    const phase1Records = (complianceData.complianceData as any[]).filter(record =>
      PHASE_1_STATES.includes(record.stateCode)
    )

    for (const record of phase1Records) {
      const stateCode = record.stateCode
      const stateName = US_STATES_MAP[stateCode]

      if (!stateName) {
        skipped++
        continue
      }

      const stateSlug = stateName.toLowerCase().replace(/\s+/g, '-')
      const { docs: stateRecords } = await payload.find({
        collection: 'states',
        where: {
          slug: {
            equals: stateSlug,
          },
        },
        limit: 1,
      })

      if (stateRecords.length === 0) {
        skipped++
        continue
      }

      const stateId = stateRecords[0].id
      const slug = createSlug(stateName, record.featureName)

      const { docs: existingArticles } = await payload.find({
        collection: 'articles',
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
      })

      if (existingArticles.length > 0) {
        skipped++
        continue
      }

      try {
        await payload.create({
          collection: 'articles',
          data: {
            title: `${stateName}: ${record.featureName}`,
            slug,
            state: stateId,
            stateCode,
            featureName: record.featureName,
            category: mapCategoryToSlug(record.category),
            complianceLevel: record.complianceLevel,
            summary: generateSummary(record, stateName),
            keyRequirements: (record.requirements || []).slice(0, 8).map((req: string) => ({ requirement: req })),
            officialSources: [
              ...(record.laws || []).map((law: string) => ({
                sourceName: law,
                sourceUrl: '',
                sourceType: 'statute',
              })),
              ...(record.regulations || []).map((reg: string) => ({
                sourceName: reg,
                sourceUrl: '',
                sourceType: 'regulation',
              })),
            ],
            opengovReadiness: record.opengovReadiness,
            opengovNotes: record.opengovNotes || '',
            status: 'published',
            publishedDate: new Date().toISOString(),
            lastReviewed: new Date().toISOString(),
            author: authorId,
            tags: [
              { tag: stateCode.toLowerCase() },
              { tag: record.category.toLowerCase().replace(/\s+/g, '-') },
              { tag: record.complianceLevel },
            ],
            seo: {
              metaTitle: `${stateName}: ${record.featureName} - Compliance Guide`,
              metaDescription: generateSummary(record, stateName).substring(0, 160),
              keywords: `${stateName}, ${record.featureName}, compliance, local government`,
            },
          },
        })

        created++
      } catch (error: any) {
        console.error(`Error creating article: ${error.message}`)
        skipped++
      }
    }

    return NextResponse.json({
      success: true,
      message: `Seed completed!\n✅ Created: ${created} articles\n⚠️  Skipped: ${skipped} articles\n📊 Total processed: ${phase1Records.length} records`,
      created,
      skipped,
      total: phase1Records.length,
    })
  } catch (error: any) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { error: error.message || 'Seed failed' },
      { status: 500 }
    )
  }
}
