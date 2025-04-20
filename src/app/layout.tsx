import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'

// Load Inter font (for body text)
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Load Playfair Display font (for headings)
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Manav Patel Portfolio',
  description: 'A personal portfolio website showcasing my projects and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfairDisplay.variable} scroll-smooth dark`}>
      <body className={`${inter.className} bg-dark text-light transition-colors duration-300`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 