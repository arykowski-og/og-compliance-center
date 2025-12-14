import type { CollectionConfig } from 'payload'

export const States: CollectionConfig = {
  slug: 'states',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'abbreviation', 'status', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'State Name',
    },
    {
      name: 'abbreviation',
      type: 'text',
      required: true,
      unique: true,
      label: 'State Abbreviation',
      maxLength: 2,
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
            if (!value && data?.name) {
              return data.name.toLowerCase().replace(/\s+/g, '-')
            }
            return value
          },
        ],
      },
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
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Hero Section',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'subtitle',
                  type: 'textarea',
                },
                {
                  name: 'lastUpdated',
                  type: 'date',
                  required: true,
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                  },
                },
              ],
            },
            {
              name: 'quickStats',
              type: 'array',
              label: 'Quick Stats',
              maxRows: 4,
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Icon (emoji or class)',
                },
              ],
            },
          ],
        },
        {
          label: 'Financial Management',
          fields: [
            {
              name: 'financialManagement',
              type: 'group',
              fields: [
                {
                  name: 'requirements',
                  type: 'richText',
                  label: 'Requirements & Standards',
                },
                {
                  name: 'keyFeatures',
                  type: 'array',
                  label: 'Key Features',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                    },
                    {
                      name: 'icon',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Budgeting & Planning',
          fields: [
            {
              name: 'budgeting',
              type: 'group',
              fields: [
                {
                  name: 'requirements',
                  type: 'richText',
                  label: 'Requirements & Standards',
                },
                {
                  name: 'keyFeatures',
                  type: 'array',
                  label: 'Key Features',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Procurement',
          fields: [
            {
              name: 'procurement',
              type: 'group',
              fields: [
                {
                  name: 'requirements',
                  type: 'richText',
                  label: 'Requirements & Standards',
                },
                {
                  name: 'keyFeatures',
                  type: 'array',
                  label: 'Key Features',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Resources',
          fields: [
            {
              name: 'relatedArticles',
              type: 'relationship',
              relationTo: 'articles',
              hasMany: true,
              label: 'Related Articles',
            },
            {
              name: 'externalResources',
              type: 'array',
              label: 'External Resources',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
            {
              name: 'downloadableResources',
              type: 'array',
              label: 'Downloadable Resources',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
