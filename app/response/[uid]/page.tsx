"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FormDataProps } from "@/types/FormTypes";

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

    // Load form data
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

  if (!formData) {
    return (
      <main className="w-screen h-screen flex items-center justify-center">
        <p>Loading form data...</p>
      </main>
    );
  }

  // If there are no responses, show a message
  if (responses.length === 0) {
    return (
      <main className="w-screen h-screen flex items-center justify-center">
        <p>No responses found for this form.</p>
      </main>
    );
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <section className="h-screen flex-[2] border border-gray-400/30 overflow-y-scroll min-w-[600px] max-w-[800px] mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">{formData.title}</h1>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Created At</th>
              {/* Render question titles as headers */}
              {formData.question.map((q) => (
                <th key={q.id} className="border border-gray-300 p-2">
                  {q.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {responses.map((res, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">
                  {new Date(res.createdAt).toLocaleString()}
                </td>
                {/* For each question, show the corresponding answer */}
                {formData.question.map((q) => (
                  <td key={q.id} className="border border-gray-300 p-2">
                    {res.answers[q.id] || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Page;
