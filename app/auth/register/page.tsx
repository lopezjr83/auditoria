'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validación
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      setIsLoading(false)
      return
    }

    try {
      // Registrar usuario
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Error al registrarse')
        return
      }

      // Auto-login después del registro
      const loginResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (loginResult?.ok) {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Error al registrarse. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleRegister() {
    setIsLoading(true)
    try {
      await signIn('google', { redirectTo: '/dashboard' })
    } catch (err) {
      setError('Error con Google. Intenta de nuevo.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-black text-foreground mb-2">AuditorIA</h1>
          <p className="text-muted-foreground">Crea tu cuenta</p>
        </div>

        <div className="space-y-6">
          {/* Google OAuth */}
          <button
            onClick={handleGoogleRegister}
            disabled={isLoading}
            className="w-full px-4 py-3 border border-border rounded-lg font-medium text-foreground hover:bg-muted/50 transition disabled:opacity-50"
          >
            Registrarse con Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-xs text-muted-foreground">O</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Email + Password */}
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                required
              />
            </div>

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
                placeholder="Min. 8 caracteres"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirmar contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite la contraseña"
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
              {isLoading ? 'Registrando...' : 'Crear cuenta'}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{' '}
            <Link href="/auth/login" className="text-primary font-medium hover:underline">
              Accede aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
