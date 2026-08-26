"use client";

const severityColors: Record<string, string> = {
  CRITICAL: "bg-red-100 text-red-800 border-red-300",
  MAJOR: "bg-orange-100 text-orange-800 border-orange-300",
  MINOR: "bg-yellow-100 text-yellow-800 border-yellow-300",
  OBSERVATION: "bg-blue-100 text-blue-800 border-blue-300",
};

interface FindingsTabProps {
  audit: any;
}

export function FindingsTab({ audit }: FindingsTabProps) {
  if (audit.findings.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No findings recorded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {audit.findings.map((finding: any) => (
        <div
          key={finding.id}
          className={`border-l-4 p-4 rounded ${severityColors[finding.severity]}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{finding.code}</span>
                <span className="text-xs font-medium px-2 py-1 rounded bg-opacity-20">
                  {finding.severity}
                </span>
              </div>
              <p className="text-sm mt-2">{finding.description}</p>
              {finding.location && (
                <p className="text-xs mt-2">
                  <span className="font-medium">Location:</span> {finding.location}
                </p>
              )}
              {finding.rootCause && (
                <p className="text-xs mt-2">
                  <span className="font-medium">Root Cause:</span> {finding.rootCause}
                </p>
              )}
              {finding.correctiveActions.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-medium mb-1">
                    Associated CAPs: {finding.correctiveActions.length}
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
          </div>
        </div>
      ))}
    </div>
  );
}
