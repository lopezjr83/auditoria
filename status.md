# status.md — Estado Actual del Proyecto

> **Propósito:** Dashboard ejecutivo del proyecto. Qué está done, qué está en progreso, qué sigue.
> **Última actualización:** 2026-08-24
> **Enlace a roadmap detallado:** [PLANIFICACION.md](PLANIFICACION.md)

---

## 📊 Resumen Ejecutivo

| Aspecto | Estado | Fecha |
|---|---|---|
| **Fase 0: Preparación** | ✅ COMPLETADA | 2026-08-24 |
| **Fase 1: MVP (14 semanas)** | ⏳ POR INICIAR | Semana 1: 2026-08-31 |
| **Nombre: AuditorIA** | ✅ DECIDIDO | Temporal, dominio .com por buscar |
| **Architecture Doc** | ✅ COMPLETADA | zippy-wiggling-pumpkin.md |
| **Memory + Claude.md** | ✅ COMPLETADA | 2026-08-24 |

---

## ✅ Fase 0: Preparación (COMPLETADA)

### Decisiones Clave Tomadas

#### 1. **Modelo de Negocio: Pricing Escalable** ✅
- Decisión: Bandas de usuarios + auditorías lineales (sin límites cerrados)
- Validado con casos reales: SPADD ($13/mes), A&G ($505/mes), Corporación ($2,105/mes)
- Recurrente como procesador de pagos (webhook = autoridad única)

#### 2. **Arquitectura de Datos: Cliente Almacena** ✅
- Decisión: Evidence en Google Drive/OneDrive/S3 del cliente, VP solo links
- Beneficio: VP sin liability GDPR/CCPA, cliente retiene propiedad
- Diferenciador: Sedex guarda datos → VP no

#### 3. **Auditorías Multi-Estándar** ✅
- Decisión: Soportar SMETA + ISO 9001/14001/45001 + custom (no solo SMETA)
- Templates pre-cargados para 13 estándares + regulatorios LATAM

#### 4. **Landing Page: Opción B (3 Héroes)** ✅
- Decisión: Heroes separados para PyME / Firma / Corp (vs hero genérico)
- Expectativa de mejora: 15-25% CTA vs 8-12% (Opción A)
- Diseño: Navy + Teal, Plus Jakarta + Geist (Playbook §21)

#### 5. **Chatbot AuditorIA (4 Niveles)** ✅
- Decisión: FREE = L1-3 ($0 costo IA), PAGO = L1-4 (Gemini Flash)
- Especializado en auditoría domain (legal + operativo + regulatorio)
- Knowledge base pre-cargada con SMETA/ISO/regulatorios LATAM

#### 6. **Auto-Organización de Almacenamiento** ✅
- Decisión: MVP v1.0 = estructura + renombrado simple ($0 IA), Fase 2 = IA visual
- Diferenciador brutal, reduce lock-in, cliente ve valor inmediatamente

#### 7. **Acceso Temporal Auditor (QR)** ✅
- Decisión: 7 días default, auto-revocación, sin crear usuario permanente
- Seguridad: Token ephemeral, IP logging, acceso read-only durante auditoría

### Documentación Completada

- ✅ **PLANIFICACION.md** — Roadmap 14 semanas + visión + pricing table + landing design
- ✅ **zippy-wiggling-pumpkin.md** — Technical plan detallado (schema Prisma, APIs, UX flow)
- ✅ **memory.md** — Decisiones clave + lecciones aprendidas para futuras sesiones
- ✅ **claude.md** — Instrucciones para agents Claude + dominio knowledge

---

## ⏳ Fase 1: MVP Core (14 Semanas)

### Cronograma Semana-por-Semana

