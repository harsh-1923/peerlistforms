import { Question, QuestionType } from "@/types/FormTypes";
import { Reorder, useDragControls, motion } from "motion/react";
import ReorderHandle from "./icons/ReorderHandle";
import InlineEditableField from "./InlineEditableHeader";
import QuestionTypeChanger from "./QuestionTypeChanger";
import SingleSelectOptionEditor from "./SingleSelectOptionEditor";
import Trash from "./icons/Trash";

interface QuestionEditorProps {
  question: Question;
  updateQuestion: (id: string, updatedQuestion: Question) => void;
  removeQuestion: (id: string) => void;
}

const QuestionEditor = ({
  question,
  updateQuestion,
  removeQuestion,
}: QuestionEditorProps) => {
  const dragControls = useDragControls();

  const handleHelpTextSave = (newHelpText: string) => {
    updateQuestion(question.id, { ...question, helpText: newHelpText });
  };

  const handleTitleSave = (newTitle: string) => {
    updateQuestion(question.id, { ...question, title: newTitle });
  };

  const handleQuestionTypeUpdate = (newQuestionType: QuestionType) => {
    updateQuestion(question.id, { ...question, type: newQuestionType });
  };

  const handleOptionsUpdate = (newOptions: string[]) => {
    if (question.type !== QuestionType.SingleSelect) return;
    updateQuestion(question.id, { ...question, options: newOptions });
  };

  const handleRequiredToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuestion(question.id, { ...question, required: e.target.checked });
  };

  const handleDelete = () => {
    // Call the parent-provided remove function
    removeQuestion(question.id);
  };

  return (
    <Reorder.Item
      style={{ userSelect: "none" }}
      value={question}
      id={question.id}
      drag="y"
      dragListener={false}
      dragControls={dragControls}
      className="w-full border-[1px] border-gray-200 rounded-2xl p-4 space-y-2 bg-white"
      layout
      transition={{ type: "spring", bounce: 0, duration: 0.2 }}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
    >
      <motion.div
        layout
        className="w-full flex items-start justify-between gap-4"
      >
        <InlineEditableField
          initialText={question.title}
          onSave={handleTitleSave}
        />
        <div className="flex items-center gap-1">
          <QuestionTypeChanger
            questionType={question.type}
            onUpdate={handleQuestionTypeUpdate}
          />
          <div
            onPointerDown={(e) => dragControls.start(e)}
            className="cursor-grab"
          >
            <ReorderHandle />
          </div>
        </div>
      </motion.div>

      {/* Help Text  */}
      <InlineEditableField
        style="text-sm text-gray-400"
        initialText={question.helpText}
        onSave={handleHelpTextSave}
      />

      {question.type === QuestionType.SingleSelect ? (
        <SingleSelectOptionEditor
          options={question.options}
          onUpdate={handleOptionsUpdate}
        />
      ) : (
        <div
          className={`bg-gray-100 w-full border-[1px] border-gray-200 rounded-lg ${
            question.type === QuestionType.LongAnswer ? "h-16" : "h-8"
          }`}
        ></div>
      )}

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label
            htmlFor={`required-toggle-${question.id}`}
            className="text-sm font-medium"
          >
            Required:
          </label>
          <input
            id={`required-toggle-${question.id}`}
            type="checkbox"
            checked={question.required}
            onChange={handleRequiredToggle}
            className="cursor-pointer"
          />
        </div>
        <button onClick={handleDelete} className="hover:bg-red-100/40">
          <Trash />
        </button>
      </div>
    </Reorder.Item>
  );
};

export default QuestionEditor;
