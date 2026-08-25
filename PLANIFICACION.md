# PLANIFICACIÓN: vp-auditoria — SaaS de Auditoría Multi-Estándar

> **Fuente de verdad detallada:** [`C:\Users\DELL\.claude\plans\zippy-wiggling-pumpkin.md`](../../../Users/DELL/.claude/plans/zippy-wiggling-pumpkin.md)
> 
> **Última actualización:** 2026-08-24  
> **Status:** ✅ Finalizado — Listo para implementación

---

## Visión

**"Auditor's Command Center"** — Plataforma SaaS que centraliza trazabilidad, reportes e inteligencia para auditorías de CUALQUIER estándar (SMETA, ISO 9001, ISO 14001, ISO 45001, etc.).

**Slogan:** "Seguimiento. Centralización. Inteligencia."

---

## Modelo de Negocio

### Precios: Escalables, Tier 0 FREE + Sistema Escalonado

**Tier 0: FREE (base incluido)**
- 1 usuario + 1 auditoría = **$0/mes**

**Después del Tier 0: Sistema Escalonado**

**Usuarios Adicionales (bandas, después del 1º):**
- 2-5 usuarios → $13/mes total (no por usuario)
- 6-10 usuarios → $25/mes total
- 11-50 usuarios → $125/mes total
- 51+ → contactar ventas

**Auditorías Adicionales (lineales, +$20 cada una):**
- 2 auditorías → $20/mes
- 3 auditorías → $40/mes
- 5 auditorías → $80/mes
- 10 auditorías → $180/mes

**Acceso Temporal (GRATIS, siempre):**
- Auditor QR (7 días default) → incluido
- Consultor link (configurable) → incluido
- Cliente link (para CAPs) → incluido

### Ejemplos de Clientes Reales

| Segmento | Usuarios | Auditorías | Cálculo | Precio/mes |
|----------|----------|-----------|---------|-----------|
| **PyME (SPADD) — piloto** | 1 | 1 | $0 (FREE) | **$0** |
| **PyME (después crece)** | 2 | 1 | $13 + $0 | **$13** |
| **Firma auditora (A&G)** | 8 | 25 | $25 + $480 | **$505** |
| **Corporación** | 30 | 100 | $125 + $1,980 | **$2,105** |

---

## Arquitectura Técnica (MVP v1.0)

### Stack
- **Frontend:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui
- **Backend:** Auth.js v5 (OAuth + email) + Prisma 7 + PostgreSQL (Neon)
- **Pagos:** Recurrente (webhook como autoridad)
- **Email:** Resend
- **Chatbot IA:** Gemini 2.0 Flash (4 niveles: FAQ → Fuzzy → Knowledge Docs → Gemini, especializado en auditorías)
- **Hosting:** Vercel + Neon

### Base de Datos

**Tablas principales:**
- `User`, `Account`, `Session` — NextAuth estándar
- `Workspace`, `WorkspaceMember` — Multi-tenant
- `Subscription` — Tracking escalable (usuarios + auditorías + precio dinámico)
- `Audit`, `AuditType` (SMETA, ISO_9001, ISO_14001, etc.)
- `Evidence` — Almacenamiento EXTERNO (cliente retiene datos en Google Drive/OneDrive/S3)
- `GuestToken` — Acceso temporal ephemeral (QR + links)
- `AuditLog` — Trazabilidad inmutable (SHA-256)
- `Report` — Generación automática (PDF, Excel, HTML)
- `AsesorFAQ`, `KnowledgeDoc`, `ChatMessage` — Asistente IA (4 niveles)

### Características MVP

