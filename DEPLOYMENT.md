# Deployment Guide

## Overview

This guide covers deployment strategies, configuration, and best practices for the portfolio application. The application is optimized for deployment on modern hosting platforms with support for static generation and server-side rendering.

## Deployment Platforms

### Vercel (Recommended)

Vercel provides the best experience for Next.js applications with zero-configuration deployment.

#### Setup

1. **Connect Repository**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel automatically detects Next.js configuration

2. **Environment Variables**:

   ```env
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
   ```

3. **Build Configuration**:

   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm install",
     "devCommand": "npm run dev"
   }
   ```

4. **Custom Domain** (Optional):
   - Add custom domain in Vercel dashboard
   - Configure DNS records as instructed
   - SSL certificate is automatically provisioned

#### Vercel Configuration

Create `vercel.json` for advanced configuration:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

### Netlify

Alternative deployment platform with excellent static site support.

#### Setup

1. **Connect Repository**:
   - Visit [netlify.com](https://netlify.com)
   - Connect your GitHub repository

2. **Build Settings**:

   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables**:
   ```env
   NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
   NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
   ```

#### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

[[redirects]]
  from = "/old-path"
  to = "/new-path"
  status = 301
```

### Self-Hosted (Docker)

For custom hosting environments using Docker.

#### Dockerfile

```dockerfile
# Multi-stage build for optimal image size
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose

```yaml
version: "3.8"

services:
  portfolio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SITE_URL=https://your-domain.com
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - portfolio
    restart: unless-stopped
```

## Build Optimization

### Next.js Configuration

Optimize `next.config.ts` for production:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static optimization
  output: "standalone",

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ["example.com"], // Add your image domains
  },

  // Compression
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/old-path",
        destination: "/new-path",
        permanent: true,
      },
    ];
  },

  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "@heroicons/react"],
  },

  // Bundle analyzer (development only)
  ...(process.env.ANALYZE === "true" && {
    webpack: (config: any) => {
      config.plugins.push(
        new (require("@next/bundle-analyzer"))({
          enabled: true,
        })
      );
      return config;
    },
  }),
};

export default nextConfig;
```

### Bundle Analysis

Analyze bundle size to optimize performance:

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Analyze bundle
ANALYZE=true npm run build
```

### Performance Optimizations

#### Code Splitting

```typescript
// Route-based splitting
const ProjectsPage = dynamic(() => import('./projects/page'), {
  loading: () => <ProjectsPageSkeleton />,
  ssr: true,
});

// Component-based splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false,
  loading: () => <ComponentSkeleton />,
});
```

#### Image Optimization

```typescript
// Optimized image loading
<OptimizedImage
  src="/hero-image.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  priority={true}
  placeholder="blur"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

#### Font Optimization

```typescript
// app/layout.tsx
import { GeistSans, GeistMono } from 'geist/font';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

## Environment Configuration

### Environment Variables

#### Development (`.env.local`)

```env
# Site configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Portfolio"

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=dev-analytics-id

# Feature flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_CONTACT_FORM=true

# Development settings
NODE_ENV=development
```

#### Production (`.env.production`)

```env
# Site configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME="Your Portfolio"

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=prod-analytics-id

# Feature flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_CONTACT_FORM=true

# Production settings
NODE_ENV=production
```

### Environment Validation

Create `lib/env.ts` for environment validation:

```typescript
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_SITE_NAME: z.string().min(1),
  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.string().transform((val) => val === "true"),
  NEXT_PUBLIC_ENABLE_CONTACT_FORM: z
    .string()
    .transform((val) => val === "true"),
});

export const env = envSchema.parse(process.env);
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality-check:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run type checking
        run: npm run type-check

      - name: Run linting
        run: npm run lint

      - name: Run format checking
        run: npm run format:check

      - name: Run tests
        run: npm run test:ci

      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: ${{ secrets.SITE_URL }}
          NEXT_PUBLIC_ANALYTICS_ID: ${{ secrets.ANALYTICS_ID }}

  deploy:
    needs: quality-check
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

### Deployment Scripts

Add deployment scripts to `package.json`:

```json
{
  "scripts": {
    "deploy:vercel": "vercel --prod",
    "deploy:netlify": "netlify deploy --prod",
    "deploy:docker": "docker build -t portfolio . && docker run -p 3000:3000 portfolio",
    "preview:vercel": "vercel",
    "preview:netlify": "netlify deploy"
  }
}
```

## Monitoring and Analytics

### Performance Monitoring

#### Web Vitals

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

#### Custom Analytics

```typescript
// lib/analytics.ts
export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, properties);
  }
};

// Usage
trackEvent("project_view", {
  project_id: project.id,
  project_title: project.title,
});
```

### Error Monitoring

#### Sentry Integration

```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

### Health Checks

Create API route for health checks:

```typescript
// app/api/health/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const healthCheck = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version,
  };

  return NextResponse.json(healthCheck);
}
```

## Security

### Security Headers

Configure security headers in `next.config.ts`:

```typescript
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-analytics.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob: *.vercel.com;
      font-src 'self';
      connect-src 'self' *.vercel-analytics.com;
    `
      .replace(/\s{2,}/g, " ")
      .trim(),
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
];
```

### Environment Security

- **Never commit** sensitive environment variables
- **Use secrets management** for production credentials
- **Rotate keys** regularly
- **Limit API access** with proper authentication

## Troubleshooting

### Common Deployment Issues

#### Build Failures

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

#### Memory Issues

```json
// package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

#### Environment Variable Issues

```bash
# Check environment variables
npm run build -- --debug

# Verify environment loading
console.log('Environment:', process.env.NODE_ENV);
```

### Performance Issues

#### Bundle Size

```bash
# Analyze bundle
ANALYZE=true npm run build

# Check for large dependencies
npm ls --depth=0 --long
```

#### Image Optimization

```typescript
// Optimize images
<OptimizedImage
  src="/large-image.jpg"
  alt="Description"
  width={800}
  height={600}
  quality={85}
  placeholder="blur"
/>
```

### Monitoring Deployment

#### Vercel Deployment

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Check build logs
vercel inspect [deployment-url]
```

#### Custom Monitoring

```typescript
// Health check endpoint
export async function GET() {
  try {
    // Check database connection
    // Check external services
    // Check file system

    return NextResponse.json({ status: "healthy" });
  } catch (error) {
    return NextResponse.json(
      { status: "unhealthy", error: error.message },
      { status: 500 }
    );
  }
}
```

## Rollback Strategy

### Vercel Rollback

```bash
# List deployments
vercel ls

# Promote previous deployment
vercel promote [deployment-url]
```

### Docker Rollback

```bash
# Tag current version
docker tag portfolio:latest portfolio:backup

# Deploy previous version
docker run -p 3000:3000 portfolio:previous
```

### Database Migrations

```bash
# Backup before deployment
pg_dump portfolio_db > backup.sql

# Rollback if needed
psql portfolio_db < backup.sql
```

This deployment guide ensures reliable, secure, and performant deployment of the portfolio application across various hosting platforms.
