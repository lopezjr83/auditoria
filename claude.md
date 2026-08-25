# claude.md — Instrucciones para Claude Agents en vp-auditoria

> **Propósito:** Guía de convenciones, conocimiento de dominio, y referencias de VisionProces para agents Claude en este proyecto.
> **Última actualización:** 2026-08-25 (MVP v1.0 COMPLETADO)

---

## 1. Contexto del Proyecto

**Nombre:** AuditorIA (temporal, dominio por definir)
**Descripción:** Platform SaaS multi-tenant para **control, trazabilidad e inteligencia de auditorías** (SMETA, ISO 9001, ISO 14001, ISO 45001, normativas LATAM).

**Stack:**
- Frontend: Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui
- Backend: Auth.js v5 + Prisma 7 + PostgreSQL Neon
- Pagos: Recurrente (webhook es autoridad única)
- IA: Gemini 2.0 Flash (4 niveles de chatbot + análisis auditoría)
- Hosting: Vercel + Resend (email)

**Visión:** Reemplazar Excel + Sedex manual con flujo centralizado, automatizado, legal-safe (cliente almacena datos).

---

## 2. Conocimiento de Dominio: Auditorías

### 2.1 Estándares Soportados
```
SMETA 4 Pillars:
├── Labour (Prácticas laborales: child labor, forced labor, wages, working hours)
├── Health & Safety (Seguridad: hazards, PPE, machinery, incident investigation)
├── Environment (Ambiental: waste, emissions, water, resources)
└── Business Ethics (Ética: bribery, conflicts, confidentiality, compliance)

ISO 9001:2015 — Quality Management System (QMS)
ISO 14001:2015 — Environmental Management System (EMS)
ISO 45001:2018 — Occupational Health & Safety (OHSMS)
ISO 19011 — Guidelines for auditing management systems

Regulatorios LATAM:
└── Brasil: LGPD, NR (Normas Regulamentadoras)
    México: NOM (Normas Oficiales Mexicanas)
    Colombia: Resoluciones MinTrabajo
    Chile: Leyes de Seguridad, Códigos de Trabajo
    Argentina: Ley de Higiene y Seguridad
```

### 2.2 Ciclo de Auditoría (Modelo de Negocio)

```
FASE 1: Planeación
  └─ Crear auditoría
  └─ Asignar auditor + supervisor
  └─ Definir alcance + fecha

FASE 2: Ejecución
  └─ Captura de hallazgos (NC = non-conformity)
  └─ Foto/evidencia por hallazgo
  └─ Severidad: CRITICAL | MAJOR | MINOR | OBSERVATION

FASE 3: Informe
  └─ Validación por supervisor (audit trail obligatorio)
  └─ Generación de reporte (PDF/Excel)
  └─ Firma digital (auditor + supervisor)

FASE 4: CAP (Corrective Action Plan)
  └─ Por cada hallazgo: acción + responsable + fecha
  └─ Traqueo de CAP (abierto → cerrado)
  └─ Predicción IA: probabilidad de fallo

FASE 5: Validación CAP
  └─ Auditor verifica efectividad
  └─ Reauditoría sugerida si falla
  └─ Histórico: curva de mejora
```

### 2.3 Clasificación de Hallazgos

| Tipo | Definición | Ejemplo |
|---|---|---|
| **CRITICAL** | Riesgo inmediato de lesión/muerte o violación grave de ley | Maquinaria sin guardias + operador sin entrenamiento |
| **MAJOR** | Deficiencia significativa en cumplimiento, alto riesgo | Documentos de capacitación incompletos, sin proof de entrenamiento |
| **MINOR** | Deficiencia menor, fácil corrección | Rótulos de seguridad ilegibles, organización de EPP deficiente |
| **OBSERVATION** | Mejora sugerida, no es no-conformidad | "Considerar implementar sistema de check-in automático" |

---

## 3. Modelo de Datos: Lo Que Necesitas Saber

### 3.1 Usuarios (Multi-tenant por Workspace)

