import { Templator } from "../../../../modules/Templator";
import profileEditTmpl from "./profileEdit.tmpl";
import "./profileEdit.scss";
import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";
import { Form } from "../../../../components/form";
import { submitFormData, formValidation } from "../../../../components/form/utils";
import { Block } from "../../../../modules/Block";
import { Props } from "../../../../types";

export class ProfileEdit extends Block {
  constructor (props: Props = {}) {
    super("div", props);
  }

  render () {
    const tmpl = new Templator(profileEditTmpl);

    const mailInput = new Input({
      name: "email",
      text: "Почта",
      value: "pochta@yandex.ru",
      required: true,
      type: "email",
      validationType: "email",
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

    const loginInput = new Input({
      name: "login",
      text: "Логин",
      value: "ivanivanov",
      required: true,
      validationType: "login",
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

    const firstNameInput = new Input({
      name: "first_name",
      text: "Имя",
      value: "Иван",
      required: true,
      validationType: "name",
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

    const secondNameInput = new Input({
      name: "second_name",
      text: "Фамилия",
      value: "Иванов",
      validationType: "name",
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

    const displayNameInput = new Input({
      name: "display_name",
      text: "Имя в чате",
      value: "Ивашка",
      validationType: "name",
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

    const phoneInput = new Input({
      name: "phone",
      text: "Телефон",
      value: "+7 (909) 967 30 30",
      type: "tel",
      required: true,
      validationType: "phone",
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

    const btn = new Button({ text: "Сохранить" });

    const context = {
      mailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      displayNameInput,
      phoneInput,
      button: btn
    };

    const form = new Form({
      name: "profileEditForm",
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
