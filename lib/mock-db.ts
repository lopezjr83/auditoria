// Mock database en memoria — será reemplazado con Prisma
// Los datos se persisten durante la sesión, se pierden al reiniciar

import { Audit, Finding, CAP, AuditStatus, FindingSeverity, CAPStatus } from '@/types'

interface MockDB {
  audits: Map<string, Audit>
  findings: Map<string, Finding>
  caps: Map<string, CAP>
}

let db: MockDB = {
  audits: new Map(),
  findings: new Map(),
  caps: new Map(),
}

// Datos iniciales de demostración
function initMockData() {
  if (db.audits.size > 0) return // Ya inicializado

  const audit1: Audit = {
    id: 'aud-001',
    title: 'SMETA ACME Corp 2026-01',
    type: 'SMETA',
    status: 'EN_PROGRESO',
    startDate: new Date('2026-01-15'),
    createdBy: 'user-demo',
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
  }

  const finding1: Finding = {
    id: 'find-001',
    auditId: 'aud-001',
    description: 'Maquinaria sin guardias de seguridad',
    severity: 'CRITICAL',
    standard: 'SMETA Labour',
    location: 'Sala 3',
    createdBy: 'user-demo',
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
  }

  const cap1: CAP = {
    id: 'cap-001',
    findingId: 'find-001',
    auditId: 'aud-001',
    action: 'Instalar guardias de seguridad en maquinaria',
    responsible: 'Supervisor de Seguridad',
    dueDate: new Date('2026-03-15'),
    status: 'ABIERTO',
    createdBy: 'user-demo',
    createdAt: new Date('2026-01-16'),
    updatedAt: new Date('2026-01-16'),
  }

  db.audits.set(audit1.id, audit1)
  db.findings.set(finding1.id, finding1)
  db.caps.set(cap1.id, cap1)
}

// ─── Audits ───────────────────────────────────
export function getAudits(): Audit[] {
  initMockData()
  return Array.from(db.audits.values())
}

export function getAudit(id: string): Audit | null {
  initMockData()
  return db.audits.get(id) || null
}

export function createAudit(audit: Audit): Audit {
  initMockData()
  db.audits.set(audit.id, audit)
  return audit
}

export function updateAudit(id: string, updates: Partial<Audit>): Audit | null {
  initMockData()
  const audit = db.audits.get(id)
  if (!audit) return null
  const updated = { ...audit, ...updates, updatedAt: new Date() }
  db.audits.set(id, updated)
  return updated
}

export function deleteAudit(id: string): boolean {
  initMockData()
  return db.audits.delete(id)
}

// ─── Findings ─────────────────────────────────
export function getFindings(auditId: string): Finding[] {
  initMockData()
  return Array.from(db.findings.values()).filter(f => f.auditId === auditId)
}

export function getFinding(id: string): Finding | null {
  initMockData()
  return db.findings.get(id) || null
}

export function createFinding(finding: Finding): Finding {
  initMockData()
  db.findings.set(finding.id, finding)
  return finding
}

export function updateFinding(id: string, updates: Partial<Finding>): Finding | null {
  initMockData()
  const finding = db.findings.get(id)
  if (!finding) return null
  const updated = { ...finding, ...updates, updatedAt: new Date() }
  db.findings.set(id, updated)
  return updated
}

export function deleteFinding(id: string): boolean {
  initMockData()
  return db.findings.delete(id)
}

// ─── CAPs ─────────────────────────────────────
export function getCAPs(auditId: string): CAP[] {
  initMockData()
  return Array.from(db.caps.values()).filter(c => c.auditId === auditId)
}

export function getCAP(id: string): CAP | null {
  initMockData()
  return db.caps.get(id) || null
}

export function createCAP(cap: CAP): CAP {
  initMockData()
  db.caps.set(cap.id, cap)
  return cap
}

