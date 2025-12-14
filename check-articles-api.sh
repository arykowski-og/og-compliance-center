#!/bin/bash
# Quick script to check articles via API

echo "Fetching articles from API..."
curl -s 'http://localhost:3000/api/articles?limit=20' | python3 -c "
import json, sys
data = json.load(sys.stdin)
print(f'\nTotal Articles: {data.get(\"totalDocs\", 0)}\n')
print('Articles:')
print('=' * 80)
for i, article in enumerate(data.get('docs', []), 1):
    print(f'{i}. {article.get(\"title\", \"No title\")}')
    print(f'   Slug: {article.get(\"slug\", \"No slug\")}')
    print(f'   URL: http://localhost:3000/articles/{article.get(\"slug\", \"\")}')
    print(f'   Status: {article.get(\"status\", \"unknown\")}')
    print()
"
