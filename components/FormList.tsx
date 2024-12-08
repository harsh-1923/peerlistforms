"use client";
import { FormDataProps } from "@/types/FormTypes";
import Link from "next/link";
import { useEffect, useState } from "react";

const FormList = () => {
  const [forms, setForms] = useState<FormDataProps[]>([]);

  useEffect(() => {
    const indexStr = localStorage.getItem("formIndex");
    if (!indexStr) return;

    const uids = JSON.parse(indexStr) as string[];

    const loadedForms: FormDataProps[] = [];
    for (const uid of uids) {
      const formDataStr = localStorage.getItem(`formData_${uid}`);
      if (formDataStr) {
        const formData = JSON.parse(formDataStr) as FormDataProps;
        loadedForms.push(formData);
      }
    }

    setForms(loadedForms);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Created Forms</h2>
      {forms.length === 0 ? (
        <p>No forms found</p>
      ) : (
        <ul className="space-y-2">
          {forms.map((f) => (
            <FormItem form={f} key={f.uid}></FormItem>
          ))}
        </ul>
      )}
    </div>
  );
};

const FormItem = ({ form }: { form: FormDataProps }) => {
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

        <div className="w-full flex items-center justify-between gap-2 text-sm pt-2">
          <Link href={`/response/${form.uid}`}>Check Responses</Link>
          <Link href={`/preview/${form.uid}`}>See Preview</Link>
        </div>
      </div>
    </li>
  );
};

export default FormList;
