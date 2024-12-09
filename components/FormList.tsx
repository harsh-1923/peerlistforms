"use client";
import { FormDataProps, FormStatus } from "@/types/FormTypes";
import Link from "next/link";
import { useEffect, useState } from "react";
import FormNotFound from "./FormNotFound";
import { useAppContext } from "@/context/AppContext";
import { FileSpreadsheet, Eye, FileEdit, Share2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ExtendedFormDataProps extends FormDataProps {
  responseCount: number;
}

const FormList = () => {
  const [forms, setForms] = useState<ExtendedFormDataProps[]>([]);
  const { savedForms, setSavedForms } = useAppContext();

  useEffect(() => {
    if (savedForms.length === 0) {
      setForms([]);
      return;
    }

    const loadedForms: ExtendedFormDataProps[] = [];
    for (const uid of savedForms) {
      const formDataStr = localStorage.getItem(`formData_${uid}`);
      if (formDataStr) {
        const formData = JSON.parse(formDataStr) as FormDataProps;
        const responseDataStr = localStorage.getItem(`responses_${uid}`);
        const responses = responseDataStr ? JSON.parse(responseDataStr) : [];
        const responseCount = Array.isArray(responses) ? responses.length : 0;

        loadedForms.push({ ...formData, responseCount });
      }
    }

    setForms(loadedForms);
  }, [savedForms]);

  const handleDelete = (uid: string) => {
    toast.custom(
      () => (
        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
          <div className="p-4 flex-1">
            <p className="text-sm text-gray-700">
              Are you sure you want to delete this form?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => {
                  localStorage.removeItem(`formData_${uid}`);
                  localStorage.removeItem(`responses_${uid}`);
                  const updatedSavedForms = savedForms.filter(
                    (id) => id !== uid
                  );
                  localStorage.setItem(
                    "formIndex",
                    JSON.stringify(updatedSavedForms)
                  );
                  setSavedForms(updatedSavedForms);
                  toast.dismiss();
                  toast.success("Form deleted successfully.");
                }}
              >
                Confirm
              </button>
              <button
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={() => {
                  toast.dismiss();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ),
      {
        duration: 5000,
      }
    );
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Created Forms</h2>
      {forms.length === 0 ? (
        <FormNotFound />
      ) : (
        <ul className="space-y-4">
          {forms.map((form) => (
            <li key={form.uid}>
              <FormItem form={form} onDelete={handleDelete} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FormItem = ({
  form,
  onDelete,
}: {
  form: ExtendedFormDataProps;
  onDelete: (uid: string) => void;
}) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-md shadow-sm">
      <div className="p-3 space-y-2">
        <div className="flex justify-between h-6 items-center">
          <h3 className="text-sm font-normal truncate">{form.title}</h3>
          <button
            className="h-6 hover:bg-gray-50 p-2 rounded-full"
            onClick={() => {
              // Handle share if needed
            }}
          >
            <Share2
              size={14}
              className="flex flex-col items-center justify-center text-gray-600"
            />
          </button>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              form.status === FormStatus.PUBLISHED
                ? "bg-green-200 text-green-800"
                : "bg-gray-100 text-neutral-700"
            }`}
          >
            {form.status}
          </span>
          <button
            className="hover:bg-red-50 p-1 rounded-full"
            onClick={() => onDelete(form.uid)}
          >
            <Trash2 className="h-4 w-4 text-red-500 " />
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs">
          <span>{form.responseCount} Responses</span>
          <span>{form.question.length} Questions</span>
        </div>
      </div>

      <div className="grid grid-cols-3 text-xs">
        <Link
          href={`/response/${form.uid}`}
          className="p-2 flex flex-col items-center justify-center text-gray-600 hover:bg-gray-50 rounded-sm"
        >
          <FileSpreadsheet className="h-4 w-4" />
          <span className="text-xs mt-1">Responses</span>
        </Link>
        <Link
          href={`/preview/${form.uid}`}
          className="p-2 flex flex-col items-center justify-center text-gray-600 hover:bg-gray-50 rounded-sm"
        >
          <Eye className="h-4 w-4" />
          <span className="text-xs mt-1">Preview</span>
        </Link>
        <Link
          href={`/editor/${form.uid}`}
          className="p-2 flex flex-col items-center justify-center text-gray-600 hover:bg-gray-50 rounded-sm"
        >
          <FileEdit className="h-4 w-4" />
          <span className="text-xs mt-1">Edit</span>
        </Link>
      </div>
    </div>
  );
};

export default FormList;
