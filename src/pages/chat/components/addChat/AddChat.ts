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
      validationType: InputValidationType.NAME,
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
    const fragment = form.getContent();
    return fragment;
  }
}
