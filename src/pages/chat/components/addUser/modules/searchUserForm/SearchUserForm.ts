import { Button } from "../../../../../../components/button";
import { Form } from "../../../../../../components/form";
import { formValidation } from "../../../../../../components/form/utils";
import { Input } from "../../../../../../components/input";
import { InputType, InputValidationType } from "../../../../../../components/input/types";
import { Popup } from "../../../../../../components/popup/Popup";
import { Templator } from "../../../../../../modules/Templator";
import { Props } from "../../../../../../types";
import addUserTmpl from "../../addUser.tmpl";

export function searchUserForm (props: Props) {
  const { inner, users, hidePopup } = this.props;
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

  const popup = new Popup({
    className: "add-user__popup",
    title: "Найдены пользователи",
    hidePopup,
    body: form
  });

  const fragment = popup.getContent() as DocumentFragment;

  return fragment;
}
