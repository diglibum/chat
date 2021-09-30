import { Templator } from "../../modules/Templator";
import inputTmpl from "./input.tmpl";
import inputProfile from "./inputProfile.tmpl";
import { Block } from "../../modules/Block";
import "./input.scss";
import { InputProps, InputType, InputValidationType } from "./types";

export class Input extends Block {
  constructor (props: InputProps) {
    super("div", props);
  }

  render () {
    const {
      isProfile = false,
      name,
      text,
      equal,
      type = InputType.TEXT,
      required = true,
      value,
      disabled = false,
      errorMessage,
      validationType = InputValidationType.TEXT
    } = <InputProps> this.props;

    const id = this.getId();
    const template = (isProfile) ? inputProfile : inputTmpl;
    const tmpl = new Templator(template);
    const context = { type, name, text, required, value, disabled, equal, errorMessage, id, validationType };
    return tmpl.compile(context);
  }
}
