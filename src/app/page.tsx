"use client"

import { env } from "@/lib/env"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ThemeToggle } from "@/components/theme-toggle"
import { metrics } from "@/lib/mixpanel"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  age: z
    .number()
    .min(13, {
      message: "Must be at least 13 years old.",
    })
    .max(120, {
      message: "Must be less than 120 years old.",
    }),
  website: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
})

export default function Home() {
  const [count, setCount] = useState(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      age: undefined,
      website: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Form submitted successfully!", {
      description: `Hello ${values.name}! We'll contact you at ${values.email}`,
    })
    form.reset()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant="outline">{env.APP_ENV}</Badge>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Web Starter Examples</h1>
          <p className="text-lg text-muted-foreground mb-2">
            A modern Next.js starter with shadcn/ui components, dark mode, toast
            notifications, and form validation.
          </p>
          <p className="text-muted-foreground">
            Try out the interactive examples below to see everything in action.
          </p>
        </div>
        <Separator className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Button Examples */}
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>
                  Different button styles and variants available in shadcn/ui
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => toast.success("Primary button clicked!")}
                  >
                    Primary
                  </Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </CardContent>
            </Card>

            {/* Counter Example */}
            <Card>
              <CardHeader>
                <CardTitle>Interactive Counter</CardTitle>
                <CardDescription>
                  State management example with increment, decrement, and reset
                  functionality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCount(Math.max(0, count - 1))}
                    disabled={count <= 0}
                  >
                    -
                  </Button>
                  <div className="text-center">
                    <div className="text-3xl font-mono font-bold">{count}</div>
                    <div className="text-sm text-muted-foreground">Count</div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCount(count + 1)}
                  >
                    +
                  </Button>
                </div>
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCount(0)
                      toast.info("Counter reset to 0")
                    }}
                    disabled={count === 0}
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Toast Examples */}
            <Card>
              <CardHeader>
                <CardTitle>Toast Notifications</CardTitle>
                <CardDescription>
                  Beautiful toast messages with different types and styles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast.success("Success! Operation completed.")
                    }
                  >
                    Success Toast
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.error("Error! Something went wrong.")}
                  >
                    Error Toast
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.info("Info: Here's some information.")}
                  >
                    Info Toast
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.warning("Warning: Please check this.")}
                  >
                    Warning Toast
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Form Validation Example */}
            <Card>
              <CardHeader>
                <CardTitle>Form Validation</CardTitle>
                <CardDescription>
                  Real-time validation with React Hook Form and Zod schema
                  validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormDescription>
                            Must be at least 2 characters.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Must be a valid email address.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter your age"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Must be between 13 and 120.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              type="url"
                              placeholder="https://example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Must be a valid URL if provided.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      Submit Form
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Environment Info */}
            <Card>
              <CardHeader>
                <CardTitle>Environment Configuration</CardTitle>
                <CardDescription>
                  Current environment variables and application settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Environment</span>
                    <Badge
                      variant={
                        env.APP_ENV === "production"
                          ? "destructive"
                          : env.APP_ENV === "staging"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {env.APP_ENV}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Info */}
            <Card>
              <CardHeader>
                <CardTitle>Tracking</CardTitle>
                <CardDescription>
                  Track errors, performance, logs, and user interactions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <Button
                    onClick={async () => {
                      toast.error("Test client error thrown")
                      throw new Error("Sample client error")
                    }}
                  >
                    <span>Throw Sample Client Error</span>
                  </Button>
                  <Button
                    onClick={async () => {
                      await fetch("/api/test/sentry-example-api")
                      toast.error("Test server error thrown")
                    }}
                  >
                    <span>Throw Sample Server Error</span>
                  </Button>
                  <Button
                    onClick={async () => {
                      metrics.identify("test-user-id-123")
                      metrics.track("Sample client metric")
                      toast("Tracked sample client metric")
                    }}
                  >
                    <span>Track Sample Metric</span>
                  </Button>
                  <Button
                    onClick={async () => {
                      await fetch("/api/test/mixpanel-example-api")
                      toast("Tracked sample server metric")
                    }}
                  >
                    <span>Track Sample Metric</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
