import { Button } from "../../../../components/button";
import { Form } from "../../../../components/form";
import { Input } from "../../../../components/input";
import { InputType, InputValidationType } from "../../../../components/input/types";
import { Block } from "../../../../modules/Block";
import { Templator } from "../../../../modules/Templator";
import { Props } from "../../../../types";
import addUserTmpl from "./addUser.tmpl";
import "./addUser.scss";
import { formValidation } from "../../../../components/form/utils";
import { Popup } from "../../../../components/popup/Popup";
import Store from "../../../../modules/Store";
import ChatController from "../../../../controllers/ChatController";
import { AddUsersToChatRequest } from "../../../../api/types";

export class AddUser extends Block {
  constructor (props: Props = {}) {
    super("div", props);
  }

  render () {
    const { inner, users, hidePopup } = this.props;
    const tmpl = new Templator(addUserTmpl);
    const searchInput = new Input({
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

    const addButton = new Button({
      text: "Добавить",
      className: "add-user-name__button"
    });

    const searchButton = new Button({
      text: "Найти",
      className: "search-user-name__button"
    });

    const userList = users?.reduce((acc: [], user: any) => {
      return [...acc, `
          <a href="/add-user" class="add-user_user-item" id="${user.id}">${user.login} (${user.first_name} ${user.second_name})</ф>
        `];
    }, []);
    const userListContainer = document.createElement("template");
    userListContainer.innerHTML = userList;
    let form;

    switch (inner) {
      case "add":
        form = new Form({
          name: "addUserForm",
          body: tmpl.compile({
            content: userList,
            button: addButton
          })
        });
        break;

      case "search":
        form = new Form({
          name: "searchUserForm",
          body: tmpl.compile({
            content: searchInput,
            button: searchButton
          })
        });
        break;
    }

    const popup = new Popup({
      className: "add-user__popup",
      title: "Найдены пользователи",
      hidePopup,
      body: form
    });

    const fragment = popup.getContent() as DocumentFragment;
    const htmlForm = fragment.querySelector("form") as HTMLFormElement;
    const userNameInput = htmlForm?.querySelector("input[name='title']") as HTMLInputElement;
    const chatId = Store.getState("currentChat").id;
    const selectedUsers: Set<number> = new Set();
    htmlForm!.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.props.inner && this.props.inner === "search") {
        const userName = userNameInput.value;
        if (chatId) {
          ChatController.searchUsers(htmlForm, userName)
            .then(users => {
              if (users && users.length > 0) {
                this.setProps({ users, inner: "add", hidePopup: false });
              }
            });
        }
      } else if (this.props.inner && this.props.inner === "add" && selectedUsers.size > 0) {
        const newUser: AddUsersToChatRequest = {
          users: Array.from(selectedUsers),
          chatId
        };
        if (ChatController.addUsersToChat(newUser)) {
          htmlForm.querySelector("button")?.setAttribute("disabled", "disabled");
          setTimeout(() => {
            popup.close();
            this.setProps({
              inner: "search",
              users: undefined,
              hidePopup: true
            });
          }, 3000);
        }
      }
    });

    if (this.props.inner === "add") {
      const users = htmlForm?.querySelectorAll(".add-user_user-item");
      users.forEach(item => {
        const newUserId = <unknown>item.getAttribute("id") as number;
        item.addEventListener("click", (e) => {
          e.preventDefault();
          if (selectedUsers.has(newUserId)) {
            selectedUsers.delete(newUserId);
            item.classList.remove("selected");
          } else {
            selectedUsers.add(newUserId);
            item.classList.add("selected");
          }
        });
      });
    }
    return fragment;
  }
}
