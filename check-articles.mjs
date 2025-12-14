#!/usr/bin/env node

/**
 * Quick script to check what articles exist via the API
 */

async function checkArticles() {
  try {
    const response = await fetch('http://localhost:3000/api/articles?limit=100')
    
    if (!response.ok) {
      console.error('Failed to fetch articles:', response.statusText)
      process.exit(1)
    }
    
    const data = await response.json()
    
    console.log('\n📊 Articles in Database\n')
    console.log(`Total: ${data.totalDocs} articles\n`)
    
    if (data.docs && data.docs.length > 0) {
      data.docs.forEach((article, idx) => {
        console.log(`${idx + 1}. ${article.title}`)
        console.log(`   Slug: ${article.slug}`)
        console.log(`   Category: ${article.category}`)
        console.log(`   Status: ${article.status}`)
        console.log(`   URL: http://localhost:3000/articles/${article.slug}`)
        console.log('')
      })
    } else {
      console.log('No articles found.')
    }
    
    // Check for the specific California Single Audit article
    const singleAuditArticles = data.docs.filter(doc => 
      doc.slug.includes('california') && doc.slug.includes('single-audit')
    )
    
    if (singleAuditArticles.length > 0) {
      console.log('\n🔍 California Single Audit Articles Found:\n')
      singleAuditArticles.forEach(article => {
        console.log(`   Title: ${article.title}`)
        console.log(`   Slug: ${article.slug}`)
        console.log(`   Has detailed content: ${article.content ? 'Yes' : 'No'}`)
      })
    }
    
  } catch (error) {
    console.error('Error:', error.message)
    console.log('\nMake sure the dev server is running: npm run dev')
    process.exit(1)
  }
}

checkArticles()
