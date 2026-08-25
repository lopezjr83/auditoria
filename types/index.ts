export type AuditStatus = 'DRAFT' | 'EN_PROGRESO' | 'COMPLETADA' | 'CANCELADA'
export type AuditType = 'SMETA' | 'ISO_9001' | 'ISO_14001' | 'ISO_45001' | 'OTRO'
export type FindingSeverity = 'CRITICAL' | 'MAJOR' | 'MINOR' | 'OBSERVATION'
export type CAPStatus = 'ABIERTO' | 'EN_PROGRESO' | 'VALIDADO' | 'CERRADO'

export interface Audit {
  id: string
  title: string
  type: AuditType
  status: AuditStatus
  startDate: Date
  endDate?: Date
  description?: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface Finding {
  id: string
  auditId: string
  description: string
  severity: FindingSeverity
  standard?: string
  location?: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface CAP {
  id: string
  findingId: string
  auditId: string
  action: string
  responsible: string
  dueDate: Date
  status: CAPStatus
  notes?: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export type AuditLogAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'CHANGE_SEVERITY' | 'ADD_FINDING' | 'CREATE_CAP' | 'CLOSE_CAP'

export interface AuditLog {
  id: string
  auditId: string
  action: AuditLogAction
  entityType: string
  entityId: string
  changes?: {
    before?: any
    after?: any
  }
  description?: string
  userId: string
  ipAddress?: string
  timestamp: Date
}

export type GuestAccessType = 'QR_AUDITOR' | 'LINK_CONSULTOR' | 'LINK_CLIENTE'

export interface GuestToken {
  id: string
  token: string
  auditId: string
  accessType: GuestAccessType
  guestEmail?: string
  guestName?: string
  permissions: string[]
  expiresAt: Date
  usedAt?: Date
  revokedAt?: Date
  createdBy: string
  createdAt: Date
}

export type ReportFormat = 'PDF' | 'EXCEL' | 'HTML'

export interface Report {
  id: string
  auditId: string
  title: string
  format: ReportFormat
  generatedBy: string
  generatedAt: Date
  data: {
    summary: string
    findingsCount: number
    capsCount: number
    findings: Finding[]
    caps: CAP[]
  }
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  keywords: string[]
}

export interface KnowledgeDoc {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
}

export interface ChatMessage {
  id: string
  level: 1 | 2 | 3 | 4
  userMessage: string
  aiResponse: string
  userId: string
  timestamp: Date
}
