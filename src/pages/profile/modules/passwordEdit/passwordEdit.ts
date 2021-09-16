import { Templator } from "../../../../modules/Templator";
import passwordEditTmpl from "./passwordEdit.tmpl";
import "./passwordEdit.scss";
import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";
import { Form } from "../../../../components/form";
import { submitFormData, formValidation } from "../../../../components/form/utils";
import { Block } from "../../../../modules/Block";
import { Props } from "../../../../types";

export class PasswordEdit extends Block {
  constructor (props: Props = {}) {
    super("div", props);
  }

  render () {
    const tmpl = new Templator(passwordEditTmpl);

    const oldPassword = new Input({
      name: "oldPassword",
      text: "Старый пароль",
      type: "password",
      required: true,
      validationType: "password",
      isProfile: true,
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

    const newPassword = new Input({
      name: "newPassword",
      text: "Новый пароль",
      type: "password",
      validationType: "password",
      required: true,
      isProfile: true,
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

    const repeatPassword = new Input({
      name: "repeatPassword",
      text: "Повторите новый пароль",
      type: "password",
      required: true,
      validationType: "password",
      isProfile: true,
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

    const btn = new Button({
      text: "Сохранить"
    });

    const context = {
      oldPassword,
      newPassword,
      repeatPassword,
      button: btn
    };

    const form = new Form({
      name: "passwordEditForm",
      body: tmpl.compile(context),
      events: {
        submit: (event: Event) => {
          submitFormData(event);
        }
      },
      settings: {
        withInternalID: true
      }
    });

    return form.getContent();
  }
}
