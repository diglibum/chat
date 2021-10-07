import { Templator } from "../../../../modules/templator";
import addUserTmpl from "./addUser.tmpl";
import { Input } from "../../../../components/input";
import { InputType, InputValidationType } from "../../../../components/input/types";
import { formValidation } from "../../../../components/form/utils";
import { Button } from "../../../../components/button";
import { Form } from "../../../../components/form";

export function searchUserForm () {
  const tmpl = new Templator(addUserTmpl);

  const input = new Input({
    name: "title",
    text: "Имя пользователя",
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
    text: "Найти",
    className: "search-user-name__button"
  });

  const form = new Form({
    name: "searchUserForm",
    body: tmpl.compile({
      content: input,
      button: button
    })
  });

  return form;
}
