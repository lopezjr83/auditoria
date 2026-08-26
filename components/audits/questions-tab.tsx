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

const translations = {
  en: {
    answered: "answered",
    of: "of",
    noAnswer: "NO answer will auto-generate a",
    finding: "finding",
    yes: "Yes",
    no: "No",
  },
  es: {
    answered: "respondidas",
    of: "de",
    noAnswer: "Respuesta NO auto-generará un hallazgo",
    finding: "hallazgo",
    yes: "Sí",
    no: "No",
  },
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
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [expandedSection, setExpandedSection] = useState<string | null>(
    questions.length > 0 ? (language === "en" ? questions[0].section : questions[0].section_es || questions[0].section) : null
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
      {/* Language Selector */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setLanguage("en")}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            language === "en"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage("es")}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            language === "es"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Español
        </button>
      </div>

      {sections.map((section) => {
        const sectionQuestions = questions.filter(
          (q) => (language === "en" ? q.section : q.section_es || q.section) === section
        );
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
                  {translations[language].of} {sectionQuestions.length}{" "}
                  {translations[language].answered}
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
                          {language === "en" ? question.subsection : question.subsection_es || question.subsection}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {language === "en" ? question.question : question.question_es || question.question}
                        </p>
                        {question.autoFindingIfNo && (
                          <p className="text-xs text-orange-700 bg-orange-50 p-2 rounded">
                            ⚠️ {language === "en" ? "NO answer will auto-generate a" : "Respuesta NO auto-generará un"} {question.findingSeverity}{" "}
                            {language === "en" ? "finding" : "hallazgo"}
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
                              {language === "en" ? "Yes" : "Sí"}
                            </button>
                            <button
                              onClick={() => handleResponse(question.id, "NO")}
                              disabled={isLoading}
                              className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded transition-colors disabled:opacity-50"
                            >
                              {language === "en" ? "No" : "No"}
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
