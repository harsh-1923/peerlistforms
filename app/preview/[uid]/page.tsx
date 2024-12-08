"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FormDataProps, Question, QuestionType } from "@/types/FormTypes";
import { toast } from "sonner";

const PreviewPage = () => {
  const { uid } = useParams();
  const [formData, setFormData] = useState<FormDataProps | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!uid) return;
    const savedData = localStorage.getItem(`formData_${uid}`);
    if (savedData) {
      const parsed = JSON.parse(savedData) as FormDataProps;
      setFormData(parsed);
    } else {
      console.warn("No form data found for this UID.");
    }
  }, [uid]);

  if (!formData) {
    return <div className="w-screen h-screen p-6">Loading...</div>;
  }

  const handleInputChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    if (!uid) return;

    const newResponse = {
      createdAt: Date.now(),
      answers,
    };

    const existingResponsesStr = localStorage.getItem(`responses_${uid}`);
    let existingResponses: Array<{
      createdAt: number;
      answers: Record<string, string>;
    }> = [];
    if (existingResponsesStr) {
      existingResponses = JSON.parse(existingResponsesStr);
    }

    existingResponses.push(newResponse);

    localStorage.setItem(`responses_${uid}`, JSON.stringify(existingResponses));

    setAnswers({});
    toast.success("Response saved!");
  };

  const totalQuestions = formData.question.length;
  const answeredCount = Object.values(answers).filter(
    (val) => val && val.trim() !== ""
  ).length;
  const progress = totalQuestions > 0 ? answeredCount / totalQuestions : 0;

  return (
    <div className="w-screen h-screen space-y-4 flex flex-col items-center bg-gray-50">
      <div className="max-w-[800px] w-full border-[1px] border-gray-200 p-4 bg-white flex-1 overflow-auto">
        <div className="flex items-start justify-between gap-2 mb-6">
          <h2 className="text-base font-semibold">{formData.title}</h2>
          <FormCompletenessStatus progress={progress} />
        </div>
        <div className="space-y-4">
          {formData.question.map((q) => (
            <QuestionViewer
              key={q.id}
              question={q}
              value={answers[q.id] ?? ""}
              onChange={(val) => handleInputChange(q.id, val)}
            />
          ))}
        </div>
      </div>
      <div className="w-full max-w-[800px] flex justify-end gap-2 p-4 bg-white border-t">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

interface QuestionViewerProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}

const QuestionViewer = ({ question, value, onChange }: QuestionViewerProps) => {
  const renderInput = () => {
    switch (question.type) {
      case QuestionType.ShortAnswer:
        return (
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Your answer"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case QuestionType.LongAnswer:
        return (
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Your answer"
            rows={4}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case QuestionType.SingleSelect:
        return (
          <div className="space-y-2">
            {question.options?.map((opt, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={question.id}
                  value={opt}
                  checked={value === opt}
                  onChange={() => onChange(opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );
      case QuestionType.DATE:
        return (
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case QuestionType.URL:
        return (
          <input
            type="url"
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="https://example.com"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full border-[1px] border-gray-200 rounded-2xl p-4 space-y-2 bg-white">
      <h2 className="font-medium">{question.title}</h2>
      {question.helpText && question.helpText !== "" && (
        <p className="text-sm text-gray-400">{question.helpText}</p>
      )}
      {renderInput()}
    </div>
  );
};

const FormCompletenessStatus = ({ progress }: { progress: number }) => {
  return (
    <div>
      <p className="text-sm">
        Form completeness — {Math.round(progress * 100)}%
      </p>
    </div>
  );
};

export default PreviewPage;
