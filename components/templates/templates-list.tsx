"use client";

import Link from "next/link";

interface TemplatesListProps {
  workspaceId: string;
}

export function TemplatesList({ workspaceId }: TemplatesListProps) {
  // TODO: Fetch templates from server action
  // For now, show empty state

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 text-center py-12 text-gray-500">
        <p>📋 No custom templates yet</p>
        <p className="text-sm mt-2">Create your first template to get started</p>
      </div>
    </div>
  );
}
