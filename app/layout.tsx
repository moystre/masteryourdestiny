import type { Metadata } from "next"
import "./globals.css"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"

export const metadata: Metadata = {
  title: "Master Your Destiny",
  description: "In just two days, learn how to make your next 6 months better than the last 10 years with rediscovered science-based ancient spiritual teachings.",
  openGraph: {
    title: "Master Your Destiny",
    description: "In just two days, learn how to make your next 6 months better than the last 10 years with rediscovered science-based ancient spiritual teachings.",
    images: [{ url: "/images/event-signup.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Your Destiny",
    description: "In just two days, learn how to make your next 6 months better than the last 10 years with rediscovered science-based ancient spiritual teachings.",
    images: ["/images/event-signup.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin:0, padding:0 }}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
