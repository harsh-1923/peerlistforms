import Date from "@/components/icons/Date";
import LongAnswer from "@/components/icons/LongAnswer";
import ShortAnswer from "@/components/icons/ShortAnswer";
import SingleSelect from "@/components/icons/SingleSelect";
import URL from "@/components/icons/URL";
import { QuestionType } from "@/types/FormTypes";

export const getQuestionTypeIcon = (type: QuestionType) => {
  switch (type) {
    case QuestionType.ShortAnswer:
      return <ShortAnswer />;
    case QuestionType.LongAnswer:
      return <LongAnswer />;
    case QuestionType.DATE:
      return <Date />;
    case QuestionType.SingleSelect:
      return <SingleSelect />;
    case QuestionType.URL:
      return <URL />;
  }
};