✅ **Auditorías pre-cargadas** (SMETA, ISO 9001, ISO 14001, ISO 45001 + custom)  
✅ **Registro de hallazgos** (Critical/Major/Minor/Observation)  
✅ **CAPs (Planes de Acción Correctiva)** con seguimiento automático  
✅ **Trazabilidad inmutable** (audit log de todos los cambios)  
✅ **Acceso temporal** sin crear usuarios permanentes (QR + links)  
✅ **Reportes SMETA-compliant** (PDF, Excel, HTML)  
✅ **ChatBot "AuditorIA"** (4 niveles, especializado en auditorías — Nivel 1-3 FREE, Nivel 4 PAGO)  
✅ **IA en Auditoría** (análisis patrones, sugerencias CAPs, predicción fallos — PAGO ONLY)  
✅ **Auto-Organización de Almacenamiento** (estructura + renombrado automático en Google Drive/OneDrive/S3)  
✅ **Gestión de usuarios** con 5 roles (OWNER, ADMIN, AUDITOR, SUPERVISOR, VIEWER)  
✅ **Dark mode** + WCAG AA  
✅ **GDPR** (export + delete endpoints)  
✅ **Branding "by VisionProces"**

---

## Flujos Principales

### 1. **Cliente (PyME) Ejecuta Auditoría**

```
1. SPADD propietario crea workspace en enero
2. Genera QR para auditor externo (válido 7 días)
3. Auditor escanea QR → acceso inmediato (sin login)
4. Auditor ejecuta SMETA checklist, captura hallazgos + fotos
5. Propietario ve hallazgos en tiempo real (dashboard)
6. Supervisor asigna CAPs (root cause + acción + responsable)
7. SPADD trackea CAPs: alertas si vencen sin progreso
8. En 6 meses: reauditoría automática sugerida
9. Reporte final PDF (para Sedex)
```

### 2. **Firma Auditora (A&G) Gestiona 25 Auditorías/Mes**

```
1. A&G socio crea workspace global
2. Invita 5 consultores (usuarios permanentes en banda)
3. Dashboard centralizado: 25 auditorías en flight
4. Para cada auditoría:
   - Genera QR para cliente (temporal, 7 días)
   - Cliente escanea → acceso para revisar/subir evidencias
   - Auditor A&G ejecuta checklist (SMETA/ISO)
   - Supervisor A&G valida hallazgos (con audit trail)
5. Reportes automáticos (PDF + SEDEX XML)
6. **OPORTUNIDAD CANAL:** A&G puede vender VP a clientes (20% comisión)
```

### 3. **Corporación Multinacional Audita 100+ Fábricas**

```
1. Compliance officer crea workspace corporativo
2. Invita managers de 30+ fábricas (usuarios permanentes)
3. Auditores internos ejecutan ISO 9001/14001/45001
4. Dashboard corporativo: KPIs por fábrica, by estándar
5. AI detecta patrones: "Cumplimiento bajó 15% en planta B"
6. Alertas automáticas: CAPs vencidos, hallazgos críticos
7. Reportes consolidados (anual + por trimestre)
8. GDPR: exportación de datos para compliance
```

---

## Roadmap

### ✅ MVP v1.0 (Lanzamiento)

**Core + Auth + Billing + IA + Auto-Organización**
- Auditorías pre-cargadas + hallazgos + CAPs
- NextAuth v5 + Recurrente (webhook authoritative)
- Precios escalables (bandas usuarios + auditorías lineales, 1+1=$0 FREE)
- Acceso temporal (QR + links ephemeral)
- ChatBot "AuditorIA" 4 niveles (FAQ → Fuzzy → Knowledge Docs → Gemini L1-3 FREE, L4 PAGO)
- **Auto-Organización de Almacenamiento (estructura + renombrado automático)**
- GDPR + Legalidad

**Estimado:** 10-12 semanas desde inicio

---

### 🚀 Fase 2.0 (3-4 meses post-lanzamiento)

**Calendario + Auto-Organización IA + Automación Avanzada**
- 📅 Vista mensual de auditorías programadas
- 📅 Notificaciones automáticas (7 días, 14 días)
- 📅 Integración Google Calendar (sync opcional)
- 🤖 **Auto-Organización IA:** Detecta tipo documento → auto-categoriza → renombra inteligente
- 🤖 AI predictiva: "Este CAP tiene 72% probabilidad de fallar"
- 📊 Dashboard con KPIs + análisis de tendencias
- 📊 Comparativa año vs año

---

### 🎯 Fase 3.0 (6-9 meses post-lanzamiento)

