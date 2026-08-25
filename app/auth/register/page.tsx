import { Suspense } from 'react'
import RegisterContent from './register-content'

export const dynamic = 'force-dynamic'

function RegisterLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-muted-foreground">Cargando...</div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterLoading />}>
      <RegisterContent />
    </Suspense>
  )
}
