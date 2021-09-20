import { Props } from "../../types";

export enum ButtonType {
  SUBMIT = "submit",
  BUTTON = "button",
  RESET = "reset"
}

export interface ButtonProps extends Props{
    className?: string,
    text?: string,
    disabled?: boolean,
    type?: ButtonType
  }