```typescript
OWNER (Empresa auditada)
  └─ Crear auditorías
  └─ Ver hallazgos
  └─ Crear CAPs
  └─ Acceso temporal a auditor

ADMIN (Empresa o supervisor)
  └─ Gestionar usuarios del workspace
  └─ Configurar workspace
  └─ Ver reportes históricos

AUDITOR (Certificado SMETA/ISO)
  └─ Ejecutar auditoría
  └─ Crear hallazgos + capturar evidencia
  └─ NO puede cerrar hallazgos

SUPERVISOR (Lead auditor)
  └─ Validar hallazgos (con audit trail obligatorio)
  └─ Cambiar severidad si necesario
  └─ Firmar reportes finales
  └─ Crear CAPs

GUEST-AUDITOR (Acceso QR temporal, 7 días default)
  └─ Permisos = AUDITOR
  └─ Auto-revocación después de período
  └─ NO es usuario permanente

VIEWER/GUEST (Temporal, durante auditoría)
  └─ Ver checklist (read-only)
  └─ Ver hallazgos conforme se capturan
  └─ NO puede editar
```

### 3.2 Evidencia Externa (Cliente Almacena)

```typescript
Evidence {
  externalUrl: "https://drive.google.com/..."  // Link a Google Drive
  externalType: "GOOGLE_DRIVE" | "ONEDRIVE" | "S3" | "OTROS"
  externalId: "file_id_xxx"  // Para sincronización Fase 2
  mimeType: "image/jpeg" | "application/pdf" | ...
  
  // VP NUNCA guarda el archivo local
  // Solo links + metadata
}
```

**Implicación:** VP tiene CERO liability por datos sensibles. Cliente retiene todo.

### 3.3 Audit Log (Trazabilidad Inmutable)

```typescript
AuditLog {
  action: "CREATE" | "UPDATE" | "DELETE" | "CHANGE_SEVERITY" | ...
  entityType: "Audit" | "Finding" | "CAP" | "User" | ...
  entityId: "NC-2024-001"
  
  changes: {
    before: { severity: "MINOR" },
    after: { severity: "MAJOR" },
    reason: "Aislado, no es sistemático"
  }
  
  userId: "auditor_maria_id"
  ipAddress: "192.168.1.100"
  timestamp: "2024-01-15T14:00:00Z"
  
  // Cada cambio está FIRMADO y NO es eliminable
  // Webhook a Vercel Blob para backup inmutable
}
```

**Regla:** Cambios críticos (severidad, cierre de NC) REQUIEREN supervisor + reason.

---

## 4. Pricing (Escalable, Sin Límites Cerrados)

```
USUARIOS (Bandas):
├─ 1 usuario: $5/mes
├─ 2-5 usuarios: $13/mes (total banda)
├─ 6-10 usuarios: $25/mes (total banda)
├─ 11-50 usuarios: $125/mes (total banda)
└─ 51+: Contactar ventas

AUDITORÍAS (Lineales):
├─ 1 auditoría: $0 (included in FREE)
├─ +1 auditoría adicional: +$20 cada una
└─ Sin límite (escalable)

EJEMPLO REAL:
├─ SPADD (2 usuarios + 1 auditoría) = $13 + $0 = $13/mes
├─ A&G Consultores (8 usuarios + 25 auditorías) = $25 + $480 = $505/mes
└─ Corporación (30 usuarios + 100 auditorías) = $125 + $1,980 = $2,105/mes

REGLA: Acceso temporal (QR + links) es GRATIS
```

**Fuente de Verdad:** Webhook de Recurrente, no redirect.

---

## 5. Chatbot AuditorIA (4 Niveles)

### 5.1 Arquitectura

