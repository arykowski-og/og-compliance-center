import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
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
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [
        {
          slug: 'hero',
          labels: {
            singular: 'Hero Section',
            plural: 'Hero Sections',
          },
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
              name: 'ctaText',
              type: 'text',
              label: 'CTA Button Text',
            },
            {
              name: 'ctaLink',
              type: 'text',
              label: 'CTA Button Link',
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          slug: 'content',
          labels: {
            singular: 'Content Block',
            plural: 'Content Blocks',
          },
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          slug: 'features',
          labels: {
            singular: 'Features Grid',
            plural: 'Features Grids',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'features',
              type: 'array',
              minRows: 1,
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
        {
          slug: 'cta',
          labels: {
            singular: 'Call to Action',
            plural: 'Call to Actions',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'primaryButton',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
            {
              name: 'secondaryButton',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
          ],
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
