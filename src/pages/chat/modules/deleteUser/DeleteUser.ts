import { Block } from "../../../../modules/Block";
import { Props } from "../../../../types";
import "./deleteUser.scss";
import { Popup } from "../../../../components/popup/Popup";
import { Templator } from "../../../../modules/Templator";
import deleteUserTmpl from "./deleteUser.tmpl";
import { Button } from "../../../../components/button";
import { Form } from "../../../../components/form";
import Store from "../../../../modules/Store";
import ChatController from "../../../../controllers/ChatController";
import { DeleteUsersFromChatRequest } from "../../../../api/types";

export class DeleteUser extends Block {
  constructor (props: Props = {}) {
    super("div", props);
  }

  render () {
    const tmpl = new Templator(deleteUserTmpl);
    const { users } = this.props;
    const chatId = Store.getState("currentChat")?.id;

    const button = new Button({
      text: "Удалить",
      className: "delete-user-name__button"
    });

    if (chatId && !users) {
      ChatController.getChatUsers(chatId)
        .then(data => {
          this.setProps({ users: data });
        });
    }
    const context: Props = {
      button: button
    };

    let content;

    if (users && users.length > 0) {
      content = this.getUsers(users);
    }

    context.content = content ?? "Пользователей не найдено";

    const form = new Form({
      name: "deleteUserForm",
      body: tmpl.compile(context)
    });

    const popup = new Popup({
      className: "delete-user__popup",
      title: "Удалить пользователей",
      body: form
    });

    const selectedUsers: Set<number> = new Set();
    const fragment = popup.getContent() as DocumentFragment;
    const htmlForm = fragment.querySelector("form");
    const items = htmlForm?.querySelectorAll(".add-user__user-item");
    items?.forEach(item => {
      const newUserId = <unknown>item.getAttribute("id") as number;
      item.addEventListener("click", (e) => {
        e.preventDefault();
        if (selectedUsers.has(newUserId)) {
          selectedUsers.delete(newUserId);
          item.classList.remove("add-user__user-item_selected");
        } else {
          selectedUsers.add(newUserId);
          item.classList.add("add-user__user-item_selected");
        }
      });
    });
    htmlForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (selectedUsers.size > 0) {
        const oldUsers: DeleteUsersFromChatRequest = {
          users: Array.from(selectedUsers),
          chatId
        };
        if (ChatController.deleteUsersFromChat(oldUsers)) {
          htmlForm.querySelector("button")?.setAttribute("disabled", "disabled");
          setTimeout(() => {
            popup.close();
            this.setProps({
              users: undefined
            });
          }, 1500);
        }
      }
    });

    return fragment;
  }

  getUsers (users: any[]) {
    const currentUserId = Store.getState("user")?.id;
    const filteredUsers = users.filter((user) => user.id !== currentUserId);
    const userList = filteredUsers?.reduce((acc: [], user: any) => {
      return [...acc, `<a href="/add-user" class="add-user__user-item" id="${user.id}">${user.login} (${user.first_name} ${user.second_name})</a>`];
    }, []);
    const userListContainer = document.createElement("template");
    userListContainer.innerHTML = userList;

    return userListContainer.content;
  }
}