```
SEMANA 1 (2026-08-31):
├─ Project setup (Next.js 16, Prisma, Neon)
├─ .env.example + variables estándar (§9 Playbook)
├─ Configurar GitHub + Vercel
└─ Auth.js v5 basic setup (Google OAuth + email/contraseña)

SEMANA 2-3 (2026-09-07):
├─ Auth flow completo (login, register, email verification)
├─ NextAuth callbacks + session management
├─ Workspace creation (multi-tenant scaffold)
└─ Basic dashboard layout (sidebar, header, breadcrumbs)

SEMANA 4 (2026-09-21):
├─ Landing page (Opción B: 3 héroes PyME/Firma/Corp)
├─ Precios escalables (calculadora interactiva)
├─ /privacidad, /terminos, /smeta-compliance pages
└─ Branding "by VisionProces" (footer, logo, colors per §2 Playbook)

SEMANA 5-6 (2026-09-28):
├─ CRUD Auditorías (crear, editar, listar, ver detalle)
├─ Audit.tipo enum (13 estándares)
├─ Trazabilidad básica (audit log creación/actualización)
├─ Roles & permisos (OWNER, ADMIN, AUDITOR, SUPERVISOR, VIEWER)
└─ Acceso temporal: GuestToken table + QR generation

SEMANA 7-8 (2026-10-12):
├─ Captura de hallazgos (Finding creation + severity classification)
├─ Evidence externa (externalUrl, externalType, Google Drive auth)
├─ Upload flow (pick evidence from Google Drive)
├─ Foto/evidencia por hallazgo
└─ Audit log: CHANGE_SEVERITY, ADD_FINDING, etc.

SEMANA 9 (2026-10-26):
├─ CAP workflow (crear, asignar, trackear, validar)
├─ Linked: Hallazgo → CAP (1-N relation)
├─ CAP lifecycle: OPEN → IN_PROGRESS → COMPLETED → VALIDATED
└─ Notifications: Resend email cuando CAP vence

SEMANA 10-11 (2026-11-02):
├─ Reportes (PDF, Excel, HTML)
├─ Report builder: filtros + consolidación de datos
├─ Matriz de trazabilidad (Hallazgo → Estándar → Ley)
├─ Firma digital (supervisor + auditor)
└─ Export a SEDEX XML (para Sedex compliance)

SEMANA 12 (2026-11-16):
├─ Chatbot L1-3 (FAQ hardcoded + Fuzzy match + Knowledge Docs)
├─ Widget flotante + UI integración
├─ Knowledge base inicial (SMETA/ISO/regulatorios)
└─ Gemini retrieval (L3)

SEMANA 13 (2026-11-23):
├─ Recurrente integration (checkout flow)
├─ Webhook handler (subscription.created, subscription.updated, subscription.canceled)
├─ Pricing cálculo dinámico (usuarios + auditorías)
├─ UpgradeBanner component (CTA cuando user golpea límites)
└─ Payment success/cancel pages

SEMANA 14 (2026-11-30):
├─ Auto-organización MVP (estructura + renombrado simple)
├─ Google Drive folder creation (YYYY/[TIPO]_[CLIENTE]_MM/)
├─ Rename on upload (regex + metadata)
├─ Storage status dashboard
├─ SPADD go-live: piloto + feedback
└─ Testing, QA, deploy a Vercel
```

### Hitos Críticos (Bloqueadores de Fase)

| Semana | Hito | Bloqueador |
|---|---|---|
| 3 | Workspace multi-tenant | Fase 1 no puede continuar sin esto |
| 6 | Audit CRUD + trazabilidad | Report generation depende de esto |
| 8 | Evidence externa (Google Drive) | Auto-org depende de evidencia real |
| 13 | Recurrente webhook | No hay ingresos sin esto |
| 14 | Auto-org MVP | Diferenciador clave (SPADD demo) |

### Testing & QA Mínimo

```
E2E (Playwright):
├─ Register → Create workspace → Create audit → Capture finding → Generate report
├─ Upgrade flow (checkout → webhook → feature unlock)
├─ QR token generation + ephemeral access
└─ Admin: crear usuario, asignar rol, ver audit log

Unit Tests:
├─ pricing.ts (calcular precio por users + audits)
├─ audit-log.ts (registrar cambios inmutables)
├─ rbac.ts (verificar permisos por rol)
└─ ~70% code coverage

Security:
├─ SQL injection tests
├─ XSS payload testing (hallazgos + comentarios)
├─ CSRF protection (POST endpoints)
└─ API rate limiting (para prevenir abuse)

Compliance:
├─ GDPR: /api/account/export + /api/account/delete endpoints
├─ Audit log verificación (que NO sea editable)
├─ Dark mode testing (§2 Playbook CSS tokens)
└─ WCAG AA accessibility baseline
```

---

## 🚀 Fase 2: Inteligencia (3-4 Meses Post-MVP)

### Features Planeadas

- 📅 **Calendario:** Vista mensual + notificaciones automáticas (7 días antes, CAP vence)
- 🤖 **IA Análisis:** Patrones de hallazgos, root cause sugeridos, reauditoría recomendada
- 🤖 **Chatbot L4:** Gemini Flash completo (análisis regulatorio local, sugerencias tácticas)
- 📊 **Dashboard KPI:** Trendline de cumplimiento, gráficos interactivos
- 🔍 **Auto-org IA:** Detección visual de documentos, auto-categorización (Gemini Vision)

### Duración Estimada
- 12-16 semanas post-lanzamiento de Fase 1
- Equipo: 2 engineers + 1 product
- Budget IA: ~$0.02-0.05 por auditoría (negligible)

---

## 🎯 Fase 3: Escala (6-9 Meses Post-MVP)

### Features Planeadas

- 🔗 **Google Drive Sync:** Sincronización automática de evidencias (2-way)
- 🏷️ **White-Label:** Soporte para brand propia de firmas auditoras
- 📱 **Mobile App:** iOS/Android nativa (captura hallazgos on-site, modo offline)
- 🪝 **Webhooks/Zapier:** Automatización custom (notificaciones Slack, etc.)
- 🌍 **Localizaciónes:** Interfaz en Es/En/Pt/Fr

### Duración Estimada
- 20-24 semanas post-lanzamiento de Fase 2
- Equipo: 3-4 engineers + product + design

---

## 🎭 Pilotos (Early Users)

### SPADD PyME