**Integraciones + White-Label + Mobile**
- 🔗 Google Drive: sincronización automática de evidencias
- 🔗 Zapier/Make: webhooks para automation custom
- 🏷️ White-label (marca del cliente + subdominio custom)
- 📱 iOS/Android nativa (captura on-site + modo offline)

---

## Go-to-Market por Segmento

### 1. **PyMEs (SPADD como piloto)**

**Target:** Empresas pequeñas que se certifican SMETA  
**Precio:** $13-33/mes (depende usuarios + auditorías)  
**Canal:** Direct sales + email marketing  
**Mensaje:** *"De Excel a dashboard en 10 minutos. Trackea auditorías sin estrés."*

**Métrica de éxito:** 5 PyMEs pagando dentro de 6 meses

---

### 2. **Firmas Auditoras (A&G como piloto + canal)**

**Target:** Firmas que hacen 15+ auditorías/año  
**Precio:** $300-1k/mes (depende volumen)  
**Canal:** Direct sales + **Revenue-share (A&G vende a clientes)**  
**Mensaje:** *"Gestiona 25 auditorías/mes sin Excel. Vende VP a tus clientes, gana 20%."*

**Métricas de éxito:**
- A&G usando VP internamente (MVP v1.0)
- A&G recomendando a 5+ clientes (Fase 2)
- $50k MRR en canal A&G (Fase 3)

---

### 3. **Corporaciones Multinacionales**

**Target:** Empresas con 10+ fábricas / programas auditoria complejos  
**Precio:** $2k-10k/mes (depende escala)  
**Canal:** Enterprise sales + integración personalizada  
**Mensaje:** *"Visibilidad en tiempo real de 100+ auditorías. Cumplimiento garantizado."*

**Métrica de éxito:** 1-2 corporaciones pagando dentro de 12 meses

---

## Diferenciadores Clave

1. **Cliente retiene datos** (Google Drive/OneDrive/S3) → VP no tiene riesgos GDPR/CCPA
2. **Precios escalables** (bandas + lineales) vs planes cerrados → mejor para todos
3. **Acceso temporal ephemeral** (QR + tokens) → NO crear usuarios para cada auditor
4. **ChatBot "AuditorIA"** especializado → 4 niveles, para TODOS (FREE: 1-3, PAGO: 1-4)
5. **Trazabilidad inmutable** → cumple ISO 19011 + auditoría legal
6. **Soporta CUALQUIER auditoría** → no solo SMETA

---

## ChatBot Especializado en Auditorías (Diferenciador Clave)

**"AuditorIA"** — No es chatbot genérico. Especialista en auditorías.

### Knowledge Base Completa:
- **Legal:** SMETA, ISO 9001/14001/45001, normativas LATAM
- **Operativo:** Cómo ejecutar auditorías, mejores prácticas ISO 19011
- **Auditoría:** Clasificación hallazgos, creación CAPs, validación
- **Regulatorio:** Mapeo Hallazgo → Estándar → Ley local

### Acceso por Plan:
| Nivel | FREE | PAGO | Costo | Ejemplo |
|-------|------|------|-------|---------|
| **L1: FAQ Local** | ✅ | ✅ | $0.00 | "¿Qué es un hallazgo Major?" |
| **L2: Fuzzy Match** | ✅ | ✅ | $0.00 | "Preguntas similares en BD" |
| **L3: Knowledge Docs** | ✅ | ✅ | $0.0001 | "Requisitos ISO + SMETA" |
| **L4: Gemini Flash** | ❌ | ✅ | $0.0003 | "Análisis contextual profundo" |

**Ventaja:** FREE puede usar chatbot sin pagar (L1-3), pero PAGO desbloquea análisis avanzado → incentiva upgrade

---

## Auto-Organización de Almacenamiento (Diferenciador Único)

**Feature única:** VP organiza automáticamente Google Drive/OneDrive/S3 del cliente.

### MVP v1.0 — Estructura Base + Renombrado

Cliente configura: "Mi Google Drive es acá" → VP OAuth → **organización automática**

