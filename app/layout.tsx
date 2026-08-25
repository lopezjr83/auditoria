import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

export const metadata: Metadata = {
  title: 'AuditorIA',
  description: 'Platform para control, trazabilidad e inteligencia de auditorías',
  openGraph: {
    title: 'AuditorIA',
    description: 'Platform para control, trazabilidad e inteligencia de auditorías',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
