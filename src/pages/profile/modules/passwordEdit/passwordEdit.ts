import { Templator } from "../../../../modules/templator";
import passwordEditTmpl from "./passwordEdit.tmpl";
import "./passwordEdit.scss";
import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";
import { Form } from "../../../../components/form";
import { formValidation } from "../../../../components/form/utils";
import { Block } from "../../../../modules/block";
import { Props } from "../../../../types";
import {
  InputType,
  InputValidationType,
} from "../../../../components/input/types";
import Store from "../../../../modules/store";
import { Router } from "../../../../modules/router";
import { UsersController } from "../../../../controllers/usersController";

export class PasswordEdit extends Block {
  private controller = new UsersController();

  constructor(props: Props = {}) {
    super("div", props);
    Store.registerEvent(this.reRender, this);
  }

  render() {
    const tmpl = new Templator(passwordEditTmpl);

    const oldPassword = new Input({
      name: "oldPassword",
      text: "Старый пароль",
      type: InputType.PASSWORD,
      required: true,
      validationType: InputValidationType.PASSWORD,
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

    const newPassword = new Input({
      name: "newPassword",
      text: "Новый пароль",
      type: InputType.PASSWORD,
      validationType: InputValidationType.PASSWORD,
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
        },
      },
    });

    const repeatPassword = new Input({
      name: "repeatPassword",
      text: "Повторите новый пароль",
      type: InputType.PASSWORD,
      required: true,
      validationType: InputValidationType.EQUAL,
      isProfile: true,
      equal: "newPassword",
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
      text: "Сохранить",
    });

    const context = {
      oldPassword,
      newPassword,
      repeatPassword,
      button: btn,
    };

    const form = new Form({
      name: "passwordEditForm",
      body: tmpl.compile(context),
    });

    const fragment = form.getContent();
    const htmlForm = (<HTMLElement>fragment).querySelector(
      ".form"
    )! as HTMLFormElement;
    const router = new Router();

    htmlForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.controller.changePassword(htmlForm)) {
        router.go("/settings");
      }
    });

    return fragment;
  }
}
