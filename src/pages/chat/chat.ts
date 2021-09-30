import { Templator } from "../../modules/Templator";
import chatPageTmpl from "./chat.tmpl";
import "./chat.scss";
import { Block } from "../../modules/block";
import { Props } from "../../types/props";
import { SearchForm } from "./components/searchForm";
import { ChatList } from "./components/chatList";
import { Link } from "../../modules/Link";
import { ChatController } from "../../controllers/ChatController";
import { Popup } from "../../components/popup/Popup";
import { AddChat } from "./components/addChat";
import Store from "../../modules/Store";
import { WebSocketService } from "../../modules/WebSocketService";

export class ChatPage extends Block {
  controller: ChatController;
  ws: WebSocketService;

  constructor (props: Props = {}) {
    super("div", props);
    Store.registerEvent(this.reRender, this);
  }

  componentDidMount () {
    this.controller = new ChatController();
    this.controller.getToken();
    this.controller.getChats();
  }

  render () {
    const token = Store.getState("token");
    const currentChat = Store.getState("currentChat");
    const user = Store.getState("user");
    // console.log(userId);

    if (token && currentChat && user) {
      try {
        this.ws = new WebSocketService({
          token,
          chatId: currentChat,
          userId: user.id
        });
      } catch {
        console.log("Ошибка подлючения к серверу чатов");
      }
    }

    const searchForm = new SearchForm({
      placeholder: "Поиск"
    });

    const settingsLink = new Link({
      to: "/settings",
      label: "Профиль",
      className: "aside__header-link"
    });

    const popup = new Popup({
      className: "add-chat__popup",
      title: "Добавить чат",
      body: new AddChat()
    });

    const chatList = new ChatList();
    const tmpl = new Templator(chatPageTmpl);

    const context = {
      list: chatList,
      search: searchForm,
      content: currentChat ?? "Выберите чат для начала общения",
      settingsLink,
      popup
    };

    const fragment = tmpl.compile(context);
    const addChatBtn = fragment.querySelector(".chat-page__link-button");
    const addChatFormPopup = fragment.querySelector(".form")! as HTMLFormElement;
    const addChatPopup = fragment.querySelector(".add-chat__popup");
    addChatPopup?.classList.add("hide");
    const addChatNameButton = fragment.querySelector(".add-chat-name__button");

    addChatBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      addChatPopup?.classList.remove("hide");
    });

    addChatNameButton?.addEventListener("click", (event) => {
      event.preventDefault();
      if (this.controller.createChat(addChatFormPopup)) {
        addChatPopup?.classList.add("hide");
      }
    });

    return fragment;
  }
}
