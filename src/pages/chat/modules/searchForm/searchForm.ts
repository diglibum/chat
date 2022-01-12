import { Templator } from "../../../../modules/templator";
import "./searchForm.scss";
import searchFormTmpl from "./searchForm.tmpl";
import { Block } from "../../../../modules/block";
import { Props } from "../../../../types";

export class SearchForm extends Block {
  constructor(props: Props) {
    super("div", props);
  }

  render() {
    const { placeholder } = this.props;
    const tmpl = new Templator(searchFormTmpl);
    const context = { placeholder };
    return tmpl.compile(context);
  }
}
