import { QuestionType } from "@/types/FormTypes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ChevronDown from "./icons/ChevronDown";
import { getQuestionTypeIcon } from "@/utils/FormGeneratorUtils";

const getFormattedString = (type: any) => {
  return type.split("_").join(" ");
};

const QuestionTypeChanger = ({ questionType, onUpdate }: any) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="p-0 rounded-sm gap-0">
          {getQuestionTypeIcon(questionType)} <ChevronDown />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          data-slide="bottom"
          className="border-[1px] rounded-2xl bg-white border-gray-200 p-2 mt-2 will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
        >
          {Object.values(QuestionType).map((type) => {
            return type !== questionType ? (
              <DropdownMenu.Item key={type} asChild>
                <button
                  key={type}
                  onClick={() => onUpdate(type)}
                  className="w-full hover:bg-gray-50 rounded-md justify-start active:bg-gray-50"
                >
                  {getFormattedString(type)}
                </button>
              </DropdownMenu.Item>
            ) : null;
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
export default QuestionTypeChanger;
