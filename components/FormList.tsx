"use client";
import { FormDataProps } from "@/types/FormTypes";
import Link from "next/link";
import { useEffect, useState } from "react";
import FormNotFound from "./FormNotFound";
import { useAppContext } from "@/context/AppContext";

interface ExtendedFormDataProps extends FormDataProps {
  responseCount: number;
}

const FormList = () => {
  const [forms, setForms] = useState<ExtendedFormDataProps[]>([]);
  const { savedForms } = useAppContext();

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

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Created Forms</h2>
      {forms.length === 0 ? (
        <FormNotFound />
      ) : (
        <ul className="space-y-2">
          {forms.map((f) => (
            <FormItem form={f} key={f.uid} />
          ))}
        </ul>
      )}
    </div>
  );
};

const FormItem = ({ form }: { form: ExtendedFormDataProps }) => {
  return (
    <li className="w-full rounded-md overflow-hidden">
      <div className="w-full bg-gray-50 p-2">
        <p className="text-sm font-medium">{form.title}</p>
        <div className="flex w-full items-center justify-between gap-2 py-1">
          <small className="text-gray-600">
            {form.question.length} Questions
          </small>
          <small>{form.status}</small>
        </div>
        <div className="flex w-full items-center justify-between gap-2 py-1">
          <small className="text-gray-600">
            {form.responseCount} Responses
          </small>
        </div>

        <div className="w-full flex items-center justify-between gap-2 text-sm pt-2">
          <Link href={`/response/${form.uid}`}>Check Responses</Link>
          <Link href={`/preview/${form.uid}`}>See Preview</Link>
          <Link href={`/editor/${form.uid}`}>Editor</Link>
        </div>
      </div>
    </li>
  );
};

export default FormList;
