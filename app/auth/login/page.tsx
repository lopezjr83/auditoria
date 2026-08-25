import { Suspense } from 'react'
import LoginContent from './login-content'

export const dynamic = 'force-dynamic'

function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-muted-foreground">Cargando...</div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  )
}
