import './globals.css'
import type { Metadata } from 'next'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import AuthProvider from '@/components/authProvider/AuthProvider';
import { UserProviderApi } from '@/context/userContext';


export const metadata: Metadata = {
  title: 'login page',
  description: 'cinemax login page',
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
      <UserProvider>
        <UserProviderApi>
        <AuthProvider>
      <body>
        {children}
      </body>
      </AuthProvider>
      </UserProviderApi>
      </UserProvider>
    </html>
  )
}
