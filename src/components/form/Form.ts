import { Templator } from "../../modules/Templator";
import "./form.scss";
import formTmpl from "./form.tmpl";
import { Block } from "../../modules/block";
import { Props } from "../../types";

export class Form extends Block {
  constructor (props: Props) {
    super("div", props);
  }

  render () {
    const { name, body, autocomplete = "on", novalidate = true } = this.props;
    const id = this.getId();
    const tmpl = new Templator(formTmpl);
    const context = { name, body, autocomplete, id, novalidate };
    return tmpl.compile(context);
  }
}
