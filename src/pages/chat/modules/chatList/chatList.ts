import { Templator } from "../../../../modules/templator";
import "./chatList.scss";
import chatListTmpl from "./chatList.tmpl";
import { Block } from "../../../../modules/block";
import { Props } from "../../../../types";
import Store from "../../../../modules/store";
import { ChatItem } from "../chatItem";

export class ChatList extends Block {
  constructor (props: Props = {}) {
    super("div", props);
  }

  render () {
    const chats = Store.getState("chats");

    let chatsList: any = [];

    if (chats.length > 0) {
      chatsList = chats.reduce((acc: Block[], chat: any, index: number) => {
        acc[index] = new ChatItem({ chat });
        return acc;
      }, []);
    }
    const tmpl = new Templator(chatListTmpl);
    const context = { chatsList };
    return tmpl.compile(context);
  }
}
