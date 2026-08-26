"use client";

import { useState } from "react";
import { createFinding } from "@/app/dashboard/audits/[id]/findings/actions";

interface CreateFindingDialogProps {
  auditId: string;
  onSuccess: () => void;
}

const severityOptions = [
  { value: "CRITICAL", label: "🔴 Critical", description: "Non-compliance that poses a direct risk" },
  { value: "MAJOR", label: "🟠 Major", description: "Significant non-compliance" },
  { value: "MINOR", label: "🟡 Minor", description: "Minor non-compliance" },
  { value: "OBSERVATION", label: "🔵 Observation", description: "Process improvement opportunity" },
];

export function CreateFindingDialog({
  auditId,
  onSuccess,
}: CreateFindingDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    severity: "MAJOR",
    description: "",
    location: "",
    rootCause: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createFinding({
        auditId,
        severity: formData.severity,
        description: formData.description,
        location: formData.location || undefined,
        rootCause: formData.rootCause || undefined,
      });

      setFormData({
        severity: "MAJOR",
        description: "",
        location: "",
        rootCause: "",
      });
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Error creating finding:", error);
      alert("Failed to create finding");
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
      >
        + Add Finding
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Create New Finding
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Severity *
            </label>
            <div className="space-y-2">
              {severityOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.severity === option.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    value={option.value}
                    checked={formData.severity === option.value}
                    onChange={(e) =>
                      setFormData({ ...formData, severity: e.target.value })
                    }
                    className="mt-1"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{option.label}</p>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the finding in detail..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="e.g., Warehouse, Lab, Office 3rd Floor"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Root Cause
            </label>
            <textarea
              value={formData.rootCause}
              onChange={(e) =>
                setFormData({ ...formData, rootCause: e.target.value })
              }
              placeholder="What is the underlying cause of this finding?"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Finding"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