```
FREE: Niveles 1-3 ($0 costo IA)
PAGO: Niveles 1-4 (desbloquea Gemini Flash)

NIVEL 1: FAQ Hardcodeado
  └─ 50+ preguntas frecuentes pre-respondidas
  └─ Ej: "¿Cuál es la diferencia entre Major y Minor?"
  └─ $0.00 costo

NIVEL 2: Fuzzy Match BD (Asesor FAQ)
  └─ Keywords especializadas en auditoría (SMETA, CAP, ISO, etc.)
  └─ Busca en BD + retorna respuesta pre-cargada
  └─ $0.00 costo

NIVEL 3: Knowledge Docs (Gemini para retrieval, ~$0.0001 costo)
  └─ Base de conocimiento: Legal + Operativo + Auditoría
  └─ Gemini busca docs relevantes + resume
  └─ Disponible en FREE + PAGO

NIVEL 4: Gemini Flash Full (~$0.0003/consulta)
  └─ Razonamiento profundo + contexto completo
  └─ Análisis de regulatorio local (GDPR/LGPD/NOM)
  └─ Sugerencias tácticas (CAP, riesgos)
  └─ PAGO ONLY ($13+/mes)
```

### 5.2 Knowledge Base Inicial (Pre-cargar)

```
LEGAL & REGULATORIO:
├─ SMETA 4 Pillars (completo, requisitos Sedex)
├─ ISO 9001:2015 (QMS)
├─ ISO 14001:2015 (EMS)
├─ ISO 45001:2018 (OHSMS)
└─ Regulatorios LATAM (Brasil, México, Colombia, Chile, Argentina)

OPERATIVO:
├─ Cómo ejecutar auditoría SMETA (step-by-step)
├─ Clasificación de hallazgos (Critical/Major/Minor/Observation)
├─ Cómo escribir hallazgos sin ambigüedad
├─ Mejores prácticas ISO 19011
└─ Mapeo: Hallazgo → Estándar → Ley

CAP & SEGUIMIENTO:
├─ Ciclo de CAP (crear → ejecutar → validar → cerrar)
├─ Root cause analysis (5 Whys, Fishbone)
├─ Elementos de CAP efectivo
└─ Validación de efectividad

EVIDENCE & DOCUMENTACIÓN:
├─ Qué es evidencia válida
├─ Cómo capturar fotografías de hallazgos
├─ Documentación obligatoria por estándar
└─ Retención de evidencias
```

---

## 6. Referencias a Playbook VisionProces

**Lectura obligatoria ANTES de implementar cualquier feature:**

| Sección | Tema | Localización |
|---|---|---|
| §1 | Stack tecnológico estándar | `playbook/02-stack-seguridad.md` |
| §2 | Tokens CSS 3-capas (OKLCH) | `playbook/01-marca-diseno.md` |
| §3 | Branding "by VisionProces" | `playbook/01-marca-diseno.md` |
| §5 | Pricing & modelo de negocio | `playbook/03-negocio.md` |
| §6 | Componentes de upgrade/paywall | `playbook/03-negocio.md` |
| §9 | Variables de entorno estándar | `playbook/02-stack-seguridad.md` |
| §11 | Audit logging inmutable | `playbook/02-stack-seguridad.md` |
| §17 | Animaciones (motion) | `playbook/01-marca-diseno.md` |
| §21 | Landing page design | `playbook/01-marca-diseno.md` |
| §22 | Manejo de secrets en env | `playbook/02-stack-seguridad.md` |
| §23 | Chatbot 4-niveles (Agendira) | `playbook/chatbots.md` (referencia) |
| §28 | Testing & CI/CD estándar | `playbook/02-stack-seguridad.md` |

**Cómo referenciar en PR descriptions:**
```
Per §21 Playbook (Landing Design), implemented multi-hero layout.
Per §5 Playbook (Pricing), Recurrente webhook is authoritative source.
```

---

## 7. Convenciones de Código

### 7.1 Estructura de Carpetas (Next.js App Router)

```
vp-auditoria/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── checkout/route.ts
│   │   ├── webhooks/recurrente/route.ts
│   │   ├── audits/route.ts
│   │   └── [...]
│   ├── dashboard/
│   │   ├── audits/
│   │   ├── reports/
│   │   ├── usuarios/
│   │   └── [...]
│   ├── auth/
│   ├── precios/page.tsx
│   └── [...]
├── components/
│   ├── audit/
│   ├── reports/
│   ├── auth/
│   └── [...]
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   ├── pricing.ts
│   ├── audit-log.ts
│   └── [...]
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── PLANIFICACION.md (roadmap + fases)
├── memory.md (este archivo)
├── claude.md (instrucciones para agents)
├── status.md (estado actual del proyecto)
└── [...]
```

