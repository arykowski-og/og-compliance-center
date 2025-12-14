import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { Users } from './collections/Users'
import { States } from './collections/States'
import { Articles } from './collections/Articles'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- OpenGov Compliance Center',
      favicon: '/favicon.ico',
      ogImage: '/og-image.png',
    },
  },
  collections: [
    Users,
    States,
    Articles,
    Pages,
    Media,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      host: 'localhost',
      port: 5432,
      user: 'arykowski',
      password: '',
      database: 'og_compliance',
    },
  }),
  sharp,
  plugins: [],
})
