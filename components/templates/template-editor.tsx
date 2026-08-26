"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addQuestionToTemplate, updateQuestion, deleteQuestion } from "@/app/dashboard/templates/actions";

interface TemplateEditorProps {
  template: any;
}

export function TemplateEditor({ template }: TemplateEditorProps) {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>(
    template.questions.length > 0 ? template.questions[0].section : null
  );
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  const sections: string[] = Array.from(
    new Map(template.questions.map((q: any) => [q.section, q.section])).entries()
  ).map(([section]) => section as string);

  const handleAddQuestion = async (formData: any) => {
    setLoading(true);
    try {
      await addQuestionToTemplate({
        templateId: template.id,
        section: formData.section,
        section_es: formData.section_es,
        subsection: formData.subsection,
        subsection_es: formData.subsection_es,
        question: formData.question,
        question_es: formData.question_es,
        autoFindingIfNo: formData.autoFindingIfNo,
        findingSeverity: formData.findingSeverity,
      });
      setShowAddQuestion(false);
      router.refresh();
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Failed to add question");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm("Delete this question?")) return;

    try {
      await deleteQuestion(questionId);
      router.refresh();
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question");
    }
  };

  return (
    <div className="space-y-4">
      {/* Add Question Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddQuestion(!showAddQuestion)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
        >
          {showAddQuestion ? "Cancel" : "+ Add Question"}
        </button>
      </div>

      {/* Add Question Form */}
      {showAddQuestion && (
        <AddQuestionForm
          templateSections={sections}
          onSubmit={handleAddQuestion}
          loading={loading}
        />
      )}

      {/* Questions by Section */}
      {sections.map((section: string) => {
        const sectionQuestions = template.questions.filter(
          (q: any) => q.section === section
        );
        const isExpanded = expandedSection === section;

        return (
          <div key={section as React.Key} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => setExpandedSection(isExpanded ? null : section)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="text-left flex-1">
                <h3 className="font-semibold text-gray-900">{section}</h3>
                <p className="text-sm text-gray-600">
                  {sectionQuestions.length} question{sectionQuestions.length !== 1 ? "s" : ""}
                </p>
              </div>
              <span className="text-gray-500">{isExpanded ? "▼" : "▶"}</span>
            </button>

            {isExpanded && (
              <div className="border-t border-gray-200 divide-y divide-gray-200">
                {sectionQuestions.map((q: any) => (
                  <div key={q.id} className="p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-600 uppercase">
                        {q.subsection}
                      </p>
                      <p className="text-sm font-medium text-gray-900">{q.question}</p>
                      {q.question_es && (
                        <p className="text-sm text-gray-600 italic">{q.question_es}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      {q.autoFindingIfNo && (
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
                          Auto-finding: {q.findingSeverity}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="px-3 py-1 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface AddQuestionFormProps {
  templateSections: string[];
  onSubmit: (formData: any) => Promise<void>;
  loading: boolean;
}

function AddQuestionForm({ templateSections, onSubmit, loading }: AddQuestionFormProps) {
  const [formData, setFormData] = useState({
    section: templateSections[0] || "",
    section_es: "",
    subsection: "",
    subsection_es: "",
    question: "",
    question_es: "",
    autoFindingIfNo: true,
    findingSeverity: "MAJOR",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      section: templateSections[0] || "",
      section_es: "",
      subsection: "",
      subsection_es: "",
      question: "",
      question_es: "",
      autoFindingIfNo: true,
      findingSeverity: "MAJOR",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Section (EN)
          </label>
          <input
            type="text"
            required
            value={formData.section}
            onChange={(e) => setFormData({ ...formData, section: e.target.value })}
            placeholder="e.g., SMETA Pillar 1: Labour"
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Section (ES)
          </label>
          <input
            type="text"
            value={formData.section_es}
            onChange={(e) => setFormData({ ...formData, section_es: e.target.value })}
            placeholder="e.g., SMETA Pilar 1: Trabajo"
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Subsection (EN)
          </label>
          <input
            type="text"
            required
            value={formData.subsection}
            onChange={(e) => setFormData({ ...formData, subsection: e.target.value })}
            placeholder="e.g., 1.1 Child Labour"
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Subsection (ES)
          </label>
          <input
            type="text"
            value={formData.subsection_es}
            onChange={(e) => setFormData({ ...formData, subsection_es: e.target.value })}
            placeholder="e.g., 1.1 Trabajo Infantil"
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Question (EN) *
        </label>
        <textarea
          required
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          placeholder="Enter question in English..."
          rows={2}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Question (ES)
        </label>
        <textarea
          value={formData.question_es}
          onChange={(e) => setFormData({ ...formData, question_es: e.target.value })}
          placeholder="Enter question in Spanish..."
          rows={2}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="flex items-center gap-2 text-xs font-medium text-gray-700">
            <input
              type="checkbox"
              checked={formData.autoFindingIfNo}
              onChange={(e) => setFormData({ ...formData, autoFindingIfNo: e.target.checked })}
              className="rounded"
            />
            Auto-generate Finding if NO
          </label>
        </div>
        {formData.autoFindingIfNo && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Severity
            </label>
            <select
              value={formData.findingSeverity}
              onChange={(e) => setFormData({ ...formData, findingSeverity: e.target.value })}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="CRITICAL">CRITICAL</option>
              <option value="MAJOR">MAJOR</option>
              <option value="MINOR">MINOR</option>
              <option value="OBSERVATION">OBSERVATION</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Question"}
        </button>
      </div>
    </form>
  );
}
