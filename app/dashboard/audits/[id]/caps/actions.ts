"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-guard";

export async function createCAP(data: {
  auditId: string;
  findingId: string;
  title: string;
  description: string;
  owner: string;
  dueDate: Date;
}) {
  await requireAuth();

  // Get the highest CAP number for this audit
  const caps = await prisma.correctiveAction.findMany({
    where: { auditId: data.auditId },
    select: { code: true },
  });

  const codeNumber = caps.length + 1;
  const code = `CAP-${String(codeNumber).padStart(3, "0")}`;

  const cap = await prisma.correctiveAction.create({
    data: {
      auditId: data.auditId,
      findingId: data.findingId,
      code,
      title: data.title,
      description: data.description,
      owner: data.owner,
      dueDate: data.dueDate,
      status: "open",
    },
  });

  return cap;
}

export async function updateCAPStatus(
  capId: string,
  status: string,
  completionDate?: Date
) {
  await requireAuth();

  const cap = await prisma.correctiveAction.update({
    where: { id: capId },
    data: {
      status,
      completionDate: status === "completed" ? completionDate || new Date() : null,
    },
  });

  return cap;
}

export async function deleteCAP(capId: string) {
  await requireAuth();

  await prisma.correctiveAction.delete({
    where: { id: capId },
  });
}
