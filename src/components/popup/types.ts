import { Block } from "../../modules/block";
import { Props } from "../../types";

export interface PopupProps extends Props {
  title?: string;
  body?: Block | unknown;
  className?: string;
  hidePopup?: boolean;
}

export interface getTokenResponce {
  token: string;
}
