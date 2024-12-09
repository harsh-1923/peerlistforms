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
import { useAppContext } from "@/context/AppContext";
import { motion } from "motion/react";
import IslandTrigger from "./IslandTrigger";

const FORM_INDEX_KEY = "formIndex";
export const DEFAULT_HELP_TEXT =
  "Write a help text or caption (leave empty if not needed).";

interface FormGeneratorRootProps {
  uid?: string;
}

const FormGeneratorRoot = ({ uid: propUid }: FormGeneratorRootProps) => {
  const router = useRouter();
  const { currentFormUID, setUID, setSavedForms } = useAppContext();

  const [formData, setFormData] = useState<FormDataProps>({
    title: "Untitled Form",
    question: [],
    uid: "",
    createdAt: Date.now().toString(),
    status: FormStatus.DRAFT,
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [initialFormData, setInitialFormData] = useState<FormDataProps | null>(
    null
  );
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (propUid) {
      setUID(propUid);
    } else if (!currentFormUID) {
      const newUid = uuidv4();
      setUID(newUid);
    }
  }, [propUid, currentFormUID, setUID]);

  useEffect(() => {
    if (!currentFormUID) return;

    const savedFormData = localStorage.getItem(`formData_${currentFormUID}`);
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData) as FormDataProps;
      setFormData(parsedData);
      setQuestions(parsedData.question || []);
      setInitialFormData(parsedData);
    } else {
      const newFormData: FormDataProps = {
        title: "Untitled Form",
        question: [],
        uid: currentFormUID,
        createdAt: Date.now().toString(),
        status: FormStatus.DRAFT,
      };
      setFormData(newFormData);
      setQuestions([]);
      setInitialFormData(newFormData);
    }
  }, [currentFormUID]);

  const isFormDirty = (): boolean => {
    if (!initialFormData) return false;

    const currentForm = { ...formData, question: questions };
    return JSON.stringify(initialFormData) !== JSON.stringify(currentForm);
  };

  useEffect(() => {
    setIsDirty(isFormDirty());
  }, [formData, questions, initialFormData]);

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
      helpText: DEFAULT_HELP_TEXT,
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

  const cleanupQuestions = (questions: Question[]): Question[] => {
    return questions.map((q) => {
      if (q.helpText === DEFAULT_HELP_TEXT) {
        return { ...q, helpText: "" };
      }
      return q;
    });
  };

  const validateForm = (): boolean => {
    if (formData.title.trim() === "Untitled Form") {
      toast.error("Please update the form title before saving.");
      return false;
    }

    if (questions.length === 0) {
      toast.error("Please add at least one question before saving.");
      return false;
    }

    if (questions.some((q) => q.title.trim() === "Write a question")) {
      toast.error("Please update all question titles before saving.");
      return false;
    }

    return true;
  };

  const saveForm = (status: FormStatus) => {
    if (!currentFormUID) return;

    if (!validateForm()) {
      return;
    }

    const cleanedQuestions = cleanupQuestions(formData.question);
    const updatedFormData = {
      ...formData,
      question: cleanedQuestions,
      status,
      uid: currentFormUID,
    };

    const indexStr = localStorage.getItem(FORM_INDEX_KEY);
    const formUids: string[] = indexStr ? JSON.parse(indexStr) : [];

    if (!formUids.includes(currentFormUID)) {
      formUids.push(currentFormUID);
    }

    localStorage.setItem(FORM_INDEX_KEY, JSON.stringify(formUids));
    localStorage.setItem(
      `formData_${currentFormUID}`,
      JSON.stringify(updatedFormData)
    );

    setFormData(updatedFormData);
    setQuestions(cleanedQuestions);
    setSavedForms(formUids);
    setInitialFormData(updatedFormData); // Update initial form data
    setIsDirty(false);
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
    if (!currentFormUID) return;

    if (!validateForm()) {
      return;
    }

    const currentStatus = formData.status;
    const statusToSave =
      currentStatus === FormStatus.PUBLISHED
        ? FormStatus.PUBLISHED
        : FormStatus.DRAFT;
    saveForm(statusToSave);
    router.push(`/preview/${currentFormUID}`);
  };

  const handlePublish = () => {
    if (!validateForm()) {
      return;
    }

    saveForm(FormStatus.PUBLISHED);
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="sticky top-0 z-[2] bg-white border-b border-gray-200 h-[var(--top-bar-height)] flex items-center justify-between gap-2 p-6">
        <div className="flex items-center gap-2 w-full">
          <IslandTrigger />
          <InlineEditableField
            initialText={formData.title}
            onSave={handleFormTitleUpdate}
            style="font-semibold"
          />
        </div>

        <button
          className="text-gray-400 font-semibold border-gray-200 flex items-center gap-1"
          onClick={handlePreview}
        >
          Preview
          <TopRightArrow />
        </button>

        {isDirty && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            className="absolute bottom-[-10px] text-xs px-2 bg-red-100 text-red-700 p-[1px] border-[1px] border-red-300 rounded-xl"
          >
            Unsaved changes, Save as draft or Publish
          </motion.div>
        )}
      </header>
      <main className="flex-grow overflow-auto p-6">
        {questions.length === 0 ? (
          <EmptyQuestionState />
        ) : (
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
        )}

        <div className="flex flex-col items-center gap-4 p-6" ref={ref}>
          <AddQuestionButton addQuestion={addQuestion} />
        </div>
      </main>
      <footer className="sticky bottom-0 z-[2] bg-gray-100 border-t p-6 border-gray-200 h-[var(--bottom-bar-height)] flex items-center justify-between gap-2">
        <button
          onClick={() => saveForm(FormStatus.DRAFT)}
          className="bg-white text-sm font-medium gap-1 flex items-center"
        >
          <Draft />
          Save as draft
        </button>
        <button
          onClick={handlePublish}
          className="bg-[#00AA45] text-white text-sm font-semibold gap-1 flex items-center"
        >
          <Tick />
          Publish form
        </button>
      </footer>
    </div>
  );
};

const EmptyQuestionState = () => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0, filter: "blur(8px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      exit={{ y: 10, opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.3 }}
      className="outline-gray-100 outline-[1px] outline w-full p-6 rounded-lg bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100/80 z-[1px]"></div>
      <div className="w-2/3 h-4 bg-gray-100 rounded-md mb-4"></div>
      <div className="w-full h-10 bg-gray-100 rounded-md"></div>

      <div className="absolute bottom-0 left-0 w-full p-2 text-center">
        <p className="font-medium text-sm font-serif italic text-brand">
          No questions added yet
        </p>
        <p className="font-medium text-xs font-serif italic text-gray-500">
          Create a form and share with the world
        </p>
      </div>
    </motion.div>
  );
};

export default FormGeneratorRoot;
