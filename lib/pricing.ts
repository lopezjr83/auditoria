export function calculateUserBand(userCount: number): {
  bandName: string
  monthlyPrice: number
} {
  if (userCount === 1) return { bandName: '1 user', monthlyPrice: 5 }
  if (userCount <= 5) return { bandName: '2-5 users', monthlyPrice: 13 }
  if (userCount <= 10) return { bandName: '6-10 users', monthlyPrice: 25 }
  if (userCount <= 50) return { bandName: '11-50 users', monthlyPrice: 125 }
  return { bandName: '50+ users', monthlyPrice: 0 }
}

export function calculateAuditCost(auditCount: number): number {
  if (auditCount <= 1) return 0
  return (auditCount - 1) * 20
}

export function calculateMonthlyPrice(userCount: number, auditCount: number): number {
  const userBand = calculateUserBand(userCount)
  const auditCost = calculateAuditCost(auditCount)
  return userBand.monthlyPrice + auditCost
}

export const FEATURE_LIMITS = {
  maxReports: Infinity,
  maxKnowledgeDocs: Infinity,
  maxGuestTokens: Infinity,
  guestTokenDuration: [1, 7, 14, 30],
}

export function validateUserCapacity(userCount: number): {
  allowed: boolean
  message?: string
} {
  if (userCount < 1) return { allowed: false, message: 'Se requiere al menos 1 usuario' }
  if (userCount > 500) return { allowed: false, message: 'Contacta a ventas para empresas > 500 usuarios' }
  return { allowed: true }
}

export function validateAuditCapacity(auditCount: number): {
  allowed: boolean
  message?: string
} {
  if (auditCount < 1) return { allowed: false, message: 'Se requiere al menos 1 auditoría' }
  return { allowed: true }
}
