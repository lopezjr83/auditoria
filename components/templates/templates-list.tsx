"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAuditTemplates, deleteAuditTemplate } from "@/app/dashboard/templates/actions";
import { useRouter } from "next/navigation";

interface TemplatesListProps {
  workspaceId: string;
}

interface Template {
  id: string;
  name: string;
  description: string | null;
  baseType: any;
  questions: any[];
  createdAt: Date;
}

export function TemplatesList({ workspaceId }: TemplatesListProps) {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadTemplates();
  }, [workspaceId]);

  const loadTemplates = async () => {
    try {
      const data = await getAuditTemplates(workspaceId);
      setTemplates(data);
    } catch (error) {
      console.error("Error loading templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (templateId: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;

    setDeleting(templateId);
    try {
      await deleteAuditTemplate(templateId);
      setTemplates(templates.filter((t) => t.id !== templateId));
    } catch (error) {
      console.error("Error deleting template:", error);
      alert("Failed to delete template");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading templates...</div>;
  }

  if (templates.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 text-center py-12 text-gray-500">
          <p>📋 No custom templates yet</p>
          <p className="text-sm mt-2">Create your first template to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {templates.map((template) => (
        <div key={template.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                {template.baseType && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Based on {template.baseType.name}
                  </span>
                )}
              </div>
              {template.description && (
                <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              )}
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                <span>{template.questions.length} questions</span>
                <span>
                  {template.questions.filter((q) => q.autoFindingIfNo).length} auto-findings
                </span>
              </div>
            </div>

            <div className="flex gap-2 ml-4">
              <Link
                href={`/dashboard/templates/${template.id}`}
                className="px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(template.id)}
                disabled={deleting === template.id}
                className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
              >
                {deleting === template.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
