import { Block } from "../../../../modules/Block";
import { Templator } from "../../../../modules/Templator";
import { Props } from "../../../../types";
import chatBodyTmpl from "./chatBody.tmpl";

export class ChatBody extends Block {
  constructor (props: Props = {}) {
    super("div", props);
  }

  render () {
    // ChatController.getAllMessages();
    const tmpl = new Templator(chatBodyTmpl);
    const context = {};

    return tmpl.compile(context);
  }
}