```
VP-Auditorias/
├── 2026/
│   ├── SMETA_SPADD_2026-01/
│   │   ├── 01_Documentacion_Inicial/
│   │   │   ├── Evidencia_001_SMETA_Labour_ChildLabor.pdf
│   │   │   └── Foto_001_Sala3_Maquina_A.jpg
│   │   ├── 02_Hallazgos/
│   │   │   ├── NC-001_CRITICAL_ChildLabor_Prevention_2026-01-15.pdf
│   │   │   └── NC-002_MAJOR_PPE_Management_2026-01-16.pdf
│   │   ├── 03_CAPs/
│   │   │   ├── CAP-001_Training_Program_Owner_Maria_DueDate_2026-03-15.pdf
│   │   │   └── CAP-002_PPE_Procedure_Owner_Juan_DueDate_2026-02-28.pdf
│   │   └── 04_Reporte_Final/
│   │       └── SMETA_SPADD_2026-01_Final_Report_2026-01-20.pdf
│   └── ISO9001_Acme_2026-02/ [misma estructura]
└── Templates/
    ├── SMETA_4Pillars_Checklist.xlsx
    ├── ISO9001_Checklist.xlsx
    └── CAP_Template.docx
```

**Renombrado automático:**
- `IMG_2024.jpg` → `Foto_001_Sala3_Maquina_A_Hallazgo_NC-001.jpg`
- `Document.pdf` → `NC-001_CRITICAL_ChildLabor_Prevention_2026-01-15.pdf`
- `CAP_draft.pdf` → `CAP-001_Training_Program_Owner_Maria_DueDate_2026-03-15.pdf`

**Implementación MVP:**
- OAuth a Google Drive/OneDrive/S3
- Crear estructura de carpetas (trivial)
- Renombrado con reglas simples (regex)
- Costo: $0 IA (solo lógica)

### Fase 2 — IA Visual + Auto-Categoría

**Nivel 4 IA detecta tipo de documento:**
- Foto de máquina → `Foto_[numero]_Maquina_[ubicacion].jpg` → carpeta `02_Hallazgos/`
- Documento de requisito → `Requisito_[nombre]_[estándar].pdf` → carpeta `01_Documentacion_Inicial/`
- Reporte → `Reporte_Final_[tipo]_[fecha].pdf` → carpeta `04_Reporte_Final/`

**IA también sugiere:**
- Nombre del documento basado en contenido
- Categoría automática (Hallazgo/CAP/Evidencia/Reporte)
- Etiquetas (SMETA, ISO 9001, Seguridad, etc.)

**Ventajas:**
1. ✅ **Reduce lock-in:** Cliente NO teme que datos se pierdan en VP
2. ✅ **Portabilidad:** Si se va de VP, tiene TODO ordenado
3. ✅ **Legal safety:** Auditor ve estructura → confianza
4. ✅ **Diferenciador:** Sedex/Corrective Action NO lo hace
5. ✅ **Magic factor:** "VP no solo trackea, ordena tu nube automáticamente"

---

## Riesgos & Mitigación

| Riesgo | Impacto | Mitigación |
|--------|---------|-----------|
| **Competencia:** Sedex/Corrective Action agrega features | Alto | Enfoque en UX + velocidad; ser 3x más rápido |
| **Adopción:** PyMEs no quieren cambiar de Excel | Medio | Piloto SPADD + case study + ROI claro (40h ahorradas) |
| **Regulatorio:** GDPR/CCPA compliance | Alto | Cliente almacena datos → VP sin responsabilidad |
| **Escalabilidad:** 100+ auditorías/mes | Bajo | Arquitectura escalable desde MVP (Neon + Vercel) |

---

## Fases de Desarrollo Detalladas

### **Fase 0: Preparación (Semanas -1 a 0) — YA HECHO ✅**
- ✅ Plan técnico detallado + arquitectura
- ✅ Schema Prisma definido
- ✅ Pricing escalable validado
- ✅ Landing page diseño (3 héroes)
- ✅ Docs: PLANIFICACION.md, memory.md, claude.md, status.md

### **Fase 1: MVP Core (Semanas 1-12)**

