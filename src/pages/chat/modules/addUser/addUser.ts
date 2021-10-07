import { Block } from "../../../../modules/block";
import { Props } from "../../../../types";
import "./addUser.scss";
import { Popup } from "../../../../components/popup/popup";
import Store from "../../../../modules/store";
import ChatController from "../../../../controllers/chatController";
import { AddUsersToChatRequest } from "../../../../api/types";
import { searchUserForm } from "./searchUserForm";
import { addUserForm } from "./addUserForm";
export class AddUser extends Block {
  constructor (props: Props = {}) {
    super("div", props);
  }

  render () {
    const { inner, hidePopup } = this.props;

    let form;
    let popupTitle;

    switch (inner) {
      case "search":
        form = searchUserForm();
        popupTitle = "Найти пользователей";
        break;
      case "add":
        form = addUserForm(this.props);
        popupTitle = "Добавить пользователей";
        break;
    }

    const popup = new Popup({
      className: "add-user__popup",
      title: popupTitle,
      hidePopup,
      body: form
    });

    const fragment = this.addFormListeners(popup);

    return fragment;
  }

  addFormListeners (popup: Popup) {
    const fragment = popup.getContent() as DocumentFragment;
    const htmlForm = fragment.querySelector("form") as HTMLFormElement;
    const userNameInput = htmlForm?.querySelector("input[name='title']") as HTMLInputElement;
    const chatId = Store.getState("currentChat").id;
    const selectedUsers: Set<number> = new Set();

    htmlForm!.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.props.inner === "search") {
        const userName = userNameInput.value;
        if (chatId) {
          ChatController.searchUsers(htmlForm, userName)
            .then(users => {
              if (users && users.length > 0) {
                this.setProps({ users, inner: "add", hidePopup: false });
              }
            });
        }
      } else if (this.props.inner === "add" && selectedUsers.size > 0) {
        const newUser: AddUsersToChatRequest = {
          users: Array.from(selectedUsers),
          chatId
        };
        if (ChatController.addUsersToChat(newUser)) {
          htmlForm.querySelector("button")?.setAttribute("disabled", "disabled");
          setTimeout(() => {
            popup.close();
          }, 1500);
        }
      }
    });

    if (this.props.inner === "add") {
      const users = htmlForm?.querySelectorAll(".add-user__user-item");
      users.forEach(item => {
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
    }
    return popup.getContent();
  }
}
