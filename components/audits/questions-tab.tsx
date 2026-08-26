"use client";

import { useState } from "react";
import { submitAuditResponse } from "@/app/dashboard/audits/[id]/questions/actions";
import { useRouter } from "next/navigation";

const severityColors: Record<string, string> = {
  CRITICAL: "bg-red-100 text-red-800",
  MAJOR: "bg-orange-100 text-orange-800",
  MINOR: "bg-yellow-100 text-yellow-800",
  OBSERVATION: "bg-blue-100 text-blue-800",
};

interface Question {
  id: string;
  section: string;
  subsection: string;
  question: string;
  findingSeverity: string | null;
  autoFindingIfNo: boolean;
}

interface Response {
  id: string;
  questionId: string;
  answer: string;
  evidence: string | null;
  generatedFindingId: string | null;
}

interface QuestionsTabProps {
  auditId: string;
  questions: Question[];
  responses: Response[];
}

export function QuestionsTab({
  auditId,
  questions,
  responses,
}: QuestionsTabProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [expandedSection, setExpandedSection] = useState<string | null>(
    questions.length > 0 ? questions[0].section : null
  );

  const responseMap = new Map(responses.map((r) => [r.questionId, r]));

  const sections = Array.from(
    new Map(
      questions.map((q) => [q.section, q.section])
    ).entries()
  ).map(([section]) => section);

  const handleResponse = async (
    questionId: string,
    answer: "YES" | "NO" | "N/A"
  ) => {
    setLoading((prev) => ({ ...prev, [questionId]: true }));

    try {
      await submitAuditResponse({
        auditId,
        questionId,
        answer,
      });

      router.refresh();
    } catch (error) {
      console.error("Error submitting response:", error);
      alert("Failed to submit response");
    } finally {
      setLoading((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  const getAnswerColor = (answer: string) => {
    if (answer === "YES") return "bg-green-100 text-green-800";
    if (answer === "NO") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-4">
      {sections.map((section) => {
        const sectionQuestions = questions.filter((q) => q.section === section);
        const isExpanded = expandedSection === section;

        return (
          <div key={section} className="border border-gray-200 rounded-lg">
            <button
              onClick={() =>
                setExpandedSection(isExpanded ? null : section)
              }
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="text-left flex-1">
                <h3 className="font-semibold text-gray-900">{section}</h3>
                <p className="text-sm text-gray-600">
                  {
                    sectionQuestions.filter((q) =>
                      responseMap.has(q.id)
                    ).length
                  }{" "}
                  of {sectionQuestions.length} answered
                </p>
              </div>
              <span className="text-gray-500">
                {isExpanded ? "▼" : "▶"}
              </span>
            </button>

            {isExpanded && (
              <div className="border-t border-gray-200 divide-y divide-gray-200">
                {sectionQuestions.map((question) => {
                  const response = responseMap.get(question.id);
                  const isLoading = loading[question.id];

                  return (
                    <div
                      key={question.id}
                      className="px-6 py-4 space-y-3"
                    >
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-gray-600 uppercase">
                          {question.subsection}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {question.question}
                        </p>
                        {question.autoFindingIfNo && (
                          <p className="text-xs text-orange-700 bg-orange-50 p-2 rounded">
                            ⚠️ NO answer will auto-generate a {question.findingSeverity} finding
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {response ? (
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getAnswerColor(
                                response.answer
                              )}`}
                            >
                              {response.answer}
                            </span>
                            {response.generatedFindingId && (
                              <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
                                Finding generated
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleResponse(question.id, "YES")}
                              disabled={isLoading}
                              className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 rounded transition-colors disabled:opacity-50"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => handleResponse(question.id, "NO")}
                              disabled={isLoading}
                              className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded transition-colors disabled:opacity-50"
                            >
                              No
                            </button>
                            <button
                              onClick={() => handleResponse(question.id, "N/A")}
                              disabled={isLoading}
                              className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors disabled:opacity-50"
                            >
                              N/A
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
