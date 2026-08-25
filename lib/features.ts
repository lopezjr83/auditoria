/**
 * lib/features.ts — Fuente única de verdad para feature codes
 * Per §28 Playbook: RBAC type-safe
 *
 * REGLA: Nunca usar string literals sueltos en canAccess().
 * Siempre usar FEATURE_CODES.nombre — TypeScript rechaza typos.
 */

export const FEATURE_CODES = {
  // CORE
  dashboard: 'dashboard',
  workspace: 'workspace',

  // AUDITORÍAS
  audits_view: 'audits_view',
  audits_create: 'audits_create',
  audits_edit: 'audits_edit',
  audits_delete: 'audits_delete',

  // HALLAZGOS
  findings_view: 'findings_view',
  findings_create: 'findings_create',
  findings_edit: 'findings_edit',
  findings_delete: 'findings_delete',

  // CAPs (Corrective Action Plans)
  caps_view: 'caps_view',
  caps_create: 'caps_create',
  caps_edit: 'caps_edit',
  caps_delete: 'caps_delete',

  // REPORTES
  reports_view: 'reports_view',
  reports_create: 'reports_create',
  reports_delete: 'reports_delete',

  // USUARIOS & PERMISOS
  users_view: 'users_view',
  users_invite: 'users_invite',
  users_edit: 'users_edit',
  users_delete: 'users_delete',

  // ADMINISTRACIÓN
  admin_features: 'admin_features',
  admin_audit_log: 'admin_audit_log',

  // CHATBOT
  chatbot_l1: 'chatbot_l1',
  chatbot_l2: 'chatbot_l2',
  chatbot_l3: 'chatbot_l3',
  chatbot_l4: 'chatbot_l4',
} as const

export type FeatureCode = keyof typeof FEATURE_CODES

// Roles del sistema — tipados
export const ROLES = ['OWNER', 'ADMIN', 'SUPERVISOR', 'AUDITOR', 'VIEWER'] as const
export type Role = (typeof ROLES)[number]

// Acciones posibles
export type Action = 'VIEW' | 'CREATE' | 'UPDATE' | 'DELETE'

/**
 * Mapeo default de permisos por rol
 * Usado por scripts/sync-features.ts para seeding automático
 */
export const ROLE_PERMISSIONS: Record<Role, Set<FeatureCode>> = {
  OWNER: new Set([
    FEATURE_CODES.dashboard,
    FEATURE_CODES.workspace,
    FEATURE_CODES.audits_view,
    FEATURE_CODES.audits_create,
    FEATURE_CODES.audits_edit,
    FEATURE_CODES.findings_view,
    FEATURE_CODES.caps_view,
    FEATURE_CODES.caps_create,
    FEATURE_CODES.reports_view,
    FEATURE_CODES.users_view,
    FEATURE_CODES.users_invite,
    FEATURE_CODES.chatbot_l1,
    FEATURE_CODES.chatbot_l2,
    FEATURE_CODES.chatbot_l3,
  ]),

  ADMIN: new Set([
    FEATURE_CODES.dashboard,
    FEATURE_CODES.workspace,
    FEATURE_CODES.audits_view,
    FEATURE_CODES.audits_create,
    FEATURE_CODES.audits_edit,
    FEATURE_CODES.findings_view,
    FEATURE_CODES.caps_view,
    FEATURE_CODES.reports_view,
    FEATURE_CODES.users_view,
    FEATURE_CODES.users_invite,
    FEATURE_CODES.users_edit,
    FEATURE_CODES.chatbot_l1,
    FEATURE_CODES.chatbot_l2,
    FEATURE_CODES.chatbot_l3,
  ]),

  SUPERVISOR: new Set([
    FEATURE_CODES.dashboard,
    FEATURE_CODES.audits_view,
    FEATURE_CODES.audits_edit,
    FEATURE_CODES.findings_view,
    FEATURE_CODES.findings_edit,
    FEATURE_CODES.caps_view,
    FEATURE_CODES.caps_create,
    FEATURE_CODES.caps_edit,
    FEATURE_CODES.reports_view,
    FEATURE_CODES.reports_create,
    FEATURE_CODES.chatbot_l1,
    FEATURE_CODES.chatbot_l2,
    FEATURE_CODES.chatbot_l3,
  ]),

  AUDITOR: new Set([
    FEATURE_CODES.dashboard,
    FEATURE_CODES.audits_view,
    FEATURE_CODES.findings_view,
    FEATURE_CODES.findings_create,
    FEATURE_CODES.findings_edit,
    FEATURE_CODES.caps_view,
    FEATURE_CODES.chatbot_l1,
    FEATURE_CODES.chatbot_l2,
    FEATURE_CODES.chatbot_l3,
  ]),

  VIEWER: new Set([
    FEATURE_CODES.dashboard,
    FEATURE_CODES.audits_view,
    FEATURE_CODES.findings_view,
    FEATURE_CODES.reports_view,
    FEATURE_CODES.chatbot_l1,
    FEATURE_CODES.chatbot_l2,
    FEATURE_CODES.chatbot_l3,
  ]),
}
