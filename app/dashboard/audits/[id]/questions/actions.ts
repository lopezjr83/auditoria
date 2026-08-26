"use server";

import { requireAuth } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export async function getAuditQuestions(auditId: string) {
  const session = await requireAuth();

  const audit = await prisma.audit.findUnique({
    where: { id: auditId },
    include: {
      auditType: {
        include: {
          questions: {
            orderBy: [{ section: "asc" }, { subsection: "asc" }],
          },
        },
      },
    },
  });

  if (!audit) {
    throw new Error("Audit not found");
  }

  // Verify user has access
  const access = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id, workspaceId: audit.workspaceId },
  });

  if (!access) {
    throw new Error("Access denied");
  }

  const responses = await prisma.auditResponse.findMany({
    where: { auditId },
  });

  return {
    audit,
    questions: audit.auditType.questions,
    responses,
  };
}

export async function submitAuditResponse(params: {
  auditId: string;
  questionId: string;
  answer: "YES" | "NO" | "N/A";
  evidence?: string;
}) {
  const session = await requireAuth();

  const { auditId, questionId, answer, evidence } = params;

  // Verify access
  const audit = await prisma.audit.findUnique({
    where: { id: auditId },
  });

  if (!audit) {
    throw new Error("Audit not found");
  }

  const access = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id, workspaceId: audit.workspaceId },
  });

  if (!access) {
    throw new Error("Access denied");
  }

  // Get question to check if it should auto-generate finding
  const question = await prisma.auditQuestion.findUnique({
    where: { id: questionId },
  });

  if (!question) {
    throw new Error("Question not found");
  }

  // Create or update response
  const response = await prisma.auditResponse.upsert({
    where: {
      auditId_questionId: {
        auditId,
        questionId,
      },
    },
    create: {
      auditId,
      questionId,
      answer,
      evidence,
    },
    update: {
      answer,
      evidence,
    },
  });

  // Auto-generate Finding if answer is NO and autoFindingIfNo is true
  let generatedFinding = null;
  if (answer === "NO" && question.autoFindingIfNo) {
    // Check if finding already exists for this question-response
    const existingFinding = await prisma.finding.findFirst({
      where: {
        auditId,
        description: question.question,
      },
    });

    if (!existingFinding) {
      // Get the next finding code
      const lastFinding = await prisma.finding.findFirst({
        where: { auditId },
        orderBy: { code: "desc" },
      });

      const lastCode = lastFinding?.code || "NC-000";
      const nextNumber = parseInt(lastCode.split("-")[1]) + 1;
      const newCode = `NC-${String(nextNumber).padStart(3, "0")}`;

      generatedFinding = await prisma.finding.create({
        data: {
          auditId,
          code: newCode,
          severity: question.findingSeverity || "MAJOR",
          description: question.question,
          location: `Question: ${question.subsection}`,
          rootCause: "",
        },
      });

      // Update response with finding ID
      await prisma.auditResponse.update({
        where: { id: response.id },
        data: { generatedFindingId: generatedFinding.id },
      });
    }
  }

  return { response, generatedFinding };
}

export async function getAuditProgress(auditId: string) {
  const session = await requireAuth();

  const audit = await prisma.audit.findUnique({
    where: { id: auditId },
    include: {
      auditType: {
        include: {
          questions: true,
        },
      },
    },
  });

  if (!audit) {
    throw new Error("Audit not found");
  }

  const access = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id, workspaceId: audit.workspaceId },
  });

  if (!access) {
    throw new Error("Access denied");
  }

  const responses = await prisma.auditResponse.findMany({
    where: { auditId },
  });

  const totalQuestions = audit.auditType.questions.length;
  const answeredQuestions = responses.length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  // Count findings by severity from auto-generated findings
  const findings = await prisma.finding.findMany({
    where: { auditId },
  });

  return {
    totalQuestions,
    answeredQuestions,
    progressPercentage: Math.round(progressPercentage),
    findings: findings.length,
  };
}
