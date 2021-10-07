import { Block } from "../../../../modules/block";
import { Templator } from "../../../../modules/templator";
import { Props } from "../../../../types";
import chatBodyTmpl from "./chatBody.tmpl";

export class ChatBody extends Block {
  constructor (props: Props = {}) {
    super("div", props);
  }

  render () {
    const tmpl = new Templator(chatBodyTmpl);
    const context = {};

    return tmpl.compile(context);
  }
}
