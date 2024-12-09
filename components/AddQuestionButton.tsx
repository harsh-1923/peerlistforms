import { motion, MotionConfig } from "motion/react";
import { useState } from "react";
import useMeasure from "react-use-measure";
import Plus from "./icons/Plus";
import { QuestionType } from "@/types/FormTypes";
import ShortAnswer from "./icons/ShortAnswer";
import LongAnswer from "./icons/LongAnswer";
import SingleSelect from "./icons/SingleSelect";
import URL from "./icons/URL";
import Date from "./icons/Date";
import { useClickOutside } from "@/hooks/useClickOutside";

const AddQuestionButton = ({
  addQuestion,
}: {
  addQuestion: (type: QuestionType) => void;
}) => {
  const [expanded, setIsExpanded] = useState<boolean>(false);
  const [boundsRef, bounds] = useMeasure();

  // Use the custom hook to close the menu when clicking outside
  const containerRef = useClickOutside(() => setIsExpanded(false));

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}>
      <motion.div
        ref={containerRef}
        animate={{ width: bounds.width, height: bounds.height }}
        className="overflow-hidden border-gray-200 border-[1px] rounded-2xl bg-white"
      >
        {!expanded ? (
          <button ref={boundsRef} onClick={() => setIsExpanded(!expanded)}>
            <Plus /> <p className="inline-block pr-2">Question</p>
          </button>
        ) : (
          <div ref={boundsRef} className="w-[300px] p-1 flex flex-col">
            <div className="h-9 py-2 px-4 flex items-center bg-gray-50 p-1 rounded-lg font-mono">
              <p className="text-xs text-gray-500 font-semibold tracking-wide">
                INPUT TYPES
              </p>
            </div>
            <button
              className="w-full justify-start hover:bg-gray-50 "
              onClick={() => {
                setIsExpanded(!expanded);
                addQuestion(QuestionType.ShortAnswer);
              }}
            >
              <ShortAnswer />
              Short Answer
            </button>
            <button
              className="w-full justify-start hover:bg-gray-50"
              onClick={() => {
                setIsExpanded(!expanded);
                addQuestion(QuestionType.LongAnswer);
              }}
            >
              <LongAnswer />
              Long Answer
            </button>
            <button
              className="w-full justify-start hover:bg-gray-50"
              onClick={() => {
                setIsExpanded(!expanded);
                addQuestion(QuestionType.SingleSelect);
              }}
            >
              <SingleSelect />
              Single Select
            </button>
            <button
              className="w-full justify-start hover:bg-gray-50"
              onClick={() => {
                setIsExpanded(!expanded);
                addQuestion(QuestionType.URL);
              }}
            >
              <URL />
              URL
            </button>
            <button
              className="w-full justify-start hover:bg-gray-50"
              onClick={() => {
                setIsExpanded(!expanded);
                addQuestion(QuestionType.DATE);
              }}
            >
              <Date />
              Date
            </button>
          </div>
        )}
      </motion.div>
    </MotionConfig>
  );
};

export default AddQuestionButton;
