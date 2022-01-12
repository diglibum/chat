import { Props } from "../../../../types";
import { Block } from "../../../../modules/block";
import { Templator } from "../../../../modules/templator";
import chatMessagetmpl from "./chatMessage.tmpl";
import { dataTimeFormat } from "../../../../utils";
import Store from "../../../../modules/store";
import "./chatMessage.scss";

export class ChatMessage extends Block {
  constructor(props: Props = {}) {
    super("div", props);
  }

  render() {
    const userId = Store.getState("user")?.id;
    const {
      content,
      type,
      time,
      file,
      is_read: isRead,
      user_id: msgUserId,
    } = this.props.message;
    let className: string[] = ["message_text"];
    let imagePath: null | string = null;

    switch (type) {
      case "file":
        className = ["message_image"];
        imagePath = "/resources/" + file?.path + "/" + file?.filename;
        break;
    }

    if (!isRead) {
      className.push("message__received");
    }

    if (msgUserId === userId) {
      className.push("message_my");
    }

    const tmpl = new Templator(chatMessagetmpl);
    const context: Props = {
      content,
      dateTime: dataTimeFormat(time, true),
      className: className.join(" "),
    };
    if (imagePath) {
      context.image = imagePath;
    }
    const fragment = tmpl.compile(context);

    return fragment;
  }
}
