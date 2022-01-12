import { Block } from "../../../../modules/block";
import { Templator } from "../../../../modules/templator";
import { Props, Message, MessagesItem } from "../../../../types";
import Store from "../../../../modules/store";
import chatBodyTmpl from "./chatBody.tmpl";
import { ChatMessage } from "../chatMessage";
import "./chatBody.scss";
import { Button } from "../../../../components/button";
import { chatController } from "../../../../controllers/chatController";

export class ChatBody extends Block {
  constructor(props: Props = {}) {
    super("div", props);
  }

  render() {
    const chatId = Store.getState("currentChat")?.id;
    const messages = this.findMessages(chatId);
    if (!messages) chatController.getMessages(chatId, 0);

    const messagesList = messages?.reduce((acc: any[], message: Message) => {
      return [...acc, new ChatMessage({ message })];
    }, []);

    const moreMessagesBtn = new Button({
      className: "button__more-msg",
      text: "Больше сообщений",
    });

    const tmpl = new Templator(chatBodyTmpl);
    const context = {
      moreMessagesBtn,
      messages: messagesList ?? "Нет новых сообщений",
    };

    const fragment = tmpl.compile(context);
    const moreBtn = fragment.querySelector(".button__more-msg");
    moreBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      chatController.getMessages(chatId, messages ? messages.length : 0);
    });

    return fragment;
  }

  private findMessages(chatId: number) {
    const allMmsgs = Store.getState("messages");
    const messages = allMmsgs?.find(
      (item: MessagesItem) => item.id === chatId
    )?.messages;

    return messages;
  }
}
