import { Props } from "../../types";

export interface FormProps extends Props {
    name?: string,
    body?: any,
    autocomplete?: "on" | "off",
    id?: string,
    novalidate?: boolean
}
