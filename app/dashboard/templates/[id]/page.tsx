import { requireAuth } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TemplateEditor } from "@/components/templates/template-editor";

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth();
  const { id } = await params;

  const template = await prisma.auditTemplate.findUnique({
    where: { id },
    include: {
      questions: {
        orderBy: [{ section: "asc" }, { subsection: "asc" }],
      },
      baseType: true,
    },
  });

  if (!template) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/templates"
          className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block"
        >
          ← Back to Templates
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{template.name}</h1>
        {template.description && (
          <p className="mt-2 text-gray-600">{template.description}</p>
        )}
        {template.baseType && (
          <p className="mt-1 text-sm text-gray-500">
            Based on: <span className="font-medium">{template.baseType.name}</span>
          </p>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {template.questions.length} Questions
          </h2>
          <p className="text-sm text-gray-600">
            {template.questions.filter((q) => q.autoFindingIfNo).length} will auto-generate findings
          </p>
        </div>

        <TemplateEditor template={template} />
      </div>
    </div>
  );
}
