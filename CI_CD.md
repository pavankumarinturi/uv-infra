# CI_CD.md — GitHub Actions Pipeline for UV Infra

## What is CI/CD?

**CI** (Continuous Integration) = Every code push is automatically tested  
**CD** (Continuous Deployment) = Passing code is automatically deployed to Vercel

```
You push code → GitHub → Tests run automatically → Deploy to uv-infra.com
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
               Tests pass?         Tests fail?
               Deploy! ✅          Alert you ❌ (site unchanged)
```

---

## File: .github/workflows/deploy.yml

Create this file exactly at that path in your project:

```yaml
name: UV Infra — CI/CD Pipeline

on:
  push:
    branches:
      - main        # Production deployment
      - develop     # Preview deployment
  pull_request:
    branches:
      - main        # Run tests on PRs

env:
  NODE_VERSION: '20'

jobs:
  # ─── JOB 1: Test & Build ──────────────────────────────
  test:
    name: Test & Build
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ env.NODE_VERSION }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: TypeScript type check
        run: npm run type-check

      - name: ESLint code quality check
        run: npm run lint

      - name: Run unit tests
        run: npm test -- --ci --coverage
        env:
          RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
          NOTIFICATION_EMAIL: test@example.com

      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: https://uv-infra.com
          NEXT_PUBLIC_PHONE_1: "+917386086043"
          NEXT_PUBLIC_PHONE_2: "+919505944456"
          NEXT_PUBLIC_WHATSAPP_NUMBER: "917386086043"
          RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
          CLOUDINARY_CLOUD_NAME: ${{ secrets.CLOUDINARY_CLOUD_NAME }}
          CLOUDINARY_API_KEY: ${{ secrets.CLOUDINARY_API_KEY }}
          CLOUDINARY_API_SECRET: ${{ secrets.CLOUDINARY_API_SECRET }}
          NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: ${{ secrets.CLOUDINARY_CLOUD_NAME }}

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: nextjs-build
          path: .next/
          retention-days: 1

  # ─── JOB 2: Deploy to Vercel ──────────────────────────
  deploy:
    name: Deploy to Vercel
    runs-on: ubuntu-latest
    needs: test                          # Only runs if tests pass
    if: github.ref == 'refs/heads/main'  # Only on main branch

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install Vercel CLI
        run: npm install -g vercel@latest

      - name: Pull Vercel environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build for Vercel
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy to production
        id: deploy
        run: |
          URL=$(vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }})
          echo "deployment_url=$URL" >> $GITHUB_OUTPUT

      - name: Comment deployment URL on PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🚀 **Deployed to production:** ${{ steps.deploy.outputs.deployment_url }}'
            })

  # ─── JOB 3: Preview Deployment (develop branch) ───────
  preview:
    name: Deploy Preview
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/develop'

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - run: npm install -g vercel@latest
      - run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}

  # ─── JOB 4: Lighthouse Performance Audit ──────────────
  lighthouse:
    name: Lighthouse Audit
    runs-on: ubuntu-latest
    needs: deploy
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            https://uv-infra.com
            https://uv-infra.com/#projects
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true
          temporaryPublicStorage: true
```

---

## File: lighthouse-budget.json

```json
[
  {
    "path": "/*",
    "timings": [
      { "metric": "first-contentful-paint", "budget": 2000 },
      { "metric": "largest-contentful-paint", "budget": 3000 },
      { "metric": "total-blocking-time", "budget": 300 }
    ],
    "scores": [
      { "category": "performance", "minScore": 85 },
      { "category": "accessibility", "minScore": 90 },
      { "category": "best-practices", "minScore": 90 },
      { "category": "seo", "minScore": 95 }
    ]
  }
]
```

---

## Setting Up GitHub Secrets

Go to: GitHub → Your Repo → Settings → Secrets and Variables → Actions → New Secret

| Secret Name | Where to Get | Value |
|------------|-------------|-------|
| `VERCEL_TOKEN` | vercel.com/account/tokens | API token |
| `VERCEL_ORG_ID` | Run `vercel link` locally | Shows in `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Run `vercel link` locally | Shows in `.vercel/project.json` |
| `RESEND_API_KEY` | resend.com/api-keys | `re_xxxx...` |
| `CLOUDINARY_CLOUD_NAME` | cloudinary.com/console | Cloud name |
| `CLOUDINARY_API_KEY` | cloudinary.com/console | API Key number |
| `CLOUDINARY_API_SECRET` | cloudinary.com/console | API Secret |

### Getting Vercel IDs

```bash
# In your project folder:
npx vercel link

# Then check the file created:
cat .vercel/project.json
# Shows: { "orgId": "...", "projectId": "..." }
```

---

## Branch Strategy

```
main ──────────────────────────────────→ uv-infra.com (Production)
  │
  └── develop ────────────────────────→ uv-infra.vercel.app (Preview)
        │
        └── feature/add-gallery ──────→ PR → Review → Merge to develop
        └── fix/contact-form ─────────→ PR → Review → Merge to develop
```

**Workflow:**
1. Create feature branch from `develop`
2. Make changes, push
3. Open Pull Request → tests run automatically
4. Review looks good → merge to `develop` → preview deploy
5. Test on preview URL
6. Merge `develop` → `main` → production deploy to uv-infra.com

---

## package.json Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "format": "prettier --write .",
    "analyze": "ANALYZE=true next build"
  }
}
```
