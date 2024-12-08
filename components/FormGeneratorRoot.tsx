"use client";
import { useEffect, useRef, useState } from "react";
import { Reorder } from "motion/react";
import InlineEditableField from "./InlineEditableHeader";
import TopRightArrow from "./icons/TopRightArrow";
import AddQuestionButton from "./AddQuestionButton";
import {
  FormDataProps,
  FormStatus,
  Question,
  QuestionType,
} from "@/types/FormTypes";
import { v4 as uuidv4 } from "uuid";
import QuestionEditor from "./QuestionEditor";
import Draft from "./icons/Draft";
import Tick from "./icons/Tick";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Drawer } from "vaul";
import FormList from "./FormList";
import Menu from "./icons/Menu";

const FORM_INDEX_KEY = "formIndex";
interface FormGeneratorRootProps {
  selectedFormUid?: string | null;
}

const FormGeneratorRoot = ({ selectedFormUid }: FormGeneratorRootProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataProps>({
    title: "Untitled Form",
    question: [],
    uid: uuidv4(),
    createdAt: Date.now().toString(),
    status: FormStatus.DRAFT,
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedFormUid) {
      const savedFormData = localStorage.getItem(`formData_${selectedFormUid}`);
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData) as FormDataProps;
        setFormData(parsedData);
        setQuestions(parsedData.question || []);
      }
    } else {
      setFormData({
        title: "Untitled Form",
        question: [],
        uid: uuidv4(),
        createdAt: Date.now().toString(),
        status: FormStatus.DRAFT,
      });
      setQuestions([]);
    }
  }, [selectedFormUid]);

  const handleFormTitleUpdate = (newText: string) => {
    setFormData((prev) => ({ ...prev, title: newText }));
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, question: questions }));
  }, [questions]);

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: uuidv4(),
      type,
      title: "Write a question",
      helpText: "Write a help text or caption (leave empty if not needed).",
      options: ["Option 1"],
      value: "",
      required: false,
    };
    setQuestions((prev) => [...prev, newQuestion]);
    ref.current?.scrollIntoView();
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, updatedQuestion: Question) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? updatedQuestion : q))
    );
  };

  const saveForm = (status: FormStatus) => {
    // Update the form status before saving
    const updatedFormData = { ...formData, status };
    const { uid } = updatedFormData;

    const indexStr = localStorage.getItem(FORM_INDEX_KEY);
    const formUids: string[] = indexStr ? JSON.parse(indexStr) : [];

    if (!formUids.includes(uid)) {
      formUids.push(uid);
    }

    localStorage.setItem(FORM_INDEX_KEY, JSON.stringify(formUids));
    localStorage.setItem(`formData_${uid}`, JSON.stringify(updatedFormData));
    setFormData(updatedFormData);
    generateToast(updatedFormData.status);
  };

  const generateToast = (status: FormStatus) => {
    switch (status) {
      case FormStatus.DRAFT:
        return toast.success("Saved as draft");
      case FormStatus.PUBLISHED:
        return toast.success("Form published");
      default:
        return null;
    }
  };

  const handlePreview = () => {
    saveForm(FormStatus.DRAFT);
    router.push(`/preview/${formData.uid}`);
  };

  const handlePublish = () => {
    saveForm(FormStatus.PUBLISHED);
  };

  return (
    <div className="min-h-screen w-full relative">
      <div className="px-6 py-4 flex items-center justify-between gap-4 border-b-[1px] border-gray-200 sticky top-0 bg-white z-[2]">
        <div className="flex items-center gap-2 w-full">
          <T />
          <InlineEditableField
            initialText={formData.title}
            onSave={handleFormTitleUpdate}
            style="font-semibold"
          />
        </div>

        <button
          className="text-gray-400 font-semibold border-gray-200"
          onClick={handlePreview}
        >
          Preview
          <TopRightArrow />
        </button>
      </div>

      <div
        className="p-6 space-y-4 overflow-scroll"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        <Reorder.Group
          as="div"
          axis="y"
          values={questions}
          onReorder={setQuestions}
          className="space-y-4"
          layoutScroll
        >
          {questions.map((question) => (
            <QuestionEditor
              key={question.id}
              question={question}
              updateQuestion={updateQuestion}
              removeQuestion={removeQuestion}
            />
          ))}
        </Reorder.Group>
        <div
          className="flex flex-col items-center gap-4 p-6 pb-[190px]"
          ref={ref}
        >
          <AddQuestionButton addQuestion={addQuestion} />
        </div>
      </div>

      <div className="w-full h-16 flex items-center justify-between gap-2 py-4 px-6 bg-gray-100 sticky bottom-0">
        <button
          onClick={() => saveForm(FormStatus.DRAFT)}
          className="bg-white text-sm font-medium gap-1"
        >
          <Draft />
          Save as draft
        </button>
        <button
          onClick={handlePublish}
          className="bg-[#00AA45] text-white text-sm font-semibold gap-1"
        >
          <Tick />
          Publish form
        </button>
      </div>
    </div>
  );
};

const T = () => {
  return (
    <div className="t">
      <Drawer.Root direction="left">
        <Drawer.Trigger className="" asChild>
          <button className="p-0 rounded-sm text-gray-500">
            <Menu />
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[5]" />
          <Drawer.Content
            className="left-2 top-2 bottom-2 fixed z-10 outline-none w-[310px] flex"
            style={
              {
                "--initial-transform": "calc(100% + 8px)",
              } as React.CSSProperties
            }
          >
            <div className="bg-white h-full w-full grow p-4 flex flex-col rounded-[16px]">
              <FormList />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default FormGeneratorRoot;
