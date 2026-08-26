import { requireAuth } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AuditDetails } from "@/components/audits/audit-details";

export default async function AuditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth();
  const { id } = await params;

  const audit = await prisma.audit.findUnique({
    where: { id },
    include: {
      auditType: true,
      findings: {
        include: {
          correctiveActions: true,
        },
      },
      caps: true,
      evidence: true,
    },
  });

  if (!audit) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/audits"
            className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block"
          >
            ← Back to Audits
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{audit.title}</h1>
          <p className="mt-2 text-gray-600">{audit.auditType?.name}</p>
        </div>
      </div>

      <AuditDetails audit={audit} />
    </div>
  );
}
