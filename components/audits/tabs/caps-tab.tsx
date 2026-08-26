"use client";

import { useState } from "react";
import { CreateCAPDialog } from "../create-cap-dialog";

const statusColors: Record<string, string> = {
  open: "bg-red-100 text-red-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  overdue: "bg-red-200 text-red-900",
  closed: "bg-gray-100 text-gray-800",
};

interface CapsTabProps {
  audit: any;
}

export function CapsTab({ audit }: CapsTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <CreateCAPDialog
          auditId={audit.id}
          findings={audit.findings}
        />
      </div>

      {audit.caps.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No CAPs created yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {audit.caps.map((cap: any) => (
            <div
              key={cap.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">{cap.code}</span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        statusColors[cap.status]
                      }`}
                    >
                      {cap.status.replace("_", " ")}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mt-2">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{cap.description}</p>

                  <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-600">👤 Owner</p>
                      <p className="font-medium text-gray-900">{cap.owner}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">📅 Due Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(cap.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {cap.completionDate && (
                    <div className="mt-3 text-sm">
                      <p className="text-xs text-gray-600">✅ Completed On</p>
                      <p className="font-medium text-green-600">
                        {new Date(cap.completionDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
