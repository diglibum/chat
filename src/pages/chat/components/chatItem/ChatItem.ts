import * as Handlebars from "handlebars";
import "./chatItem.scss";
import chatItemTmpl from "./chatItem.tmpl";
import { Block } from "../../../../modules/Block";
import { Props } from "../../../../types";
import { dataTimeFormat } from "../../../../utils";

export class ChatItem extends Block {
  constructor (props: Props) {
    super("div", props);
  }

  render () {
    const { title, avatar, unread_count: unreadCount, last_message: { content, time } } = this.props; // TODO
    const tmpl = Handlebars.compile(chatItemTmpl);
    const context = {
      title,
      time: dataTimeFormat(time),
      avatar,
      unreadCount,
      message: content
    };

    return tmpl(context);
  }
}
