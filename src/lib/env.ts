import { z } from "zod"

/**
 * Environment configuration with Zod validation
 * Define schema once, validate against actual environment files
 */

// Single schema definition for all environment variables
const envSchema = z.object({
  NEXT_PUBLIC_APP_ENV: z.enum(["development", "staging", "production"]),
})

// Parse and validate all environment variables at once
const parsedEnv = envSchema.parse(process.env)

// Export clean, validated environment object
export const env = {
  APP_ENV: parsedEnv.NEXT_PUBLIC_APP_ENV,
} as const

// Type exports
export type Environment = typeof parsedEnv.NEXT_PUBLIC_APP_ENV

// Utility functions
export const isEnvironment = (environment: Environment): boolean =>
  env.APP_ENV === environment
export const isDevelopment = (): boolean => isEnvironment("development")
export const isStaging = (): boolean => isEnvironment("staging")
export const isProduction = (): boolean => isEnvironment("production")
