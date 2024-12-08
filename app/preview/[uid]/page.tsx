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
    const requiredQuestions = formData.question.filter((q) => q.required);
    const unansweredRequired = requiredQuestions.find(
      (q) => !answers[q.id] || answers[q.id].trim() === ""
    );
    if (unansweredRequired) {
      toast.error(
        `Please fill out the required question: "${unansweredRequired.title}"`
      );
      return;
    }
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
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="max-w-[800px] w-full border-[1px] border-gray-200 bg-white flex-1 overflow-auto">
        <div className="flex items-start justify-between gap-2 mb-6 p-6">
          <h2 className="text-base font-semibold">{formData.title}</h2>
          <FormCompletenessStatus progress={progress} />
        </div>
        <div className="p-6 space-y-8">
          {formData.question.map((q) => (
            <QuestionViewer
              key={q.id}
              question={q}
              value={answers[q.id] ?? ""}
              onChange={(val) => handleInputChange(q.id, val)}
            />
          ))}
        </div>
        <div className="w-full flex justify-end gap-2 p-4">
          <button
            onClick={handleSubmit}
            className="bg-[#00AA45] text-white text-sm font-semibold gap-1 shadow-sm px-4"
          >
            Submit
          </button>
        </div>
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
            className="w-full border border-gray-300 rounded-lg p-2 shadow-sm"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case QuestionType.LongAnswer:
        return (
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 shadow-sm"
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
    <div className="w-full rounded-2xl space-y-2 bg-white">
      <h2 className="font-semibold text-sm">
        {question.title}{" "}
        {question.required && <span className="text-red-500">*</span>}
      </h2>
      {/* {question.helpText && question.helpText !== "" && (
        <p className="text-sm text-gray-400">{question.helpText}</p>
      )} */}
      {renderInput()}
    </div>
  );
};

const FormCompletenessStatus = ({ progress }: { progress: number }) => {
  return (
    <div>
      <p className="text-sm text-right">
        Form completeness — {Math.round(progress * 100)}%
      </p>
      <div className="relative w-[200px] h-2 rounded-xl bg-red-100 overflow-clip">
        <div
          className="absolute inset-0 bg-[#00af45] progress-bar"
          style={{ width: `${progress * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PreviewPage;
