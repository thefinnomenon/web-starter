import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

export default function TestEmail({ name = "User" }: { name?: string }) {
  return (
    <Html>
      <Head />
      <Preview>Test email from your app</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto bg-white p-8 mb-16">
            <Heading className="text-2xl font-bold text-gray-800 my-10">
              Hello {name}!
            </Heading>
            <Text className="text-base text-gray-800 leading-relaxed">
              This is a test email from your application. If you&apos;re seeing
              this, email sending is working correctly.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
