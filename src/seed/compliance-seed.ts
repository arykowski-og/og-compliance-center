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

interface ComplianceRecord {
  stateCode: string
  featureName: string
  category: string
  complianceLevel: string
  opengovReadiness: string
  opengovNotes: string
  laws: string[]
  regulations: string[]
  requirements: string[]
  notes: string
  sourceDocument?: string
}

interface ComplianceData {
  complianceData: ComplianceRecord[]
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

function generatePlainLanguageSummary(record: ComplianceRecord, stateName: string): string {
  const feature = record.featureName
  const level = record.complianceLevel
  
  if (feature.includes('Single Audit')) {
    return `Single Audit is a federal requirement for local governments in ${stateName} that spend more than $750,000 in federal grants per year. This audit ensures your organization is using federal funds correctly and following all compliance rules. You'll need to track federal spending carefully and have an independent auditor review your spending annually.`
  }
  
  if (feature.includes('GASB 54')) {
    return `GASB 54 requires local governments in ${stateName} to classify fund balances in their financial reports. This standard helps make your financial statements clearer by showing which funds are available to spend and which have restrictions. Your finance team needs to categorize fund balances as nonspendable, restricted, committed, assigned, or unassigned.`
  }
  
  if (feature.includes('Encumbrance')) {
    return `Encumbrance accounting helps ${stateName} local governments track purchase orders and commitments before money is actually spent. This gives you better budget control by reserving funds when you commit to a purchase, not just when you pay the bill. It's ${level === 'required' ? 'required' : 'recommended'} for maintaining accurate budget tracking.`
  }
  
  if (feature.includes('Grant Management')) {
    return `Grant management systems help ${stateName} local governments track federal, state, and foundation grants from application through closeout. You need to monitor grant budgets, track spending by grant program, and ensure compliance with each grantor's requirements. Proper grant management prevents audit findings and potential repayment of grant funds.`
  }
  
  if (feature.includes('Property Tax')) {
    return `Property tax ${feature.includes('Assessment') ? 'assessment' : 'billing and collection'} is ${level === 'required' ? 'required' : 'recommended'} for local governments in ${stateName}. This involves ${feature.includes('Assessment') ? 'maintaining property records, calculating assessed values, and integrating with CAMA systems' : 'generating tax bills, processing payments, and managing delinquencies'}. Proper systems ensure accurate revenue collection and compliance with state laws.`
  }
  
  if (feature.includes('Payroll')) {
    return `Payroll processing for ${stateName} local governments must comply with state and federal requirements for calculating wages, withholding taxes, and reporting employment information. Your payroll system needs to handle multiple pay rates, deductions, benefits, and reporting to state agencies. Accurate payroll processing ensures employees are paid correctly and tax obligations are met.`
  }
  
  if (feature.includes('Utility Billing')) {
    return `Utility billing systems help ${stateName} local governments manage water, sewer, electric, gas, and trash services. You need to read meters, calculate bills, process payments, and manage delinquent accounts. Modern utility billing systems integrate with your financial system for accurate revenue tracking.`
  }
  
  return `This ${level} compliance requirement for ${stateName} local governments relates to ${feature}. Proper implementation ensures your organization meets state and federal standards while maintaining accurate records and reporting.`
}

function generateArticleContent(record: ComplianceRecord, stateName: string): any {
  const summary = generatePlainLanguageSummary(record, stateName)
  const requirements = record.requirements.length > 0 ? record.requirements : [
    'Maintain accurate and timely records',
    'Comply with applicable state and federal regulations',
    'Submit required reports to oversight agencies',
    'Implement appropriate internal controls',
  ]
  
  const laws = [...record.laws, ...record.regulations].filter(Boolean)
  
  const content = {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'What You Need to Know' }],
        },
        {
          type: 'paragraph',
          children: [{ type: 'text', text: summary }],
        },
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Key Requirements' }],
        },
        {
          type: 'list',
          listType: 'bullet',
          children: requirements.slice(0, 8).map((req) => ({
            type: 'listitem',
            children: [
              {
                type: 'paragraph',
                children: [{ type: 'text', text: req }],
              },
            ],
          })),
        },
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Compliance Level' }],
        },
        {
          type: 'paragraph',
          children: [{ 
            type: 'text', 
            text: `This requirement is ${record.complianceLevel} for local governments in ${stateName}.` 
          }],
        },
      ],
    },
  }
  
  if (laws.length > 0) {
    content.root.children.push(
      {
        type: 'heading',
        tag: 'h2',
        children: [{ type: 'text', text: 'Official Sources' }],
      },
      {
        type: 'list',
        listType: 'bullet',
        children: laws.map((law) => ({
          type: 'listitem',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: law }],
            },
          ],
        })),
      }
    )
  }
  
  if (record.notes) {
    content.root.children.push(
      {
        type: 'heading',
        tag: 'h2',
        children: [{ type: 'text', text: 'Additional Notes' }],
      },
      {
        type: 'paragraph',
        children: [{ type: 'text', text: record.notes }],
      }
    )
  }
  
  if (record.opengovNotes) {
    content.root.children.push(
      {
        type: 'heading',
        tag: 'h2',
        children: [{ type: 'text', text: 'OpenGov Solution' }],
      },
      {
        type: 'paragraph',
        children: [{ type: 'text', text: record.opengovNotes }],
      }
    )
  }
  
  return content
}

