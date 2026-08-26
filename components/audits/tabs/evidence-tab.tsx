"use client";

interface EvidenceTabProps {
  audit: any;
}

export function EvidenceTab({ audit }: EvidenceTabProps) {
  if (audit.evidence.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No evidence uploaded yet</p>
      </div>
    );
  }

  const fileIcons: Record<string, string> = {
    photo: "🖼️",
    document: "📄",
    screenshot: "📸",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {audit.evidence.map((evidence: any) => (
        <a
          key={evidence.id}
          href={evidence.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow hover:border-blue-300 block"
        >
          <div className="text-3xl mb-2">
            {fileIcons[evidence.fileType] || "📎"}
          </div>
          <p className="text-sm font-medium text-gray-900 truncate">
            {evidence.fileName}
          </p>
          <p className="text-xs text-gray-600 mt-1 capitalize">
            {evidence.fileType}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {evidence.storageProvider === "google_drive" && "Google Drive"}
            {evidence.storageProvider === "onedrive" && "OneDrive"}
            {evidence.storageProvider === "s3" && "S3"}
          </p>
          <p className="text-xs text-blue-600 mt-2">View →</p>
        </a>
      ))}
    </div>
  );
}