### 7.2 Naming Conventions

| Tipo | Patrón | Ejemplo |
|---|---|---|
| Componentes React | PascalCase | `AuditCard.tsx`, `ReportBuilder.tsx` |
| Funciones utilities | camelCase | `calculateMonthlyPrice()`, `logAuditChange()` |
| Constantes | UPPER_SNAKE_CASE | `PLAN_LIMITS`, `AUDIT_STATUS` |
| Enum de Prisma | PascalCase | `AuditStatus`, `ExternalStorageType` |
| Rutas API | kebab-case | `/api/audits`, `/api/guest-tokens` |
| Variables de env | UPPER_SNAKE_CASE | `NEXT_PUBLIC_APP_URL`, `DATABASE_URL` |

### 7.3 Imports & Exports

```typescript
// ✅ DO: Usar path aliases
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { AuditStatus } from '@prisma/client'

// ❌ DON'T: Rutas relativas profundas
import { Button } from '../../../components/ui/button'
```

### 7.4 Tipos TypeScript

```typescript
// ✅ DO: Tipos específicos (auditoría domain)
interface Finding {
  id: string
  auditId: string
  description: string
  severity: 'CRITICAL' | 'MAJOR' | 'MINOR' | 'OBSERVATION'
  evidence: ExternalEvidence[]
  createdBy: string
  createdAt: Date
}

// ❌ DON'T: any, unknown sin razón
interface Finding {
  id: any
  severity: unknown
}
```

### 7.5 CSS & Tailwind

```typescript
// ✅ DO: Tokens semánticos (§2 Playbook)
<div className="bg-background text-foreground border border-primary/30">
  <p className="text-sm text-muted-foreground">Helado</p>
</div>

// ❌ DON'T: Hex sueltos
<div className="bg-#f5f5f5 text-#000000">
```

---

## 8. Patrones de Implementación

### 8.1 Guarding de Autenticación

```typescript
// app/api/audits/route.ts
import { requireAuth, requirePlan } from '@/lib/auth-guard'

export async function POST(req: Request) {
  const { session } = await requireAuth(req)  // → 401 si no autenticado
  const { session, subscription } = await requirePlan(req, 'PRO')  // → 403 si plan insuficiente
  
  // ... crear auditoría
}
```

### 8.2 Logging de Auditoría

```typescript
// lib/audit-log.ts
import { prisma } from '@/lib/prisma'

export async function logAuditChange(params: {
  workspaceId: string
  auditId?: string
  userId: string
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'CHANGE_SEVERITY' | ...
  entityType: 'Audit' | 'Finding' | 'CAP' | ...
  entityId: string
  changes?: { before: any, after: any }
  reason?: string  // Obligatorio para cambios críticos
  ipAddress?: string
}) {
  return await prisma.auditLog.create({
    data: {
      workspaceId: params.workspaceId,
      auditId: params.auditId,
      userId: params.userId,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      changes: params.changes || null,
      description: params.reason || null,
      ipAddress: params.ipAddress,
      createdAt: new Date()
    }
  })
}
```

**Regla:** Cada cambio en AUDIT, FINDING, o CAP DEBE llamar a `logAuditChange()`.

### 8.3 Pricing Dinámico

```typescript
// lib/pricing.ts
import { calculateMonthlyPrice } from '@/lib/pricing'

const price = calculateMonthlyPrice(
  userCount: 8,    // Usuarios permanentes en workspace
  auditCount: 25   // Auditorías del mes
)
// → $25 + $480 = $505
```

### 8.4 Webhook de Recurrente (Autoridad Única)

