#!/usr/bin/env bash
# exit on error
set -o errexit

npm i
npm run build
npm run typeorm migration:generate src/migrations/firstMigrations -- -d src/data-source.ts
npm run typeorm migration:run -- -d dist/data-source