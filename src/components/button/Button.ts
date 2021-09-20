import { Templator } from "../../modules/Templator";
import "./button.scss";
import buttonTmpl from "./button.tmpl";
import { Block } from "../../modules/Block";
import { ButtonProps } from "./types";

export class Button extends Block {
  constructor (props: ButtonProps) {
    super("div", props);
  }

  render () {
    const { className, text, type = "submit", disabled = false } = <ButtonProps> this.props;
    const id = this.getId();
    const tmpl = new Templator(buttonTmpl);
    const context = { className, text, type, disabled, id };
    return tmpl.compile(context);
  }
}
