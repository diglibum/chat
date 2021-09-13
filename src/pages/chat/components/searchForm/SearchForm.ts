import * as Handlebars from "handlebars";
import "./searchForm.scss";
import searchFormTmpl from "./searchForm.tmpl";
import { Block } from "../../../../modules/Block";
import { Props } from "../../../../types";

export class SearchForm extends Block {
  constructor (props: Props) {
    super("div", props);
  }

  render () {
    const { placeholder } = this.props;
    const tmpl = Handlebars.compile(searchFormTmpl);
    const context = { placeholder };
    return tmpl(context);
  }
}