| Aspecto | Detalles |
|---|---|
| **Tipo** | PyME (empresa pequeña) |
| **Usuarios** | 2 (propietario + gerente) |
| **Auditorías/año** | 1 SMETA anual |
| **Precio/mes** | $13 (FREE → puede crecer a $13) |
| **Rol** | Validar MVP + ROI (40h ahorro/año) |
| **Timeline** | Go-live Semana 14, feedback 2 semanas |

### A&G Consultores

| Aspecto | Detalles |
|---|---|
| **Tipo** | Firma Auditora (especialista) |
| **Usuarios** | 8 (3 socios + 5 consultores) |
| **Auditorías/mes** | 25 SMETA |
| **Precio/mes** | $505 (modelo firma) |
| **Rol** | Validar firma-como-canal, revenue-share 20% |
| **Timeline** | Semana 14 + integración 4 semanas |

### Corporación (Futuro)

| Aspecto | Detalles |
|---|---|
| **Tipo** | Multinacional (30-50 fábricas) |
| **Usuarios** | 30+ (auditors + managers + compliance) |
| **Auditorías/mes** | 100+ (5-8 por fábrica/año) |
| **Precio/mes** | $2,105+ (modelo enterprise) |
| **Rol** | Enterprise sales (Fase 2-3) |
| **Timeline** | Post-SPADD validation, pre-sales Fase 2 |

---

## 📋 Checklist: Antes de Iniciar Semana 1

- [ ] GitHub repo creado (privado, visionproces org)
- [ ] Vercel project linkado
- [ ] Neon PostgreSQL DB provision (free tier OK para MVP)
- [ ] `.env.example` completado (§9 Playbook)
- [ ] Recurrente account creado, API key obtenida
- [ ] Google OAuth app creado (google.com/cloud)
- [ ] Resend account creado, API key obtenida
- [ ] Gemini API key (google.com/ai-studio)
- [ ] Team members tienen acceso (GitHub + Vercel + Figma)
- [ ] Design system (tokens OKLCH) pre-approved (§2 Playbook)

---

## 🔴 Bloqueadores Actuales

**NINGUNO.** Fase 0 está completamente resuelta. Lista para iniciar desarrollo.

---

## 🟡 Riesgos a Vigilar

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| **Competencia Sedex/Corrective Action agrega features** | MEDIA | Velocidad (MVP en 14 sem) + UX unique (QR + auto-org) |
| **Adopción PyME (Excel addiction)** | MEDIA | SPADD piloto demuestra ROI claro + soporte onboarding |
| **Compliance LATAM complejo** | BAJA | Documentar T&Cs (cliente = propietario), audit legal |
| **IA costo mayor que esperado** | BAJA | 4-level architecture limita Gemini (L1-3 = $0) |
| **Recurrente downtime** | BAJA | Fallback: Stripe como backup (mismo webhook pattern) |

---

## 📈 Métricas de Éxito (MVP Launch)

| Métrica | Target | Semana 14 |
|---|---|---|
| **SPADD Users Onboarded** | 1-2 usuarios activos | ✅ Go-live |
| **A&G Consultores (Interest)** | Demostración exitosa | ✅ Scheduled |
| **Landing Page CTA** | 15-25% conversion | Medición post-launch |
| **Audit Log Completeness** | 100% de cambios loggados | ✅ No data loss |
| **Uptime** | 99.5% (Vercel SLA) | ✅ Target |
| **GDPR Compliance** | Export + Delete endpoints functional | ✅ Passed |

---

## 🔗 Enlaces Importantes

| Documento | Ubicación | Propósito |
|---|---|---|
| **PLANIFICACION.md** | `./PLANIFICACION.md` | Roadmap detallado + visión |
| **Technical Plan** | `~/.claude/plans/zippy-wiggling-pumpkin.md` | Schema Prisma + APIs |
| **Memory (Decisions)** | `./memory.md` | Lecciones + decisiones clave |
| **Claude Instructions** | `./claude.md` | Guía para agents |
| **Playbook VisionProces** | `../../vp-central/PLAYBOOK_VISIONPROCES_v2.md` | Stack + branding + pricing |

---

## 📞 Contacto & Escalación

| Rol | Contacto | Disponibilidad |
|---|---|---|
| **Propietario/Product** | lopezjr@spadd.net | Consulta en decisiones architecture |
| **Tech Lead** | Claude Agent | Disponible 24/7 vía Claude Code |
| **Legal (Compliance)** | TBD | Redacción de T&Cs + GDPR |
| **Diseño (UI/UX)** | TBD | Landing page + component refinement |

---

## 📝 Notas Finales

**Estado:** Fase 0 completada, lista para desarrollo.

**Próximos Pasos Inmediatos:**
1. Iniciar Semana 1 (2026-08-31): Project setup + Auth
2. Crear GitHub repo + Vercel project
3. Coordinar con SPADD para onboarding preparativo
4. Semana 14: Go-live MVP + feedback loop

**Éxito = Validación SPADD + viabilidad A&G → Fase 2 IA**

---

**Última actualización:** 2026-08-24
**Próxima revisión:** 2026-09-07 (end of Semana 1, status check)