| Semana | Sprint | Status | Tareas |
|--------|--------|--------|--------|
| **1-2** | Project Setup | ✅ | Repo init + Next.js 16 + Prisma schema + Auth.js v5 setup |
| **3** | Auth & DB | ✅ | Auth.js v5 (Google OAuth + Email) + Prisma client + Migrations ready + .env.example |
| **4-5** | Landing Page | 🔄 | Landing page presente pero requiere refinamiento de identidad |
| **6** | Dashboard Base | ✅ | Sidebar + header + workspace selector + audits CRUD (mock) |
| **7-8** | Auditorías Core | CRUD auditorías + hallazgos + CAPs (MVP) |
| **9** | Trazabilidad | Audit log inmutable + timeline visual |
| **10** | Acceso Temporal | GuestToken (QR + links ephemeral, 7 días) |
| **11** | Reportes | Generación PDF/Excel (SMETA-compliant) |
| **12** | Auto-Organización | Storage organizer (estructura + renombrado) |
| **12** | ChatBot L1-3 | FAQ local + Fuzzy match + Knowledge Docs (NO Gemini) |
| **12** | Recurrente | Checkout + webhook + subscription model |
| **13** | Testing + Deploy | E2E tests + GDPR pages + Vercel deploy (staging) |
| **14** | Go-Live | SPADD beta (FREE tier) |

### **Fase 2: Inteligencia (Meses 3-4)**
- 🤖 ChatBot Nivel 4 (Gemini Flash completo)
- 🤖 IA en Auditoría (análisis patrones, CAP sugerencias, predicción fallos)
- 🤖 Auto-Organización IA (detecta tipo documento, auto-categoriza)
- 📅 Calendario + notificaciones automáticas
- 📊 Dashboard KPIs + análisis tendencias

### **Fase 3: Escala (Meses 6-9)**
- 🔗 Google Drive auto-sync
- 🏷️ White-label (subdominio custom, branding cliente)
- 📱 iOS/Android nativa
- 🔌 Zapier/Make webhooks

---

## Hitos Críticos (MVP v1.0)

| Semana | Milestone |
|--------|-----------|
| **1** | Repo ready + schema DB |
| **3** | Auth works (Google OAuth + email) |
| **5** | Landing live + pricing calculator |
| **8** | Dashboard + auditorías funcionales |
| **10** | Acceso temporal (QR) working |
| **12** | Reportes automáticos + auto-organización + chatbot L1-3 |
| **13** | Recurrente integration + webhook |
| **14** | SPADD beta en vivo ($0 FREE tier)

---

## Personas Clave

- **Propietario SPADD** — Nuestro piloto inicial
- **Socio A&G Consultores** — Potencial canal de 10+ clientes/año
- **Compliance Officer (Corporación)** — Enterprise buyer

---

## Preguntas Clave (A Responder Post-MVP)

1. ¿Cuánto tiempo ahorran clientes reales (SPADD, A&G)?
2. ¿A&G puede realmente vender VP a 10+ clientes en 12 meses?
3. ¿Cuál es el churn rate en PyMEs vs firmas?
4. ¿Cuántos clientes corporativos reales existen en LATAM?

---

## Contacto & Referencias

**Playbook VisionProces (lectura obligatoria):**
- `C:\www\vp-central\PLAYBOOK_VISIONPROCES_v2.md`
- `C:\www\vp-central\playbook\02-stack-seguridad.md` (Auth, Env vars, Privacy)
- `C:\www\vp-central\playbook\03-negocio.md` (Recurrente, Billing)
- `C:\www\vp-central\playbook\05-contenido-ia.md` (Asistente IA §23)

**Proyectos de referencia:**
- `C:\www\vp-actasagendas` — SaaS completo (Recurrente + multi-tenant + Gemini)
- `C:\www\spadd-recursoshumanos` — Asistente IA con Claude Haiku

**Pilot Customers:**
- SPADD S.A. (propietario) — Auditoría anual SMETA
- A&G Consultores (amiga propietario) — Firma auditora (25+ auditorías/año)

---

**Documento generado:** 2026-08-24  
**Próximo review:** Después MVP v1.0 (Semana 13)