```typescript
// app/api/webhooks/recurrente/route.ts
export async function POST(req: Request) {
  const signature = req.headers.get('x-recurrente-signature')
  if (!verifyWebhookSignature(payload, signature)) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(payload)
  
  // event.event_type = 'subscription.created' | 'subscription.updated' | 'subscription.canceled'
  // event.data.subscription_id, customer_id, plan, status, current_period_end
  
  // ✅ ÚNICA FUENTE DE VERDAD: Actualiza BD aquí
  await prisma.subscription.update({
    where: { recurrenteCustomriptionId: event.data.subscription_id },
    data: {
      plan: event.data.plan.toUpperCase(),
      status: event.data.status.toUpperCase(),
      currentPeriodEnd: new Date(event.data.current_period_end)
    }
  })
}
```

**Regla crítica (§5 Playbook):** El redirect de checkout solo confirma "fue a pagar", no "pagó". El webhook es la verdad.

---

## 9. Testing

### 9.1 Pruebas Unitarias

```typescript
// lib/__tests__/pricing.test.ts
import { calculateMonthlyPrice } from '@/lib/pricing'

describe('pricing', () => {
  test('SPADD PyME: 2 users + 1 audit = $13', () => {
    expect(calculateMonthlyPrice(2, 1)).toBe(13)
  })

  test('A&G Consultores: 8 users + 25 audits = $505', () => {
    expect(calculateMonthlyPrice(8, 25)).toBe(505)
  })

  test('Corporación: 30 users + 100 audits = $2,105', () => {
    expect(calculateMonthlyPrice(30, 100)).toBe(2105)
  })
})
```

### 9.2 Pruebas End-to-End

```typescript
// e2e/audit-flow.spec.ts (Playwright)
import { test, expect } from '@playwright/test'

test.describe('Audit Flow', () => {
  test('Create audit -> Capture finding -> Generate report', async ({ page }) => {
    // 1. Login
    await page.goto('/auth/login')
    await page.fill('input[name="email"]', 'auditor@test.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // 2. Create audit
    await page.goto('/dashboard/audits')
    await page.click('button:has-text("Nueva Auditoría")')
    await page.fill('input[name="title"]', 'SMETA 2024-01')
    await page.selectOption('select[name="type"]', 'SMETA')
    await page.click('button:has-text("Crear")')
    
    // 3. Capture finding
    await page.click('button:has-text("Nuevo Hallazgo")')
    await page.fill('textarea[name="description"]', 'Maquinaria sin guardias')
    await page.selectOption('select[name="severity"]', 'CRITICAL')
    await page.click('button:has-text("Guardar")')
    
    // 4. Verify
    await expect(page.locator('text=CRITICAL')).toBeVisible()
  })
})
```

---

## 10. Debugging Common Issues

### 10.1 "Usuario ve plan 'FREE' pero debería ver 'PRO'"

**Causa probable:** Webhook de Recurrente no procesó.
```typescript
// Verificar:
1. ¿Recurrente envió webhook? (check logs)
2. ¿Signature fue válida? (verifyWebhookSignature)
3. ¿BD fue actualizada? (SELECT * FROM Subscription WHERE userId = ...)
4. ¿Session cookie fue actualizada? (next-auth refetch)
```

### 10.2 "Audit log muestra acción duplicada"

**Causa probable:** Doble invocación de API.
```typescript
// Verificar:
1. ¿Componente tiene React.StrictMode? (renderiza 2x en dev)
2. ¿Hay un 'onClick' + form submit doble?
3. ¿El webhook se llamó 2 veces?
```

### 10.3 "Hallazgo no aparece en reporte PDF"

**Causa probable:** Evidence externa no fue enlazada.
```typescript
// Verificar:
1. ¿Finding.evidences.length > 0?
2. ¿externalUrl es válido (Google Drive share link)?
3. ¿externalType matchea el provider?
```

---

## 11. Roadmap: Fases (Ver PLANIFICACION.md)

| Fase | Duración | Hitos |
|---|---|---|
| **Fase 0: Preparación** | ✅ COMPLETADA | Plan, Schema, Pricing, Landing design, Docs |
| **Fase 1: MVP (14 semanas)** | Semanas 1-14 | Landing, Auth, Dashboard, Audits, Reportes, Auto-org, ChatBot L1-3, Recurrente, Deploy SPADD |
| **Fase 2: Inteligencia (3-4 meses)** | Meses 3-4 | Calendar, IA análisis, Auto-org IA, ChatBot L4, KPI dashboard |
| **Fase 3: Escala (6-9 meses)** | Meses 6-9 | Google Drive sync, White-label, Mobile app, Webhooks/Zapier |

