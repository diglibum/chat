import { Props } from "../../../../types";
import { Templator } from "../../../../modules/templator";
import addUserTmpl from "./addUser.tmpl";
import { Button } from "../../../../components/button";
import { Form } from "../../../../components/form";

export function addUserForm (props: Props) {
  const { users } = props;
  const tmpl = new Templator(addUserTmpl);

  const button = new Button({
    text: "Добавить",
    className: "add-user-name__button"
  });

  const userList = users?.reduce((acc: [], user: any) => {
    return [...acc, `
        <a href="/add-user" class="add-user__user-item" id="${user.id}">${user.login} (${user.first_name} ${user.second_name})</a>
      `];
  }, []);
  const userListContainer = document.createElement("template");
  userListContainer.innerHTML = userList;

  const form = new Form({
    name: "addUserForm",
    body: tmpl.compile({
      content: userList,
      button: button
    })
  });

  return form;
}
