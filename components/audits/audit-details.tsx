"use client";

import { useState } from "react";
import { FindingsTab } from "./tabs/findings-tab";
import { CapsTab } from "./tabs/caps-tab";
import { EvidenceTab } from "./tabs/evidence-tab";

interface AuditDetailsProps {
  audit: any;
}

const tabs = ["Findings", "CAPs", "Evidence", "Timeline"];

export function AuditDetails({ audit }: AuditDetailsProps) {
  const [activeTab, setActiveTab] = useState("Findings");

  const statusColors: Record<string, string> = {
    planning: "bg-blue-100 text-blue-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    archived: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="space-y-6">
      {/* Status and Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium inline-block mt-1 ${
                statusColors[audit.status] || "bg-gray-100 text-gray-800"
              }`}
            >
              {audit.status.replace("_", " ")}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Findings</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {audit.findings.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">CAPs</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {audit.caps.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Evidence</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {audit.evidence.length}
            </p>
          </div>
        </div>

        {audit.description && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Description</p>
            <p className="text-gray-900">{audit.description}</p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-600 border-transparent hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "Findings" && <FindingsTab audit={audit} />}
          {activeTab === "CAPs" && <CapsTab audit={audit} />}
          {activeTab === "Evidence" && <EvidenceTab audit={audit} />}
          {activeTab === "Timeline" && (
            <div className="text-center py-12 text-gray-500">
              Timeline view coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
