"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-guard";
import { redirect } from "next/navigation";

export async function getAudits(workspaceId: string) {
  const session = await requireAuth();

  const audits = await prisma.audit.findMany({
    where: { workspaceId },
    include: {
      auditType: true,
      findings: true,
      caps: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return audits;
}

export async function createAudit(data: {
  workspaceId: string;
  auditTypeId: string;
  title: string;
  description?: string;
  scheduledDate?: Date;
}) {
  await requireAuth();

  const audit = await prisma.audit.create({
    data: {
      workspaceId: data.workspaceId,
      auditTypeId: data.auditTypeId,
      title: data.title,
      description: data.description,
      scheduledDate: data.scheduledDate,
      status: "planning",
    },
    include: {
      auditType: true,
    },
  });

  return audit;
}

export async function updateAuditStatus(auditId: string, status: string) {
  await requireAuth();

  const audit = await prisma.audit.update({
    where: { id: auditId },
    data: { status },
    include: { auditType: true },
  });

  return audit;
}

export async function deleteAudit(auditId: string) {
  await requireAuth();

  await prisma.audit.delete({
    where: { id: auditId },
  });
}
