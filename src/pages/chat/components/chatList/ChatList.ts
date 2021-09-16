import { Templator } from "../../../../modules/Templator";
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
    const tmpl = new Templator(chatListTmpl);
    const context = { items };
    return tmpl.compile(context);
  }
}
