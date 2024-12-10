"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FormDataProps } from "@/types/FormTypes";
import { Trash2, FileSpreadsheet } from "lucide-react";
import NoResponsesState from "@/components/NoResponsesState";

interface ResponseEntry {
  createdAt: number;
  answers: Record<string, string>;
}

const Page = () => {
  const { uid } = useParams();
  const [formData, setFormData] = useState<FormDataProps | null>(null);
  const [responses, setResponses] = useState<ResponseEntry[]>([]);

  useEffect(() => {
    if (!uid) return;
    const savedFormData = localStorage.getItem(`formData_${uid}`);
    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData) as FormDataProps;
      setFormData(parsedFormData);
    }

    // Load responses
    const savedResponses = localStorage.getItem(`responses_${uid}`);
    if (savedResponses) {
      const parsedResponses = JSON.parse(savedResponses) as ResponseEntry[];
      setResponses(parsedResponses);
    }
  }, [uid]);

  // Handler to delete a response
  const handleDelete = (createdAt: number) => {
    if (confirm("Are you sure you want to delete this response?")) {
      const updatedResponses = responses.filter(
        (response) => response.createdAt !== createdAt
      );
      setResponses(updatedResponses);
      localStorage.setItem(
        `responses_${uid}`,
        JSON.stringify(updatedResponses)
      );
    }
  };

  if (!formData) {
    return (
      <main className="w-full h-full">
        <header className="sticky top-0 z-[2] bg-white border-b border-gray-200 h-[var(--top-bar-height)] flex items-center justify-between gap-2 p-6">
          <div className="text-base font-semibold bg-gray-100 h-4 w-1/4"></div>
        </header>
      </main>
    );
  }

  return (
    <section className="w-full h-full">
      <header className="sticky top-0 z-[2] bg-white border-b border-gray-200 h-[var(--top-bar-height)] flex items-center justify-between gap-2 p-6">
        <h1 className="text-base font-semibold">{formData.title}</h1>
      </header>

      <div className="overflow-auto p-6">
        {responses.length === 0 ? (
          <NoResponsesState formData={formData} />
        ) : (
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Created At</th>
                {formData.question.map((q) => (
                  <th key={q.id} className="border border-gray-300 p-2">
                    {q.title}
                  </th>
                ))}
                <th className="border border-gray-300 p-2"></th>
              </tr>
            </thead>
            <tbody>
              {responses.map((res) => (
                <tr key={res.createdAt} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">
                    {new Date(res.createdAt).toLocaleString()}
                  </td>
                  {formData.question.map((q) => (
                    <td key={q.id} className="border border-gray-300 p-2">
                      {res.answers[q.id] || ""}
                    </td>
                  ))}
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => handleDelete(res.createdAt)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Response"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Page;
