import registrationTmpl from "./registration.tmpl";
import "./registration.scss";
import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";
import { Form } from "../../../../components/form";
import { formValidation } from "../../../../components/form/utils";
import { Block } from "../../../../modules/block";
import { Props } from "../../../../types";
import { Templator } from "../../../../modules/templator";
import {
  InputType,
  InputValidationType,
} from "../../../../components/input/types";
import { authController } from "../../../../controllers/AuthController";
import { Link } from "../../../../modules/link";

export class Registration extends Block {
  private controller = authController;

  constructor(props: Props = {}) {
    super("div", props);
  }

  render() {
    const tmpl = new Templator(registrationTmpl);

    const mailInput = new Input({
      name: "email",
      text: "Почта",
      required: true,
      type: InputType.EMAIL,
      validationType: InputValidationType.EMAIL,
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

    const loginInput = new Input({
      name: "login",
      text: "Логин",
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

    const firstNameInput = new Input({
      name: "first_name",
      text: "Имя",
      required: true,
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
        },
      },
    });

    const secondNameInput = new Input({
      name: "second_name",
      text: "Фамилия",
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
        },
      },
    });

    const phoneInput = new Input({
      name: "phone",
      text: "Телефон",
      type: InputType.TEL,
      validationType: InputValidationType.PHONE,
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

    const button = new Button({
      text: "Зарегистрироваться",
    });

    const regLink = new Link({
      to: "/",
      label: "Войти",
      className: "registration__enter-link",
    });

    const context = {
      mailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
      button,
      regLink,
    };

    const form = new Form({
      name: "registrationForm",
      body: tmpl.compile(context),
    });

    const fragment = form.getContent();
    const htmlForm = (<HTMLElement>fragment).querySelector(
      ".form"
    )! as HTMLFormElement;

    htmlForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      this.controller.signUp(htmlForm);
    });

    return fragment;
  }
}
