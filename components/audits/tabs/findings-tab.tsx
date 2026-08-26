"use client";

import { useState } from "react";
import { CreateFindingDialog } from "../create-finding-dialog";
import { FindingItem } from "../finding-item";

interface FindingsTabProps {
  audit: any;
}

export function FindingsTab({ audit }: FindingsTabProps) {
  const [findings, setFindings] = useState(audit.findings);

  const handleFindingDeleted = () => {
    setFindings(findings.filter((f: any) => f.id !== null));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <CreateFindingDialog auditId={audit.id} />
      </div>

      {findings.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No findings recorded yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {findings.map((finding: any) => (
            <FindingItem
              key={finding.id}
              finding={finding}
              onDelete={handleFindingDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}
