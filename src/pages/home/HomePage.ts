import { Templator } from "../../modules/templator";
import homePageTmpl from "./home.tmpl";
import "./home.scss";
import { Login } from "./modules/login";
import { Registration } from "./modules/registration";
import { Props } from "../../types/props";
import { Block } from "../../modules/block";

export class HomePage extends Block {
  constructor (props: Props) {
    super("div", props);
  }

  render () {
    const { inner } = this.props;
    const tmpl = new Templator(homePageTmpl);
    let context = {};

    switch (inner) {
      case "registration":
        context = { header: "Регистрация", className: "registration", content: new Registration() };
        break;
      default:
        context = { header: "Вход", className: "login", content: new Login() };
        break;
    }
    return tmpl.compile(context);
  }
}
