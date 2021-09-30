import { Block } from "../../modules/Block";
import { Props } from "../../types";

export interface PopupProps extends Props{
    title: string,
    body: Block | unknown
  }
