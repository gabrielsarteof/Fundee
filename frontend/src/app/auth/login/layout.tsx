// src/app/auth/layout.tsx
import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
