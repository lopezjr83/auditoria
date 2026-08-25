# FEATURES.md — Registro de funciones y accesos

> **Autoridad:** `lib/features.ts` + `lib/seed-features.ts`
> **No editar permisos aquí** — editar `lib/seed-features.ts`
> **El sync corre automático en cada deploy** via `scripts/sync-features.ts`
> **ADMIN y OWNER tienen acceso total** (verificado en código, no en BD)

---

## Leyenda

| Símbolo | Significado |
|---------|------------|
| **V** | Ver (VIEW) |
| **C** | Crear (CREATE) |
| **E** | Editar (UPDATE) |
| **D** | Eliminar (DELETE) |
| **VCE** | Ver + Crear + Editar (sin Eliminar) |
| **VCED** | Ver + Crear + Editar + Eliminar |
| **➖** | Sin acceso |

---

## Core

| Código | Función | Ruta(s) | OWNER | ADMIN | SUPERVISOR | AUDITOR | VIEWER |
|--------|---------|---------|-------|-------|-----------|---------|--------|
| `dashboard` | Dashboard principal | `/dashboard` | V | V | V | V | V |
| `workspace` | Configurar workspace | `/dashboard/workspace` | V | V | ➖ | ➖ | ➖ |

---

## Auditorías

| Código | Función | Ruta(s) | OWNER | ADMIN | SUPERVISOR | AUDITOR | VIEWER |
|--------|---------|---------|-------|-------|-----------|---------|--------|
| `audits_view` | Ver auditorías | `/dashboard/audits` | V | V | V | V | V |
| `audits_create` | Crear auditoría nueva | `/dashboard/audits/crear` | VCE | VCE | E | ➖ | ➖ |
| `audits_edit` | Editar auditoría | `/dashboard/audits/[id]/edit` | VCE | VCE | E | ➖ | ➖ |
| `audits_delete` | Eliminar auditoría | `/dashboard/audits/[id]` | VCED | ➖ | ➖ | ➖ | ➖ |

---

## Hallazgos (Findings)

| Código | Función | Ruta(s) | OWNER | ADMIN | SUPERVISOR | AUDITOR | VIEWER |
|--------|---------|---------|-------|-------|-----------|---------|--------|
| `findings_view` | Ver hallazgos | `/dashboard/audits/[id]/findings` | V | V | V | V | V |
| `findings_create` | Crear hallazgo | `/dashboard/audits/[id]/findings/nuevo` | ➖ | ➖ | ➖ | VCE | ➖ |
| `findings_edit` | Editar hallazgo | `/dashboard/audits/[id]/findings/[id]/edit` | ➖ | ➖ | E | E | ➖ |
| `findings_delete` | Eliminar hallazgo | `/dashboard/audits/[id]/findings/[id]` | VCED | ➖ | ➖ | ➖ | ➖ |

---

## CAPs (Corrective Action Plans)

| Código | Función | Ruta(s) | OWNER | ADMIN | SUPERVISOR | AUDITOR | VIEWER |
|--------|---------|---------|-------|-------|-----------|---------|--------|
| `caps_view` | Ver CAPs | `/dashboard/audits/[id]/caps` | V | V | V | V | V |
| `caps_create` | Crear CAP | `/dashboard/audits/[id]/caps/nuevo` | VCE | ➖ | VCE | ➖ | ➖ |
| `caps_edit` | Editar CAP | `/dashboard/audits/[id]/caps/[id]/edit` | E | ➖ | E | ➖ | ➖ |
| `caps_delete` | Eliminar CAP | `/dashboard/audits/[id]/caps/[id]` | VCED | ➖ | ➖ | ➖ | ➖ |

---

## Reportes

| Código | Función | Ruta(s) | OWNER | ADMIN | SUPERVISOR | AUDITOR | VIEWER |
|--------|---------|---------|-------|-------|-----------|---------|--------|
| `reports_view` | Ver reportes generados | `/dashboard/reports` | V | V | V | ➖ | V |
| `reports_create` | Generar reporte nuevo | `/dashboard/reports/crear` | VCE | VCE | VCE | ➖ | ➖ |
| `reports_delete` | Eliminar reporte | `/dashboard/reports/[id]` | VCED | VCED | ➖ | ➖ | ➖ |

---

## Usuarios y Permisos

| Código | Función | Ruta(s) | OWNER | ADMIN | SUPERVISOR | AUDITOR | VIEWER |
|--------|---------|---------|-------|-------|-----------|---------|--------|
| `users_view` | Ver usuarios workspace | `/dashboard/usuarios` | V | V | ➖ | ➖ | ➖ |
| `users_invite` | Invitar usuario nuevo | `/dashboard/usuarios/invitar` | VCE | VCE | ➖ | ➖ | ➖ |
| `users_edit` | Cambiar rol/permisos | `/dashboard/usuarios/[id]/edit` | VCE | E | ➖ | ➖ | ➖ |
| `users_delete` | Remover usuario | `/dashboard/usuarios/[id]` | VCED | ➖ | ➖ | ➖ | ➖ |

---

## Administración

| Código | Función | Ruta(s) | OWNER | ADMIN | SUPERVISOR | AUDITOR | VIEWER |
|--------|---------|---------|-------|-------|-----------|---------|--------|
| `admin_features` | Gestionar features | `/admin/features` | VCED | VCED | ➖ | ➖ | ➖ |
| `admin_audit_log` | Ver audit log | `/admin/audit-log` | V | V | ➖ | ➖ | ➖ |

---

## Chatbot AuditorIA (4 Niveles)

| Código | Función | Ruta(s) | OWNER | ADMIN | SUPERVISOR | AUDITOR | VIEWER |
|--------|---------|---------|-------|-------|-----------|---------|--------|
| `chatbot_l1` | FAQ local ($0) | Sidebar | V | V | V | V | V |
| `chatbot_l2` | Fuzzy match BD ($0) | Sidebar | V | V | V | V | V |
| `chatbot_l3` | Knowledge Docs ($0.0001) | Sidebar | V | V | V | V | V |
| `chatbot_l4` | Gemini Flash ($0.0003) | Sidebar | V | V | V | ➖ | ➖ |

---

## Rutas fuera del sistema de permisos

| Ruta | Control |
|------|---------|
| `/` | Landing page pública |
| `/auth/login` | Auth.js v5 — pública |
| `/auth/register` | Auth.js v5 — pública |
| `/privacidad` | Pública |
| `/terminos` | Pública |
| `/precios` | Pública |

---

## Notas de implementación

- **Chatbot L4 (Gemini Flash)** está gateado por plan: `requirePlan('PRO' \| 'BUSINESS')`
- **Audit log** es inmutable: una acción = una entrada, nunca borrada ni editada
- **Cambios críticos** (eliminar usuario, cambiar rol, cambiar severidad de hallazgo) requieren `reason` en audit log
- **GuestToken** para acceso temporal de auditores externos — ver `app/api/guest-tokens/route.ts`
