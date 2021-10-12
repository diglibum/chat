import { Form } from "../../../../components/form";
import { Block } from "../../../../modules/block";
import { Props } from "../../../../types";
import messageFormTmpl from "./messageForm.tmpl";
import "./messageForm.scss";
import ChatController from "../../../../controllers/chatController";
import Store from "../../../../modules/store";

export class MessageForm extends Block {
  constructor(props: Props = {}) {
    super("div", props);
  }

  render() {
    const form = new Form({
      body: messageFormTmpl,
    });

    const fragment = form.getContent() as DocumentFragment;
    const htmlForm = fragment.querySelector("form");
    htmlForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = (fragment.querySelector("input") as HTMLInputElement)
        .value;
      ChatController.newMessage(
        htmlForm,
        message,
        Store.getState("currentChat")?.id
      );
    });

    return fragment;
  }
}
