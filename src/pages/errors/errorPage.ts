import { Templator } from "../../modules/templator";
import errorPageTmpl from "./error.tmpl";
import "./error.scss";
import { Block } from "../../modules/block";
import { Props } from "../../types";

export class ErrorPage extends Block {
  constructor(props: Props = {}) {
    super("div", props);
  }

  render() {
    const { inner } = this.props;
    const tmpl = new Templator(errorPageTmpl);
    let context = {};

    switch (inner) {
      case "404":
        context = {
          errorCode: "404",
          errorText: "Не туда попали",
        };
        break;
      case "500":
        context = {
          errorCode: "500",
          errorText: "Мы уже фиксим",
        };
        break;
    }

    return tmpl.compile(context);
  }
}
