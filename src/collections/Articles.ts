import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'state', 'category', 'complianceLevel', 'status'],
    group: 'Content',
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) {
        return {
          status: {
            equals: 'published',
          },
        }
      }
      return true
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Article Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'state',
      type: 'relationship',
      relationTo: 'states',
      required: true,
      admin: {
        position: 'sidebar',
      },
      label: 'State',
    },
    {
      name: 'stateCode',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
      label: 'State Code (e.g., CA, TX)',
    },
    {
      name: 'featureName',
      type: 'text',
      required: true,
      label: 'Feature Name',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      admin: {
        position: 'sidebar',
      },
      options: [
        {
          label: 'Financial Management',
          value: 'financial-management',
        },
        {
          label: 'HR & Employment',
          value: 'hr-employment',
        },
        {
          label: 'Procurement & Purchasing',
          value: 'procurement-purchasing',
        },
        {
          label: 'Revenue & Taxation',
          value: 'revenue-taxation',
        },
        {
          label: 'Open Government',
          value: 'open-government',
        },
        {
          label: 'Community Development',
          value: 'community-development',
        },
      ],
    },
    {
      name: 'complianceLevel',
      type: 'select',
      required: true,
      admin: {
        position: 'sidebar',
      },
      label: 'Compliance Level',
      options: [
        {
          label: 'Required',
          value: 'required',
        },
        {
          label: 'Recommended',
          value: 'recommended',
        },
        {
          label: 'Optional',
          value: 'optional',
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 500,
      label: 'Plain-Language Summary (What You Need to Know)',
    },
    {
      name: 'keyRequirements',
      type: 'array',
      label: 'Key Requirements',
      fields: [
        {
          name: 'requirement',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'whoDoesThisApplyTo',
      type: 'richText',
      label: 'Who Does This Apply To?',
    },
    {
      name: 'implementationSteps',
      type: 'array',
      label: 'Implementation Guide Steps',
      fields: [
        {
          name: 'stepTitle',
          type: 'text',
        },
        {
          name: 'stepDescription',
          type: 'richText',
        },
        {
          name: 'timing',
          type: 'text',
          label: 'Timing (e.g., "Monthly", "Before fiscal year end")',
        },
        {
          name: 'responsible',
          type: 'text',
          label: 'Responsible Party',
        },
      ],
    },
    {
      name: 'officialSources',
      type: 'array',
      label: 'Official Sources & Citations',
      fields: [
        {
          name: 'sourceName',
          type: 'text',
        },
        {
          name: 'sourceUrl',
          type: 'text',
        },
        {
          name: 'sourceType',
          type: 'select',
          options: [
            { label: 'Statute', value: 'statute' },
            { label: 'Regulation', value: 'regulation' },
            { label: 'Agency Guidance', value: 'guidance' },
            { label: 'Court Ruling', value: 'court' },
          ],
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'Frequently Asked Questions',
      fields: [
        {
          name: 'question',
          type: 'text',
        },
        {
          name: 'answer',
          type: 'richText',
        },
      ],
    },
    {
      name: 'practicalExamples',
      type: 'array',
      label: 'Practical Examples',
      fields: [
        {
          name: 'exampleTitle',
          type: 'text',
        },
        {
          name: 'exampleDescription',
          type: 'richText',
        },
        {
          name: 'exampleUrl',
          type: 'text',
          label: 'Link to Sample Document',
        },
      ],
    },
    {
      name: 'enforcementAndPenalties',
      type: 'group',
      label: 'Enforcement & Penalties',
      fields: [
        {
          name: 'enforcingAgency',
          type: 'text',
        },
        {
          name: 'potentialPenalties',
          type: 'array',
          fields: [
            {
              name: 'penalty',
              type: 'text',
            },
          ],
        },
        {
          name: 'riskLevel',
          type: 'select',
          options: [
            { label: 'High Risk', value: 'high' },
            { label: 'Medium Risk', value: 'medium' },
            { label: 'Low Risk', value: 'low' },
          ],
        },
      ],
    },
    {
      name: 'opengovReadiness',
      type: 'select',
      label: 'OpenGov Product Readiness',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Full Support', value: 'full' },
        { label: 'Partial Support', value: 'partial' },
        { label: 'No Support', value: 'none' },
      ],
    },
    {
      name: 'opengovNotes',
      type: 'textarea',
      label: 'OpenGov Product Notes',
    },
    {
      name: 'relatedArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      label: 'Related Requirements',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Ready for Review', value: 'ready-for-review' },
        { label: 'In Editing', value: 'in-editing' },
        { label: 'Ready for SME Review', value: 'ready-for-sme' },
        { label: 'SME Review in Progress', value: 'sme-review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Final QA', value: 'final-qa' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Published', value: 'published' },
        { label: 'Needs Update', value: 'needs-update' },
      ],
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'lastReviewed',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
      label: 'Last Reviewed Date',
    },
    {
      name: 'nextReview',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
      label: 'Next Review Date',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'reviewer',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
      label: 'SME Reviewer',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
        },
        {
          name: 'keywords',
          type: 'text',
        },
      ],
    },
  ],
}
