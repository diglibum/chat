import { Templator } from "../../../../modules/templator";
import loginTmpl from "./login.tmpl";
import "./login.scss";
import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";
import { Form } from "../../../../components/form";
import { formValidation } from "../../../../components/form/utils";
import { Block } from "../../../../modules/block";
import { Link } from "../../../../modules/link";
import { Props } from "../../../../types";
import {
  InputType,
  InputValidationType,
} from "../../../../components/input/types";
import { authController } from "../../../../controllers/AuthController";

export class Login extends Block {
  controller = authController;

  constructor(props: Props = {}) {
    super("div", props);
  }

  render() {
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
        },
      },
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
        },
      },
    });

    const btn = new Button({
      text: "Авторизоваться",
    });

    const signUpLink = new Link({
      to: "/sign-up",
      label: "Нет аккаунта?",
      className: "login__registr-link",
    });

    const context = {
      loginInput,
      passwordInput,
      button: btn,
      signUpLink,
    };

    const form = new Form({
      name: "loginForm",
      body: tmpl.compile(context),
      novalidate: true,
    });

    const fragment = form.getContent();
    const htmlForm = (<HTMLElement>fragment).querySelector(
      ".form"
    )! as HTMLFormElement;

    htmlForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      this.controller.signIn(htmlForm);
    });

    return fragment;
  }
}
