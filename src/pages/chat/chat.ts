import { Templator } from "../../modules/Templator";
import chatPageTmpl from "./chat.tmpl";
import "./chat.scss";
import { Block } from "../../modules/block";
import { Props } from "../../types/props";
import { SearchForm } from "./modules/searchForm";
import { ChatList } from "./modules/chatList";
import { Link } from "../../modules/Link";
import ChatController from "../../controllers/ChatController";
import { AddChat } from "./modules/addChat";
import Store from "../../modules/Store";
import { ChatBody } from "./modules/chatBody";
import { AddUser } from "./modules/addUser";
import { Popup } from "../../components/popup/Popup";
import { DeleteUser } from "./modules/deleteUser";
import chatMenuTmpl from "./chatMenu.tmpl";
import chatStubTmpl from "./chatStub.tmpl";
import { MessageForm } from "./modules/messageForm";

export class ChatPage extends Block {
  currentChat: any;
  newMessages: any;

  constructor (props: Props = {}) {
    super("div", props);
    Store.registerEvent(this.reRender, this);
    ChatController.getChats();
  }

  render () {
    this.currentChat = Store.getState("currentChat");
    const searchForm = new SearchForm({
      placeholder: "Поиск"
    });

    const settingsLink = new Link({
      to: "/settings",
      label: "Профиль",
      className: "aside__header-link"
    });

    const chatPopup = new AddChat();
    const userPopup = new AddUser({ inner: "search" });
    const deleteUserPopup = new DeleteUser();
    const chatList = new ChatList();
    const chatMenu = new Popup({
      body: chatMenuTmpl,
      className: "chat-menu__popup"
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
      messageForm
    };

    if (this.currentChat.id === null) {
      context.content = chatStubTmpl;
    } else {
      ChatController.getAllNewMessages(this.currentChat.id);
      context.content = new ChatBody();
    }

    if (this.currentChat?.avatar) {
      context.avatar = this.currentChat?.avatar;
    }

    const fragment = tmpl.compile(context);
    Popup.addPopupTriggers(fragment);
    this.addDeleteChatListener(fragment);
    return fragment;
  }

  addDeleteChatListener (fragment: DocumentFragment) {
    const button = fragment.querySelector(".chat-menu__list-item_delete-chat");
    button?.addEventListener("click", (e) => {
      e.preventDefault();
      const chatId = Store.getState("currentChat")?.id;
      if (chatId && ChatController.deleteChat(chatId)) {
        console.log("чат удалён");
      }
    });
  }
}
