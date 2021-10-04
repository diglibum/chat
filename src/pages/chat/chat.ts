import { Templator } from "../../modules/Templator";
import chatPageTmpl from "./chat.tmpl";
import "./chat.scss";
import { Block } from "../../modules/block";
import { Props } from "../../types/props";
import { SearchForm } from "./components/searchForm";
import { ChatList } from "./components/chatList";
import { Link } from "../../modules/Link";
import ChatController from "../../controllers/ChatController";
import { AddChat } from "./components/addChat";
import Store from "../../modules/Store";
import { WebSocketService, WS_ACTIONS } from "../../modules/WebSocketService";
import { ChatBody } from "./components/chatBody";
import { AddUser } from "./components/addUser";

export class ChatPage extends Block {
  currentChat: any;

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
    const chatList = new ChatList();
    const tmpl = new Templator(chatPageTmpl);

    const context: Props = {
      list: chatList,
      search: searchForm,
      chatTitle: this.currentChat?.title ?? "",
      content: new ChatBody(),
      settingsLink,
      chatPopup: chatPopup,
      userPopup: userPopup
    };

    if (this.currentChat?.avatar) {
      context.avatar = this.currentChat?.avatar;
    }

    const fragment = tmpl.compile(context);
    this.addMessageListener(fragment);
    this.addPopupTriggers(fragment);
    return fragment;
  }

  private addMessageListener (fragment: DocumentFragment) {
    const sendMsgButton = fragment.querySelector(".chat-footer__send");
    const message = (fragment.querySelector(".chat-footer__input") as HTMLInputElement);
    sendMsgButton?.addEventListener("click", () => {
      const chatId = this.currentChat?.id;
      let ws: WebSocketService | null = null;
      if (chatId && message?.value) {
        ws = ChatController.getConnection(chatId);
        ws?.send(WS_ACTIONS.MESSAGES, message?.value);
        message.value = "";
      }
    });
  }

  private addPopupTriggers (fragment: DocumentFragment) {
    const triggers = fragment.firstElementChild?.querySelectorAll("[data-popup]");
    triggers?.forEach(trigger => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const popupClassname = trigger.getAttribute("data-popup");
        const popup = document.querySelector(`.${popupClassname}`);
        popup?.classList.remove("hide");
      });
    });
  }
}
