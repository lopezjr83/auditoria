'use client'

export const dynamic = 'force-dynamic'

import { signIn } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  async function handleCredentialsLogin(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.ok) {
        router.push(callbackUrl)
      } else {
        setError(result?.error || 'Invalid credentials')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleLogin() {
    setIsLoading(true)
    try {
      await signIn('google', { redirectTo: callbackUrl })
    } catch (err) {
      setError('An error occurred with Google login')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-black text-foreground mb-2">AuditorIA</h1>
          <p className="text-muted-foreground">Accede a tu cuenta</p>
        </div>

        <div className="space-y-6">
          {/* Google OAuth */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full px-4 py-3 border border-border rounded-lg font-medium text-foreground hover:bg-muted/50 transition disabled:opacity-50"
          >
            Continuar con Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-xs text-muted-foreground">O</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Email + Password */}
          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
            >
              {isLoading ? 'Cargando...' : 'Acceder'}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{' '}
            <Link href="/auth/register" className="text-primary font-medium hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
