import { z } from "zod"

/**
 * Environment configuration with Zod validation
 * Define schema once, validate against actual environment files
 */

// Single schema definition for all environment variables
const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().default("Web Starter"),
  NEXT_PUBLIC_APP_VERSION: z.string().default("0.1.0"),
  NEXT_PUBLIC_APP_ENV: z
    .enum(["development", "staging", "production"])
    .default("development"),
  NEXT_PUBLIC_API_URL: z.string().default("http://localhost:3000/api"),
})

// Parse and validate all environment variables at once
const parsedEnv = envSchema.parse(process.env)

// Export clean, validated environment object
export const env = {
  APP_NAME: parsedEnv.NEXT_PUBLIC_APP_NAME,
  APP_VERSION: parsedEnv.NEXT_PUBLIC_APP_VERSION,
  APP_ENV: parsedEnv.NEXT_PUBLIC_APP_ENV,
  API_URL: parsedEnv.NEXT_PUBLIC_API_URL,
} as const

// Type exports
export type Environment = typeof parsedEnv.NEXT_PUBLIC_APP_ENV

// Utility functions
export const isEnvironment = (environment: Environment): boolean =>
  env.APP_ENV === environment
export const isDevelopment = (): boolean => isEnvironment("development")
export const isStaging = (): boolean => isEnvironment("staging")
export const isProduction = (): boolean => isEnvironment("production")
