import { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

function ErrorContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center text-2xl font-black text-destructive mx-auto mb-4">
            ⚠️
          </div>
          <h1 className="text-3xl font-black text-foreground mb-2">Error de Autenticación</h1>
          <p className="text-muted-foreground mb-6">Hubo un problema al intentar iniciar sesión. Por favor, intenta de nuevo.</p>
        </div>

        <div className="space-y-3">
          <Link href="/auth/login">
            <Button className="w-full">Volver a intentar</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">Ir a inicio</Button>
          </Link>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Si el problema persiste, contacta a soporte
        </p>
      </div>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ErrorContent />
    </Suspense>
  )
}
