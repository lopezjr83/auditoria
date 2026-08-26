import Link from "next/link";
import { requireAuth } from "@/lib/auth-guard";
import { getAudits } from "./actions";
import { CreateAuditDialog } from "@/components/audits/create-audit-dialog";
import { prisma } from "@/lib/prisma";

const statusColors: Record<string, string> = {
  planning: "bg-blue-100 text-blue-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  archived: "bg-gray-100 text-gray-800",
};

export default async function AuditsPage() {
  const session = await requireAuth();

  // TODO: Get workspace ID from session/context
  // For now, get first workspace of the user
  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id },
    include: { workspace: true },
  });

  if (!workspaceMember) {
    return <div className="text-center py-12 text-gray-500">No workspace found</div>;
  }

  const workspaceId = workspaceMember.workspace.id;

  const audits = await getAudits(workspaceId);
  const auditTypes = await prisma.auditType.findMany();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Audits</h1>
        <p className="mt-2 text-gray-600">Manage and track all your audits</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4 flex-1">
          <input
            type="text"
            placeholder="Search audits..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
          />
        </div>
        <CreateAuditDialog
          workspaceId={workspaceId}
          auditTypes={auditTypes}
          onSuccess={() => {}}
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Audit Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Findings
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {audits.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No audits yet. Create your first audit to get started!
                </td>
              </tr>
            ) : (
              audits.map((audit) => (
                <tr key={audit.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {audit.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {audit.auditType?.name}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[audit.status] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {audit.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {audit.findings.length} finding{audit.findings.length !== 1 ? "s" : ""}
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <Link
                      href={`/dashboard/audits/${audit.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
