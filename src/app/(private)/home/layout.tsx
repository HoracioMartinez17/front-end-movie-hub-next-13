import { Footer } from '@/components/footer/Footer'
import { Header } from '@/components/header/Header'
import type { Metadata } from 'next'



export const metadata: Metadata = {
  title: 'Cine Max',
  description: 'cinemax home page',
  icons: {
    icon: 'assets/cinemax logo.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
