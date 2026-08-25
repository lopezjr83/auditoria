# memory.md — Contexto del Proyecto VP-Auditoria

> **Propósito:** Memoria persistente para futuras sesiones. Qué aprendimos, decisiones clave, y por qué se tomaron.
> **Última actualización:** 2026-08-24

---

## Decisiones Clave (NO cambiar sin justificación)

### 1. **Pricing: Escalable, NO Planes Cerrados**
- **Decisión:** Bandas de usuarios + auditorías lineales
- **Por qué:** PyME paga $0 (1+1 FREE), crece a $13 (2-5 usuarios). Firma paga $505 (8 usuarios + 25 auditorías). Corporación $2,105. Simples, sin sorpresas.
- **Lock-in:** Bajo. Cliente se va, tiene datos ordenados en su Google Drive. MVP v1.0 desbloquea THIS.

### 2. **Cliente Almacena Datos (Google Drive/OneDrive/S3)**
- **Decisión:** Evidence almacenada en nube del cliente, VP solo links + metadata
- **Por qué:** VP sin riesgo legal GDPR/CCPA. Cliente retiene propiedad. Si se va de VP, tiene TODO.
- **Diferenciador:** Sedex/Corrective Action guardan datos → liability. Nosotros: NO.

### 3. **ChatBot AuditorIA (4 Niveles, Gateado por Plan)**
- **Decisión:** FREE = L1-3 (FAQ + Fuzzy + Knowledge Docs, $0 costo IA). PAGO = L1-4 (+ Gemini Flash)
- **Por qué:** Monetiza sin costar. PAGO desbloquea análisis avanzado.
- **Knowledge Base:** Legal + Operativo + Auditoría (SMETA, ISO, CAPs, regulatorio)

### 4. **Auto-Organización de Almacenamiento**
- **Decisión:** MVP v1.0 = estructura + renombrado simple ($0 IA). Fase 2 = IA visual + auto-categoría
- **Por qué:** Diferenciador BRUTAL. Sedex no lo hace. Reduce lock-in (cliente ve valor inmediatamente).

### 5. **Nombre: "AuditorIA"**
- **Decisión:** Nombre temporal hasta encontrar dominio .com ideal
- **Por qué:** Refleja chatbot especializado, es memorable, diferenciable
- **Dominio:** Verificar auditoria.io, auditoriaia.com, auditflow.com (cualquiera es winner)

### 6. **Landing Page: Opción B (3 Héroes Separados)**
- **Decisión:** Hero personalizado para PyME / Firma / Corp
- **Por qué:** Conversión 15-25% vs 8-12% (Opción A generic). Cada mercado ve exactamente su problema.
- **Design:** Playbook §21 (Navy + Teal, Plus Jakarta + Geist, anti-patrones evitados)

---

## Aprendizajes (Qué Funcionó, Qué No)

### ✅ Lo que Resonó
- **Pricing escalable:** User validó (mejor que planes cerrados)
- **Cliente almacena datos:** User propuso, brillante para legal safety
- **Auto-organización:** User tuvo idea, game-changer (diferenciador unique)
- **3 héroes landing:** User validó (mejor CTA que hero genérico)

### ⚠️ Cosas a Vigilar
- **Competencia Sedex/Corrective Action:** Pueden agregar features. Nuestra defensa = velocidad (3x rápido) + UX (acceso temporal QR) + legal safety (cliente almacena).
- **Adopción PyMEs:** Excel addiction es real. Solución = SPADD piloto (muestra ROI claro: 40h ahorradas/año).
- **Compliance LATAM:** GDPR/CCPA/LGPD importantes. Documentar T&Cs (cliente propietario de datos).

---

## Arquitectura High-Level (NO cambiar sin repensar)

**Stack:**
- Frontend: Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui
- Backend: Auth.js v5 + Prisma 7 + PostgreSQL Neon
- Pagos: Recurrente (webhook = autoridad)
- IA: Gemini Flash 2.0 (4 niveles)
- Almacenamiento: Google Drive/OneDrive/S3 (cliente, con OAuth)
- Auto-org: AWS S3 SDK + Google Drive API + OneDrive API

**Schema crítico:**
- Evidence: externalUrl (no fileUrl local), externalType (google_drive/onedrive/s3)
- GuestToken: ephemeral QR/links, 7-30 días, auto-revoke
- Audit: tipo (SMETA, ISO_9001, etc.), no solo SMETA
- Subscription: dynamic (activeUsers + activeAudits → calculatedPrice)

---

## Personas Clave (Pilotos)

1. **SPADD** (PyME)
   - Contacto: Propietario
   - Use case: 1 auditoría SMETA/año
   - Precio: $0 FREE (1+1), crece a $13
   - Meta: Validar MVP, ahorro 40h/año

2. **A&G Consultores** (Firma Auditora)
   - Contacto: Socio (amiga del propietario)
   - Use case: 25 auditorías/mes
   - Precio: $505/mes (8 usuarios + 25 auditorías)
   - Meta: Validar firma-como-canal, revenue-share 20%

3. **Corporación** (Future)
   - Use case: 100+ auditorías/mes, 30+ usuarios
   - Precio: $2,105/mes
   - Meta: Enterprise sales (Fase 2+)

---

## Roadmap (3 Fases)

**MVP v1.0 (14 semanas):** Core auditorías + hallazgos + CAPs + acceso temporal + chatbot L1-3 + auto-org + Recurrente
**Fase 2 (3-4 meses post):** Calendario + IA análisis + auto-org IA + KPIs
**Fase 3 (6-9 meses post):** Google Drive sync + white-label + mobile

---

## Preguntas Pendientes (Investigar Después)

- [ ] Dominios .com exactos disponibles (verificar auditoria.io, auditoriaia.com)
- [ ] Legal: Redactar T&Cs (cliente propietario, VP workflow manager)
- [ ] Compliance: GDPR/CCPA/LGPD específico por jurisdicción
- [ ] SEO: Keywords estratégicas (auditoría, SMETA, ISO, compliance)
- [ ] Marketing: Budget para SPADD + A&G pilotos
