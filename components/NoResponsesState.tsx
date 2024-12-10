import { FormDataProps } from "@/types/FormTypes";
import { FileSpreadsheet } from "lucide-react";
import React from "react";

const NoResponsesState = ({ formData }: { formData: FormDataProps }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-hidden">
        <table className="w-full border-collapse bg-white text-sm">
          <thead>
            <tr>
              <th className="border-b border-gray-200 p-4 text-left font-medium text-gray-500">
                Created At
              </th>
              {formData.question.map((q) => (
                <th
                  key={q.id}
                  className="border-b border-gray-200 p-4 text-left font-medium text-gray-500"
                >
                  {q.title}
                </th>
              ))}
              <th className="border-b border-gray-200 p-4 text-left font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border-b border-gray-200 p-4">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </td>
                {formData.question.map((q) => (
                  <td key={q.id} className="border-b border-gray-200 p-4">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                  </td>
                ))}
                <td className="border-b border-gray-200 p-4">
                  <div className="h-4 w-4 bg-gray-200 rounded mx-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <FileSpreadsheet className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-1 italic font-serif">
          No responses yet
        </h3>
        <p className="text-sm text-gray-500">
          Responses will appear here once they start coming in.
        </p>
      </div>
    </div>
  );
};

export default NoResponsesState;
