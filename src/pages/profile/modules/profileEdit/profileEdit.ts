import { Templator } from "../../../../modules/templator";
import profileEditTmpl from "./profileEdit.tmpl";
import "./profileEdit.scss";
import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";
import { Form } from "../../../../components/form";
import { formValidation } from "../../../../components/form/utils";
import { Block } from "../../../../modules/block";
import { Props } from "../../../../types";
import Store from "../../../../modules/store";
import {
  InputType,
  InputValidationType,
} from "../../../../components/input/types";
import { usersController } from "../../../../controllers/usersController";
import { Router } from "../../../../modules/router";

export class ProfileEdit extends Block {
  private controller = usersController;

  constructor(props: Props = {}) {
    super("div", props);
    Store.registerEvent(this.reRender, this);
  }

  render() {
    const tmpl = new Templator(profileEditTmpl);
    const user = Store.getState("user");

    const mailInput = new Input({
      name: "email",
      text: "Почта",
      value: user ? user.email : "",
      required: true,
      type: InputType.EMAIL,
      validationType: InputValidationType.EMAIL,
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
        },
      },
    });

    const loginInput = new Input({
      name: "login",
      text: "Логин",
      value: user ? user.login : "",
      required: true,
      validationType: InputValidationType.LOGIN,
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
        },
      },
    });

    const firstNameInput = new Input({
      name: "first_name",
      text: "Имя",
      value: user ? user.first_name : "",
      required: true,
      validationType: InputValidationType.NAME,
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
        },
      },
    });

    const secondNameInput = new Input({
      name: "second_name",
      text: "Фамилия",
      value: user ? user.second_name : "",
      validationType: InputValidationType.NAME,
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
        },
      },
    });

    const displayNameInput = new Input({
      name: "display_name",
      text: "Имя в чате",
      value: user ? user.display_name : "",
      validationType: InputValidationType.NAME,
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
        },
      },
    });

    const phoneInput = new Input({
      name: "phone",
      text: "Телефон",
      value: user ? user.phone : "",
      type: InputType.TEL,
      required: true,
      validationType: InputValidationType.PHONE,
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
        },
      },
    });

    const btn = new Button({ text: "Сохранить" });

    const context = {
      mailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      displayNameInput,
      phoneInput,
      button: btn,
    };

    const form = new Form({
      name: "profileEditForm",
      body: tmpl.compile(context),
      novalidate: true,
    });

    const fragment = form.getContent();
    const htmlForm = (<HTMLElement>fragment).querySelector(
      ".form"
    )! as HTMLFormElement;
    const router = new Router();

    htmlForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.controller.changeProfile(htmlForm)) {
        router.go("/settings");
      }
    });

    return fragment;
  }
}
