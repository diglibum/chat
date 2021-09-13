import * as Handlebars from "handlebars";
import "./chatList.scss";
import chatListTmpl from "./chatList.tmpl";
import { Block } from "../../../../modules/Block";
import { Props } from "../../../../types";

export class ChatList extends Block {
  constructor (props: Props) {
    super("div", props);
  }

  render () {
    const { items } = this.props;
    const tmpl = Handlebars.compile(chatListTmpl);
    const context = { items };
    return tmpl(context);
  }
}
