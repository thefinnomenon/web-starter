# Environment Configuration

This project supports multiple environments: development, staging, and production. Each environment has its own configuration file and build scripts.

## Environment Files

### `.env.example`

Template file showing all available environment variables. Copy this to `.env.local` and fill in your specific values for local development.

### `.env.development`

Default configuration for development environment. These values are used when running `yarn dev`.

### `.env.staging`

Configuration for staging environment. Used for testing deployments with production-like settings.

### `.env.production` (not committed)

Production environment configuration. Should be created in your deployment environment and managed by your CI/CD system or hosting platform.

### `.env.local` (not committed)

Local overrides for any environment. This file should contain sensitive values like API keys and is ignored by git.

## Environment Variables

### Public Variables (Available in Browser)

These variables are prefixed with `NEXT_PUBLIC_` and are available in client-side code:

- `NEXT_PUBLIC_APP_NAME` - Application name
- `NEXT_PUBLIC_APP_VERSION` - Application version
- `NEXT_PUBLIC_APP_ENV` - Current environment (development/staging/production)
- `NEXT_PUBLIC_API_URL` - API base URL
- `NEXT_PUBLIC_ENABLE_ANALYTICS` - Enable/disable analytics
- `NEXT_PUBLIC_ENABLE_MAINTENANCE_MODE` - Enable/disable maintenance mode
- `NEXT_PUBLIC_ENABLE_DEBUG_MODE` - Enable/disable debug features
- `NEXT_PUBLIC_LOG_LEVEL` - Logging level (debug/info/warn/error)

### Server-only Variables

These variables are only available on the server side:

- `API_SECRET_KEY` - Secret key for API authentication
- `DATABASE_URL` - Database connection string
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - Email configuration
- `OPENAI_API_KEY` - OpenAI API key
- `STRIPE_SECRET_KEY` - Stripe secret key

## Usage in Code

Import the environment configuration utility:

\`\`\`typescript
import { env, isDevelopment, isProduction, type Environment } from '@/lib/env'

// Access environment variables (validated and type-safe)
const apiUrl = env.API_URL
const appName = env.APP_NAME

// Check environment
if (isDevelopment()) {
console.log('Running in development mode')
}

// Server-side only (validated optional values)
const secretKey = env.server.API_SECRET_KEY
const dbUrl = env.server.DATABASE_URL

// Type-safe environment checking
const currentEnv: Environment = env.APP_ENV
\`\`\`

## Validation Benefits

This project uses **Zod** for environment variable validation, providing:

- **Runtime validation** - Invalid environment values will cause the app to fail fast at startup
- **Type safety** - Full TypeScript support with inferred types
- **Automatic transformations** - String-to-boolean conversion for feature flags
- **Default values** - Sensible defaults when environment variables are not set
- **Better error messages** - Clear validation errors when values are invalid

### Validation Errors

If environment variables are invalid, you'll see helpful error messages:

\`\`\`bash
ZodError: [
{
"code": "invalid_string",
"validation": "url",
"message": "Invalid url",
"path": ["NEXT_PUBLIC_API_URL"]
}
]
\`\`\`

## Available Scripts

### Development

- `yarn dev` - Start development server (uses .env.development)
- `yarn dev:staging` - Start development server with staging config
- `yarn dev:production` - Start development server with production config

### Build

- `yarn build` - Build for development
- `yarn build:staging` - Build for staging environment
- `yarn build:production` - Build for production environment

### Start

- `yarn start` - Start production server (after build)
- `yarn start:staging` - Start server with staging config
- `yarn start:production` - Start server with production config

## Deployment

### Local Development

1. Copy `.env.example` to `.env.local`
2. Fill in your local values
3. Run `yarn dev`

### Staging Deployment

1. Ensure `.env.staging` has correct values
2. Run `yarn build:staging`
3. Deploy the built application

### Production Deployment

1. Ensure `.env.production` has correct values
2. Run `yarn build:production`
3. Deploy the built application

## Security Notes

- Never commit sensitive values to git
- Use `.env.local` for local secrets
- Set environment variables directly in your deployment platform for staging/production secrets
- Public variables (prefixed with `NEXT_PUBLIC_`) are exposed to the browser - never put secrets in them

## Environment Priority

Next.js loads environment variables in this order (highest priority first):

1. `.env.local` (always ignored by git)
2. `.env.production`, `.env.staging`, `.env.development` (based on NODE_ENV)
3. `.env`

Local values in `.env.local` will override any other environment file.
