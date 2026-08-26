"use server";

import { requireAuth } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export async function getAuditTemplates(workspaceId: string) {
  const session = await requireAuth();

  // Verify access
  const access = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id, workspaceId },
  });

  if (!access) {
    throw new Error("Access denied");
  }

  const templates = await prisma.auditTemplate.findMany({
    where: { workspaceId },
    include: {
      baseType: true,
      questions: {
        orderBy: [{ section: "asc" }, { subsection: "asc" }],
      },
    },
  });

  return templates;
}

export async function createAuditTemplate(params: {
  workspaceId: string;
  name: string;
  description?: string;
  baseAuditTypeId?: string;
}) {
  const session = await requireAuth();
  const { workspaceId, name, description, baseAuditTypeId } = params;

  // Verify access
  const access = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id, workspaceId },
  });

  if (!access) {
    throw new Error("Access denied");
  }

  // If based on standard template, copy questions
  let questionsData: Array<{
    section: string;
    section_es: string | null;
    subsection: string;
    subsection_es: string | null;
    question: string;
    question_es: string | null;
    scoringType: string;
    autoFindingIfNo: boolean;
    findingSeverity: string | null;
    weight: number;
  }> = [];

  if (baseAuditTypeId) {
    const baseQuestions = await prisma.auditQuestion.findMany({
      where: { auditTypeId: baseAuditTypeId },
    });

    questionsData = baseQuestions.map((q) => ({
      section: q.section,
      section_es: q.section_es,
      subsection: q.subsection,
      subsection_es: q.subsection_es,
      question: q.question,
      question_es: q.question_es,
      scoringType: q.scoringType,
      autoFindingIfNo: q.autoFindingIfNo,
      findingSeverity: q.findingSeverity,
      weight: q.weight,
    }));
  }

  const template = await prisma.auditTemplate.create({
    data: {
      workspaceId,
      name,
      description,
      baseAuditTypeId,
      questions: {
        create: questionsData,
      },
    },
    include: {
      questions: true,
      baseType: true,
    },
  });

  return template;
}

export async function updateAuditTemplate(params: {
  templateId: string;
  name?: string;
  description?: string;
}) {
  const session = await requireAuth();
  const { templateId, name, description } = params;

  // Verify access
  const template = await prisma.auditTemplate.findUnique({
    where: { id: templateId },
  });

  if (!template) {
    throw new Error("Template not found");
  }

  const access = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id, workspaceId: template.workspaceId },
  });

  if (!access) {
    throw new Error("Access denied");
  }

  const updated = await prisma.auditTemplate.update({
    where: { id: templateId },
    data: {
      ...(name && { name }),
      ...(description !== undefined && { description }),
    },
    include: {
      questions: true,
      baseType: true,
    },
  });

  return updated;
}

export async function deleteAuditTemplate(templateId: string) {
  const session = await requireAuth();

  const template = await prisma.auditTemplate.findUnique({
    where: { id: templateId },
  });

  if (!template) {
    throw new Error("Template not found");
  }

  const access = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id, workspaceId: template.workspaceId },
  });

  if (!access) {
    throw new Error("Access denied");
  }

  await prisma.auditTemplate.delete({
    where: { id: templateId },
  });
}

export async function addQuestionToTemplate(params: {
  templateId: string;
  section: string;
  section_es?: string;
  subsection: string;
  subsection_es?: string;
  question: string;
  question_es?: string;
  autoFindingIfNo?: boolean;
  findingSeverity?: string;
}) {
  const session = await requireAuth();
  const { templateId, ...questionData } = params;

  // Verify access
  const template = await prisma.auditTemplate.findUnique({
    where: { id: templateId },
  });

  if (!template) {
    throw new Error("Template not found");
  }

  const access = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id, workspaceId: template.workspaceId },
  });

  if (!access) {
    throw new Error("Access denied");
  }

  const question = await prisma.customQuestion.create({
    data: {
      templateId,
      ...questionData,
      autoFindingIfNo: questionData.autoFindingIfNo ?? true,
      findingSeverity: questionData.findingSeverity ?? "MAJOR",
    },
  });

  return question;
}

export async function updateQuestion(params: {
  questionId: string;
  question?: string;
  question_es?: string;
  autoFindingIfNo?: boolean;
  findingSeverity?: string;
}) {
  const session = await requireAuth();
  const { questionId, ...updateData } = params;

  // Verify access through template
  const question = await prisma.customQuestion.findUnique({
    where: { id: questionId },
    include: { template: true },
  });

  if (!question) {
    throw new Error("Question not found");
  }

  const access = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id, workspaceId: question.template.workspaceId },
  });

  if (!access) {
    throw new Error("Access denied");
  }

  const updated = await prisma.customQuestion.update({
    where: { id: questionId },
    data: updateData,
  });

  return updated;
}

export async function deleteQuestion(questionId: string) {
  const session = await requireAuth();

  const question = await prisma.customQuestion.findUnique({
    where: { id: questionId },
    include: { template: true },
  });

  if (!question) {
    throw new Error("Question not found");
  }

  const access = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id, workspaceId: question.template.workspaceId },
  });

  if (!access) {
    throw new Error("Access denied");
  }

  await prisma.customQuestion.delete({
    where: { id: questionId },
  });
}
