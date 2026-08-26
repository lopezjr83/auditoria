"use client";

import { useState } from "react";
import { deleteFinding } from "@/app/dashboard/audits/[id]/findings/actions";

const severityColors: Record<string, { bg: string; border: string; icon: string }> = {
  CRITICAL: { bg: "bg-red-100 text-red-800", border: "border-red-300", icon: "🔴" },
  MAJOR: { bg: "bg-orange-100 text-orange-800", border: "border-orange-300", icon: "🟠" },
  MINOR: { bg: "bg-yellow-100 text-yellow-800", border: "border-yellow-300", icon: "🟡" },
  OBSERVATION: { bg: "bg-blue-100 text-blue-800", border: "border-blue-300", icon: "🔵" },
};

interface FindingItemProps {
  finding: any;
  onDelete: () => void;
}

export function FindingItem({ finding, onDelete }: FindingItemProps) {
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteFinding(finding.id);
      onDelete();
    } catch (error) {
      console.error("Error deleting finding:", error);
      alert("Failed to delete finding");
    } finally {
      setLoading(false);
    }
  };

  const colors = severityColors[finding.severity] || severityColors.MAJOR;

  return (
    <div className={`border-l-4 p-4 rounded ${colors.bg}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">{colors.icon}</span>
            <span className="font-semibold">{finding.code}</span>
            <span className="text-xs font-medium px-2 py-1 rounded bg-opacity-20">
              {finding.severity}
            </span>
          </div>
          <p className="text-sm mt-2">{finding.description}</p>
          {finding.location && (
            <p className="text-xs mt-2">
              <span className="font-medium">📍 Location:</span> {finding.location}
            </p>
          )}
          {finding.rootCause && (
            <p className="text-xs mt-2">
              <span className="font-medium">🔍 Root Cause:</span> {finding.rootCause}
            </p>
          )}
          {finding.correctiveActions.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium mb-1">
                📋 Associated CAPs: {finding.correctiveActions.length}
              </p>
              <div className="flex gap-2 flex-wrap">
                {finding.correctiveActions.map((cap: any) => (
                  <span
                    key={cap.id}
                    className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded"
                  >
                    {cap.code}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="ml-4 flex gap-2">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            🗑️
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="mt-3 pt-3 border-t border-opacity-20 border-current">
          <p className="text-sm mb-2">Delete this finding?</p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "..." : "Delete"}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-3 py-1 border border-current text-sm rounded hover:opacity-70"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
