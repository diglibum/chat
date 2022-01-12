import { Templator } from "../../modules/templator";
import chatPageTmpl from "./chat.tmpl";
import "./chat.scss";
import { Block } from "../../modules/block";
import { Props } from "../../types/props";
import { SearchForm } from "./modules/searchForm";
import { ChatList } from "./modules/chatList";
import { Link } from "../../modules/link";
import { chatController } from "../../controllers/chatController";
import { AddChat } from "./modules/addChat";
import Store from "../../modules/store";
import { ChatBody } from "./modules/chatBody";
import { AddUser } from "./modules/addUser";
import { Popup } from "../../components/popup/popup";
import { DeleteUser } from "./modules/deleteUser";
import chatMenuTmpl from "./chatMenu.tmpl";
import chatStubTmpl from "./chatStub.tmpl";
import { MessageForm } from "./modules/messageForm";
import { Chat, Message } from "../../types";

export class ChatPage extends Block {
  currentChat: Chat;
  newMessages: Message[];

  constructor(props: Props = {}) {
    super("div", props);
    Store.registerEvent(this.reRender, this);
    chatController.getChats();
  }

  render() {
    this.currentChat = Store.getState("currentChat");

    const searchForm = new SearchForm({
      placeholder: "Поиск",
    });

    const settingsLink = new Link({
      to: "/settings",
      label: "Профиль",
      className: "aside__header-link",
    });

    const chatPopup = new AddChat();
    const userPopup = new AddUser({ inner: "search" });
    const deleteUserPopup = new DeleteUser();
    const chatList = new ChatList();
    const chatMenu = new Popup({
      body: chatMenuTmpl,
      className: "chat-menu__popup",
    });
    const messageForm = new MessageForm();

    const tmpl = new Templator(chatPageTmpl);

    const context: Props = {
      list: chatList,
      search: searchForm,
      chatTitle: this.currentChat?.title ?? "",
      settingsLink,
      chatPopup,
      userPopup,
      deleteUserPopup,
      chatMenu,
      messageForm,
    };

    if (this.currentChat.id === null) {
      context.content = chatStubTmpl;
    } else {
      context.content = new ChatBody();
    }

    if (this.currentChat?.avatar) {
      context.avatar = this.currentChat?.avatar;
    }

    const fragment = tmpl.compile(context);
    Popup.addPopupTriggers(fragment);
    this.addDeleteChatListener(fragment);

    setTimeout(() => {
      this.pageScrolling();
    }, 0);

    return fragment;
  }

  addDeleteChatListener(fragment: DocumentFragment) {
    const button = fragment.querySelector(".chat-menu__list-item_delete-chat");
    button?.addEventListener("click", (e) => {
      e.preventDefault();
      const chatId = Store.getState("currentChat")?.id;
      if (chatId && chatController.deleteChat(chatId)) {
        console.log("чат удалён");
      }
    });
  }

  pageScrolling() {
    const lastMessage = Store.getState("lastMessage");
    const direction = lastMessage === "new" ? "top" : "bottom";
    const chatBody = document.querySelector(".chat-body");
    if (chatBody) {
      switch (direction) {
        case "top":
          chatBody.scrollTop = 0;
          break;
        case "bottom":
          chatBody.scrollTop = chatBody.scrollHeight - chatBody.clientHeight;
          break;
      }
    }
  }
}