**Próximo: Fase 1, Semana 1 — Project setup + Auth**

---

## 12. Contactos (Pilotos)

| Cliente | Contacto | Tipo | Rol |
|---|---|---|---|
| **SPADD** | Propietario | PyME | Piloto MVP ($13/mes) |
| **A&G Consultores** | Socio (amiga) | Firma Auditora | Piloto firma ($505/mes) |
| **Corporación** | TBD | Enterprise | Future ($2,105+/mes) |

---

## 13. Palabras Clave para Búsquedas

Cuando necesites encontrar código:
- **Audit Trail:** busca `audit-log.ts`, `AuditLog` en schema
- **Pricing:** busca `pricing.ts`, `Subscription`, `Recurrente`
- **Auth Roles:** busca `WorkspaceRole`, `RBAC`, `auth-guard.ts`
- **Evidence:** busca `externalUrl`, `externalType`, `Evidence`
- **Chatbot:** busca `AsesorFAQ`, `KnowledgeDoc`, `gemini`
- **Reports:** busca `Report`, `report-builder.tsx`
- **Auto-org:** busca `storage-organizer`, `Google Drive API`, `OneDrive API`

---

## 14. Cómo Usar Este Archivo

**Para agents Claude:**
- ✅ Leer §2 (Dominio Auditorías) si trabajas con features de auditoría
- ✅ Leer §3 (Modelo de Datos) si trabajas con API/Schema
- ✅ Leer §5 (Chatbot) si trabajas con IA/asistente
- ✅ Leer §6 (Playbook) para referenciar estándares VP
- ✅ Leer §8 (Patrones) para saber cómo implementar

**Para debugging:**
- ✅ Leer §10 (Common Issues) si algo no funciona
- ✅ Leer §13 (Palabras Clave) para buscar código rápido

---

## 15. Cambios Recientes (Fase 0 → MVP v1.0 ✅ COMPLETADO)

### Fase 0: Preparación ✅ 
- ✅ Plan + Schema + Pricing model
- ✅ Landing design + Docs

### MVP v1.0 Deployment ✅ (2026-08-25)
- ✅ **Next.js 15 + TypeScript** — Strict mode, todas las optimizaciones
- ✅ **Auth.js v5** — Google OAuth + Email/Password, NextAuth callbacks
- ✅ **Prisma 7 + Neon PostgreSQL** — Schema sincronizado, BD conectada
- ✅ **Multi-tenant dashboard** — Workspaces, roles RBAC (OWNER/ADMIN/AUDITOR/SUPERVISOR)
- ✅ **Auditorías SMETA/ISO** — Pre-cargadas con checklists de 50+ items
- ✅ **Hallazgos + CAPs** — Trazabilidad inmutable (audit log), gestión de acciones correctivas
- ✅ **Acceso temporal** — QR auditor externo + tokens ephemeral (7 días default)
- ✅ **Reportes** — Stub implementado, preparado para generación con Gemini
- ✅ **Dark mode** — Toggle con next-themes, tokens OKLCH 3-capas
- ✅ **GDPR endpoints** — Export + Delete implementados
- ✅ **Vercel deployment** — Live en https://auditoria-delta.vercel.app
- ✅ **CI/CD** — Vercel auto-deploy en cada push a main
- ✅ **Pricing escalable** — Usuarios en bandas + auditorías lineales ($0-$2,105/mes)

### Próxima Fase: Fase 2 Intelligence (3-4 meses)
- 📅 Calendario + notificaciones automáticas
- 🤖 IA predictiva (Gemini L4)
- 📊 Dashboard KPIs + análisis tendencias
- 🔗 Integraciones (Google Drive sync, Zapier, Slack)

Cuando comiences Fase 2, actualiza este archivo con nuevos patrones/convenciones que surjan.
