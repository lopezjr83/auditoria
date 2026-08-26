"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-guard";

export async function createFinding(data: {
  auditId: string;
  severity: string;
  description: string;
  location?: string;
  rootCause?: string;
}) {
  await requireAuth();

  // Get the highest finding number for this audit
  const findings = await prisma.finding.findMany({
    where: { auditId: data.auditId },
    select: { code: true },
  });

  const codeNumber = findings.length + 1;
  const code = `NC-${String(codeNumber).padStart(3, "0")}`;

  const finding = await prisma.finding.create({
    data: {
      auditId: data.auditId,
      code,
      severity: data.severity,
      description: data.description,
      location: data.location,
      rootCause: data.rootCause,
    },
  });

  return finding;
}

export async function updateFinding(
  findingId: string,
  data: {
    severity?: string;
    description?: string;
    location?: string;
    rootCause?: string;
  }
) {
  await requireAuth();

  const finding = await prisma.finding.update({
    where: { id: findingId },
    data,
  });

  return finding;
}

export async function deleteFinding(findingId: string) {
  await requireAuth();

  await prisma.finding.delete({
    where: { id: findingId },
  });
}
