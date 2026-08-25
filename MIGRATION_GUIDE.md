# 📋 Guía de Migración a Neon PostgreSQL + Vercel

Este documento describe cómo hacer la migración de desarrollo local a producción con Neon + Vercel.

## Fase 1: Preparación (Local)

✅ **YA COMPLETADO en esta session:**
- Auth.js v5 configurado (Google OAuth + Email/Password)
- Prisma schema definido con todas las tablas
- APIs listos (mock data por ahora)
- Dashboard layout implementado
- Estructura lista para BD real

## Fase 2: Configurar Neon PostgreSQL

### 1. Crear cuenta en Neon
1. Ve a https://neon.tech
2. Regístrate (usa GitHub para acceso rápido)
3. Crea un proyecto nuevo

### 2. Obtener URL de conexión
En el dashboard de Neon:
- Copia la `Connection string` (debe incluir `postgresql://`)
- Nota: Hay dos URLs:
  - **Connection pooling URL** — para conexiones en Vercel
  - **Direct URL** — para Prisma migrations

### 3. Actualizar .env.local
```bash
# En C:\www\vp-auditoria\.env.local

# Reemplaza:
DATABASE_URL="<NEON_POOLING_URL>"  # Para Vercel (pooling)
DIRECT_URL="<NEON_DIRECT_URL>"     # Para Prisma (direct connection)
```

### 4. Crear la BD en Neon
```bash
cd C:\www\vp-auditoria

# Instalar Prisma CLI si no lo tienes
npm install -D prisma

# Correr migrations
npm run db:migrate

# Verificar con Prisma Studio
npm run db:studio
```

## Fase 3: Configurar Google OAuth

### 1. Google Cloud Console
1. Ve a https://console.cloud.google.com
2. Crea un proyecto nuevo: "AuditorIA"
3. Activa Google+ API

### 2. Crear OAuth Client ID
1. Ve a **Credentials** → **Create Credentials** → **OAuth Client ID**
2. Elige **Web application**
3. Authorized redirect URIs:
   - Local: `http://localhost:3000/api/auth/callback/google`
   - Vercel: `https://tu-dominio.vercel.app/api/auth/callback/google`

### 3. Actualizar .env.local
```bash
AUTH_GOOGLE_ID="<client_id>"
AUTH_GOOGLE_SECRET="<client_secret>"
```

## Fase 4: Desplegar en Vercel

### 1. Push a GitHub
```bash
git init
git add .
git commit -m "Initial commit: Auth + Dashboard + Mock APIs"
git remote add origin https://github.com/your-username/vp-auditoria.git
git branch -M main
git push -u origin main
```

### 2. Conectar a Vercel
1. Ve a https://vercel.com
2. Importa el repo de GitHub
3. En **Environment Variables**, agrega:
   - `DATABASE_URL=<NEON_POOLING_URL>`
   - `DIRECT_URL=<NEON_DIRECT_URL>`
   - `AUTH_SECRET=<generate with `openssl rand -hex 32`>`
   - `AUTH_URL=https://tu-dominio.vercel.app`
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`
   - Resto de variables (Resend, Recurrente, Gemini, etc.)

### 3. Deploy
Vercel deployará automáticamente. El build correrá:
```bash
npm run build
```

## Fase 5: Verificación Post-Deploy

✅ Verificar:
- [ ] Landing page carga en producción
- [ ] Login/Register funcionan
- [ ] Google OAuth redirige correctamente
- [ ] Dashboard carga después del login
- [ ] Crear auditoría funciona
- [ ] Variables de entorno están seguros (no expuestos)

## Fase 6: Próximas Semanas

| Semana | Tarea |
|--------|-------|
| 3 ✅ | Auth + DB lista (TÚ ESTÁS AQUÍ) |
| 4-5 | Landing page refinement |
| 6 ✅ | Dashboard base (COMPLETADO) |
| 7-8 | Auditorías CRUD real (sin mock) |
| 9 | Trazabilidad (Audit Log) |
| 10 | Acceso QR |
| 11 | Reportes |
| 12 | Auto-Organización + ChatBot L1-3 |
| 12 | Recurrente webhook |
| 13 | Deploy a producción |

## Troubleshooting

### Error: "DIRECT_URL not set"
```
Prisma necesita DIRECT_URL para migraciones.
En .env.local: DIRECT_URL="<your_direct_url>"
```

### Error: "DATABASE_URL not found"
```
En Vercel dashboard → Settings → Environment Variables
Asegúrate que está correctamente configurada.
```

### Google OAuth redirige a localhost
```
En Google Cloud Console → Credentials
Agrega ambas URIs:
- http://localhost:3000/api/auth/callback/google (dev)
- https://tu-dominio.vercel.app/api/auth/callback/google (prod)
```

## Recursos

- Neon docs: https://neon.tech/docs
- Prisma docs: https://www.prisma.io/docs
- NextAuth v5 docs: https://authjs.dev
- Vercel deployment: https://vercel.com/docs

---

**Próximo paso:** Cuando listo para deployar, ejecuta `prisma db push` y sigue la Fase 4.
