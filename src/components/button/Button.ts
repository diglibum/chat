import { Templator } from "../../modules/Templator";
import "./button.scss";
import buttonTmpl from "./button.tmpl";
import { Block } from "../../modules/block";
import { Props } from "../../types";

export class Button extends Block {
  constructor (props: Props) {
    super("div", props);
  }

  render () {
    const { className, text, type = "submit", disabled = false } = this.props;
    const id = this.getId();
    const tmpl = new Templator(buttonTmpl);
    const context = { className, text, type, disabled, id };
    return tmpl.compile(context);
  }
}