async function seedComplianceArticles() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting compliance articles seed...')

  const dataPath = path.join(process.cwd(), 'state-compliance-data.json')
  const rawData = fs.readFileSync(dataPath, 'utf-8')
  const complianceData: ComplianceData = JSON.parse(rawData)

  const { docs: users } = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (!users || users.length === 0) {
    console.error('❌ No users found. Please run basic seed first.')
    process.exit(1)
  }

  const authorId = users[0].id

  const statesMap = new Map(US_STATES.map(s => [s.abbreviation, s.name]))

  const PHASE_1_STATES = ['CA', 'TX', 'CO']
  
  const phase1Records = complianceData.complianceData.filter(record => 
    PHASE_1_STATES.includes(record.stateCode)
  )

  console.log(`📊 Found ${phase1Records.length} Phase 1 records (CA, TX, CO)`)

  let created = 0
  let skipped = 0

  for (const record of phase1Records) {
    const stateName = statesMap.get(record.stateCode)
    if (!stateName) {
      console.log(`⚠️  Unknown state code: ${record.stateCode}`)
      continue
    }

    const slug = createArticleSlug(stateName, record.featureName)
    const title = `${stateName}: ${record.featureName}`
    const summary = generatePlainLanguageSummary(record, stateName)
    const content = generateArticleContent(record, stateName)

    const {docs: states} = await payload.find({
      collection: 'states',
      where: {
        abbreviation: {
          equals: record.stateCode,
        },
      },
      limit: 1,
    })

    try {
      await payload.create({
        collection: 'articles',
        data: {
          title,
          slug,
          excerpt: summary.substring(0, 190) + '...',
          content,
          status: 'published',
          publishedDate: new Date().toISOString(),
          author: authorId,
          category: CATEGORY_MAP[record.category] || 'regulatory',
          relatedStates: states.length > 0 ? [states[0].id] : [],
          tags: [
            { tag: record.featureName.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
            { tag: record.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
            { tag: record.complianceLevel },
            { tag: stateName.toLowerCase().replace(/\s+/g, '-') },
          ],
        },
      })
      
      created++
      console.log(`✅ Created: ${title}`)
    } catch (error) {
      skipped++
      console.log(`⚠️  Skipped (may exist): ${title}`)
    }
  }

  console.log(`\n📈 Results:`)
  console.log(`   ✅ Created: ${created}`)
  console.log(`   ⚠️  Skipped: ${skipped}`)
  console.log(`   📄 Total processed: ${phase1Records.length}`)
  console.log('\n🎉 Compliance articles seed completed!')
  
  process.exit(0)
}

seedComplianceArticles().catch((error) => {
  console.error('❌ Seed failed:', error)
  process.exit(1)
})