export function updateCAP(id: string, updates: Partial<CAP>): CAP | null {
  initMockData()
  const cap = db.caps.get(id)
  if (!cap) return null
  const updated = { ...cap, ...updates, updatedAt: new Date() }
  db.caps.set(id, updated)
  return updated
}

export function deleteCAP(id: string): boolean {
  initMockData()
  return db.caps.delete(id)
}

import type { AuditLog } from '@/types'

const auditLogs = new Map<string, AuditLog[]>()

// ─── Audit Logs ───────────────────────────────
export function logAuditAction(auditId: string, log: Omit<AuditLog, 'id' | 'timestamp'>) {
  const id = `log-${Date.now()}`
  const fullLog: AuditLog = {
    ...log,
    id,
    timestamp: new Date(),
  }

  if (!auditLogs.has(auditId)) {
    auditLogs.set(auditId, [])
  }

  auditLogs.get(auditId)!.push(fullLog)
  return fullLog
}

export function getAuditLogs(auditId: string): AuditLog[] {
  return auditLogs.get(auditId) || []
}

import type { GuestToken } from '@/types'

const guestTokens = new Map<string, GuestToken>()

export function createGuestToken(token: GuestToken): GuestToken {
  guestTokens.set(token.token, token)
  return token
}

export function getGuestToken(tokenStr: string): GuestToken | null {
  return guestTokens.get(tokenStr) || null
}

export function getGuestTokensByAudit(auditId: string): GuestToken[] {
  return Array.from(guestTokens.values()).filter(t => t.auditId === auditId)
}

export function revokeGuestToken(tokenStr: string): boolean {
  const token = guestTokens.get(tokenStr)
  if (!token) return false
  token.revokedAt = new Date()
  return true
}

import type { FAQ, KnowledgeDoc } from '@/types'

const faqs: FAQ[] = [
  {
    id: 'faq-001',
    question: '¿Cuál es la diferencia entre un hallazgo Major y Minor?',
    answer: 'Un hallazgo MAJOR es una deficiencia significativa en cumplimiento con alto riesgo. Un MINOR es una deficiencia menor, fácil de corregir.',
    category: 'Hallazgos',
    keywords: ['hallazgo', 'major', 'minor', 'severidad'],
  },
  {
    id: 'faq-002',
    question: '¿Cómo creo un CAP?',
    answer: 'Para cada hallazgo puedes crear un Plan de Acción Correctiva (CAP) especificando: acción, responsable y fecha de cierre.',
    category: 'CAPs',
    keywords: ['cap', 'plan', 'acción', 'correctiva'],
  },
  {
    id: 'faq-003',
    question: '¿Qué es SMETA?',
    answer: 'SMETA es un estándar de auditoría de cuatro pilares: Prácticas Laborales, Seguridad, Ambiente y Ética Comercial.',
    category: 'Estándares',
    keywords: ['smeta', 'estándar', 'auditoría'],
  },
]

const knowledgeDocs: KnowledgeDoc[] = [
  {
    id: 'doc-001',
    title: 'SMETA 4 Pillars - Guía Completa',
    content: 'SMETA cubre 4 pilares principales... (ver documentación completa)',
    category: 'Legal',
    tags: ['smeta', 'pillars', 'auditoría'],
  },
  {
    id: 'doc-002',
    title: 'Cómo escribir hallazgos sin ambigüedad',
    category: 'Operativo',
    content: 'Un buen hallazgo debe ser específico, observable y verificable...',
    tags: ['hallazgo', 'escritura', 'mejores-prácticas'],
  },
]

export function searchFAQs(query: string): FAQ[] {
  return faqs.filter(
    f =>
      f.question.toLowerCase().includes(query.toLowerCase()) ||
      f.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
  )
}

export function getKnowledgeDocs(category?: string): KnowledgeDoc[] {
  if (!category) return knowledgeDocs
  return knowledgeDocs.filter(d => d.category === category)
}
