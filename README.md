# Web Starter

A modern Next.js starter template with shadcn/ui components, dark mode, form validation, email sending, and analytics built-in.

## Features

- **Next.js 15** - React framework with App Router
- **shadcn/ui** - Beautiful, accessible UI components
- **Dark Mode** - Theme switching with next-themes
- **Form Validation** - React Hook Form + Zod schema validation
- **Email** - React Email + Resend for transactional emails
- **Analytics** - Mixpanel for user tracking and metrics
- **Error Tracking** - Sentry for error monitoring
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **ESLint + Prettier** - Code formatting and linting
- **Husky** - Pre-commit hooks

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Set Up Environment Variables

Create or update your `.env` file with the required API keys:

```bash
# App Environment
NEXT_PUBLIC_APP_ENV=development

# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key_here
EMAIL_FROM=onboarding@resend.dev

# Analytics (Mixpanel)
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token_here
MIXPANEL_TOKEN=your_mixpanel_token_here

# Error Tracking (Sentry)
SENTRY_AUTH_TOKEN=your_sentry_auth_token_here
```

#### Getting API Keys:

**Resend (Email)**

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Use `onboarding@resend.dev` as `EMAIL_FROM` (free tier) or add your own domain

**Mixpanel (Analytics)**

1. Sign up at [mixpanel.com](https://mixpanel.com)
2. Create a new project
3. Copy the project token from Settings

**Sentry (Error Tracking)**

1. Sign up at [sentry.io](https://sentry.io)
2. Create a new Next.js project
3. Follow the setup wizard to get your auth token

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

### 4. Preview Emails (Optional)

To preview and test email templates locally:

```bash
npm run email
# or
yarn email
```

This starts the React Email preview server at [http://localhost:3001](http://localhost:3001).

## Project Structure

```
src/
├── app/              # Next.js app router pages and API routes
├── components/       # React components (UI components from shadcn/ui)
├── emails/          # Email templates (React Email)
├── lib/             # Utility functions and configurations
│   ├── email.ts     # Email sending logic (Resend)
│   ├── env.ts       # Environment configuration
│   └── mixpanel.ts  # Analytics tracking
└── styles/          # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run email` - Preview email templates

## Environment-Specific Builds

```bash
# Development
npm run dev

# Staging
npm run dev:staging
npm run build:staging
npm run start:staging

# Production
npm run dev:production
npm run build:production
npm run start:production
```

## Email Templates

Email templates are located in `src/emails/`. They use React Email components with Tailwind styling.

To create a new email template:

1. Create a new file in `src/emails/YourEmail.tsx`
2. Use React Email components and Tailwind classes
3. Preview with `npm run email`
4. Send via the `sendEmail()` function in `src/lib/email.ts`

Example:

```tsx
import { sendEmail } from "@/lib/email"
import WelcomeEmail from "@/emails/WelcomeEmail"

await sendEmail({
  to: "user@example.com",
  subject: "Welcome!",
  react: WelcomeEmail({ name: "John" }),
})
```

## Analytics & Tracking

### Client-side tracking (Mixpanel):

```tsx
import { metrics } from "@/lib/mixpanel"

// Identify user
metrics.identify("user-id-123")

// Track event
metrics.track("Button Clicked", { button: "signup" })
```

### Server-side tracking:

See `/api/test/mixpanel-example-api/route.ts` for an example.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. Deploy

### Other Platforms

This is a standard Next.js app and can be deployed to any platform that supports Node.js.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [React Email Documentation](https://react.email)
- [Resend Documentation](https://resend.com/docs)
- [Mixpanel Documentation](https://docs.mixpanel.com)
- [Sentry Documentation](https://docs.sentry.io)

## License

MIT
