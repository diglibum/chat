import { Props } from "../../types";

export enum InputType {
  HIDDEN = "hidden",
  PASSWORD = "password",
  TEXT = "text",
  EMAIL = "email",
  TEL = "tel",
}

export enum InputValidationType {
  LOGIN = "login",
  PASSWORD = "password",
  EMAIL = "email",
  NAME = "name",
  PHONE = "phone",
  TEXT = "text",
  EQUAL = "equal",
  SHORT_TEXT = "shortText",
}
export interface InputProps extends Props {
  isProfile?: boolean;
  name?: string;
  text?: string;
  required?: boolean;
  value?: string;
  disabled?: boolean;
  errorMessage?: string;
  type?: InputType;
  validationType?: InputValidationType;
  className?: string;
}
