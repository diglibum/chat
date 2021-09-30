import { Block } from "../../../../modules/Block";
import { Templator } from "../../../../modules/Templator";
import { Props } from "../../../../types";
import chatViewTmpl from "./chatView.tmpl";

export class ChatView extends Block {
  constructor (props: Props) {
    super("div", props);
  }

  render () {
    const tmpl = new Templator(chatViewTmpl);
    const context = {

    };
    return tmpl.compile(context);
  }
}
