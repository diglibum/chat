import { Templator } from "../../../../modules/Templator";
import loginTmpl from "./login.tmpl";
import "./login.scss";
import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";
import { Form } from "../../../../components/form";
import { submitFormData, formValidation } from "../../../../components/form/utils";
import { Block } from "../../../../modules/Block";
import { Props } from "../../../../types";
import { InputType, InputValidationType } from "../../../../components/input/types";

export class Login extends Block {
  constructor (props: Props = {}) {
    super("div", props);
  }

  render () {
    const tmpl = new Templator(loginTmpl);

    const loginInput = new Input({
      name: "login",
      text: "Логин",
      className: "input_with-label",
      required: true,
      validationType: InputValidationType.LOGIN,
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

    const passwordInput = new Input({
      name: "password",
      text: "Пароль",
      type: InputType.PASSWORD,
      validationType: InputValidationType.PASSWORD,
      required: true,
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
      text: "Авторизоваться"
    });

    const context = {
      loginInput,
      passwordInput,
      button: btn
    };

    const form = new Form({
      name: "loginForm",
      body: tmpl.compile(context),
      events: {
        submit: (event: Event) => {
          submitFormData(event);
        }
      },
      settings: {
        withInternalID: true
      },
      novalidate: true
    });

    return form.getContent();
  }
}
