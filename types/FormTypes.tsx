export enum QuestionType {
  ShortAnswer = "SHORT_ANSWER",
  LongAnswer = "LONG_ANSWER",
  SingleSelect = "SINGLE_SELECT",
  DATE = "DATE",
  URL = "URL",
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  helpText: string;
  options?: string[];
  value?: string;
}

export enum FormStatus {
  DRAFT = "Draft",
  PUBLISHED = "Published",
}

export interface FormDataProps {
  title: string;
  question: Question[];
  uid: string;
  createdAt: string;
  status: FormStatus;
}
