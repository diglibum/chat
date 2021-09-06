import Handlebars from "handlebars";
import chatPageTmpl from "./chat.tmpl";
import "./chat.scss";
import { Block } from "../../modules/block";
import { Props } from "../../types/props";

export class ChatPage extends Block {
  constructor (props: Props = {}) {
    super("div", props);
  }

  render () {
    const tmpl = Handlebars.compile(chatPageTmpl);
    const context = {
      content: "Страница в разработке"
    };

    return tmpl(context);
  }
}
