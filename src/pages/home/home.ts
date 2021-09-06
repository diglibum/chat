import Handlebars from "handlebars";
import homePageTmpl from "./home.tmpl";
import "./home.scss";
import { login } from "./modules/login";
import { registration } from "./modules/registration";
import { Props } from "../../types/props";
import { Block } from "../../modules/block";

export class HomePage extends Block {
  constructor (props: Props) {
    super("div", props);
  }

  render () {
    const { inner } = this.props;
    const tmpl = Handlebars.compile(homePageTmpl);
    let context = {};

    switch (inner) {
      case "registration":
        context = { header: "Регистрация", className: "registration", content: registration };
        break;
      default:
        context = { header: "Вход", className: "login", content: login };
        break;
    }

    return tmpl(context);
  }
}
