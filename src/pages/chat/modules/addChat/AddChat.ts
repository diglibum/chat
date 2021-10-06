import { Button } from "../../../../components/button";
import { Form } from "../../../../components/form";
import { Input } from "../../../../components/input";
import { InputType, InputValidationType } from "../../../../components/input/types";
import { Block } from "../../../../modules/Block";
import { Templator } from "../../../../modules/Templator";
import { Props } from "../../../../types";
import addChatTmpl from "./addChat.tmpl";
import "./addChat.scss";
import { formValidation } from "../../../../components/form/utils";
import { Popup } from "../../../../components/popup/Popup";
import ChatController from "../../../../controllers/ChatController";

export class AddChat extends Block {
  constructor (props: Props = {}) {
    super("div", props);
  }

  render () {
    const tmpl = new Templator(addChatTmpl);
    const input = new Input({
      name: "title",
      text: "Название",
      type: InputType.TEXT,
      validationType: InputValidationType.SHORT_TEXT,
      events: {
        focus: (event: Event) => {
          formValidation(event);
        },
        blur: (event: Event) => {
          formValidation(event);
        },
        input: (event: Event) => {
          formValidation(event);
        }
      }
    });

    const button = new Button({
      text: "Добавить",
      className: "add-chat-name__button"
    });

    const context = {
      input,
      button
    };

    const form = new Form({
      name: "addChatForm",
      body: tmpl.compile(context)
    });

    const popup = new Popup({
      className: "add-chat__popup",
      title: "Добавить чат",
      body: form
    });

    const fragment = popup.getContent() as DocumentFragment;
    const htmlForm = fragment.querySelector("form");
    htmlForm!.addEventListener("submit", (e) => {
      e.preventDefault();
      ChatController.createChat(htmlForm!);
    });
    return fragment;
  }
}
