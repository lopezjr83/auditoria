import { requireAuth } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";
import { TemplatesList } from "@/components/templates/templates-list";
import { CreateTemplateDialog } from "@/components/templates/create-template-dialog";
import Link from "next/link";

export default async function TemplatesPage() {
  const session = await requireAuth();

  // Get workspace
  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id },
    include: { workspace: true },
  });

  if (!workspaceMember) {
    return <div className="text-center py-12 text-gray-500">No workspace found</div>;
  }

  const workspaceId = workspaceMember.workspace.id;

  // Get audit types for template creation
  const auditTypes = await prisma.auditType.findMany();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Audit Templates</h1>
        <p className="mt-2 text-gray-600">Create and manage custom audit templates for your workspace</p>
      </div>

      <div className="flex justify-end">
        <CreateTemplateDialog workspaceId={workspaceId} auditTypes={auditTypes} />
      </div>

      <div className="grid gap-6">
        <TemplatesList workspaceId={workspaceId} />
      </div>
    </div>
  );
}
