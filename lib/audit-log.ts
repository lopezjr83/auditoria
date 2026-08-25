import { prisma } from './prisma'

export async function logAuditChange(params: {
  workspaceId: string
  auditId?: string
  userId: string
  action: string
  entityType: string
  entityId: string
  changes?: { before: any; after: any }
  reason?: string
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
      changes: params.changes,
      description: params.reason,
      ipAddress: params.ipAddress,
    },
  })
}
