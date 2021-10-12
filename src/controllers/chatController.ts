import { ChatApi } from "../api/chats/chatApi";
import { TokenApi } from "../api/chats/tokenApi";
import {
  AddUsersToChatRequest,
  BaseRequest,
  DeleteChatRequest,
  DeleteUsersFromChatRequest,
} from "../api/types";
import { UserSearch } from "../api/users/userSearch";
import { checkAllForm } from "../components/form/utils";
import Store from "../modules/store";
import { WebSocketService, WS_ACTIONS } from "../modules/webSocketService";
import { Chat, Message } from "../types";
import { prepareDataToRequest } from "./utils/prepareDataToRequest";
class ChatController {
  private tokenAPIinstance = new TokenApi();
  private chatAPIInstance = new ChatApi();
  private userSearchAPIInstance = new UserSearch();
  ws: WebSocketService | null = null;
  wsArray: any[] = [];

  public getToken(chatId: number) {
    return this.tokenAPIinstance
      .getToken(chatId)
      .then((result) => {
        return (<any>result).token;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  createChat(form?: HTMLFormElement) {
    try {
      const validateData = checkAllForm(form!);
      if (!validateData) {
        throw new Error("ошибка валидации");
      }
      const data = prepareDataToRequest(new FormData(form)) as BaseRequest;
      this.chatAPIInstance
        .create(data)
        .then(() => {
          this.getChats();
        })
        .catch((reason) => {
          console.log(reason);
        });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  getChats() {
    try {
      this.chatAPIInstance
        .getChats()
        .then((chats) => {
          if (chats) {
            Store.setState({ chats });
          }
        })
        .then(() => {
          const chats: Chat[] = Store.getState("chats");
          this.openConnections(chats);
        })
        .catch((reason) => {
          console.log(reason);
        });
    } catch {
      console.log("ошибка получения чатов");
    }
  }

  private openConnections(chats: Chat[]) {
    chats.forEach((chat) => {
      const chatWs = this.findChatinArray(chat.id);
      if (!chatWs) {
        this.wsArray.push({ id: chat.id, ws: null });
        this.getToken(chat.id).then((token) => {
          const chatWs = this.findChatinArray(chat.id);
          chatWs.ws = this.openWs(token, chat.id, Store.getState("user")?.id);
        });
      }
    });
  }

  private findChatinArray(chatId: number) {
    return this.wsArray.find((item) => item.id === chatId);
  }

  private openWs(token: string, chatId: number, userId: number) {
    return new WebSocketService({
      token,
      chatId: chatId,
      userId: userId,
    });
  }

  getConnection(chatId: number) {
    return this.wsArray?.find((x) => x.id === chatId)?.ws;
  }

  searchUsers(form: HTMLFormElement, userName: string) {
    const validateData = checkAllForm(form!);
    if (!validateData) {
      throw new Error("ошибка валидации");
    }
    return this.userSearchAPIInstance
      .findUser({ login: userName })
      .catch((reason) => {
        console.log(reason);
      });
  }

  addUsersToChat(obj: AddUsersToChatRequest) {
    try {
      this.chatAPIInstance
        .addUsersToChat(obj)
        .then(() => {
          this.getChats();
        })
        .catch((reason) => {
          console.log(reason);
        });
    } catch {
      console.log("Пользователь не был добавлен");
      return false;
    }
    return true;
  }

  getChatUsers(chatId: number) {
    return this.chatAPIInstance.getChatUsers(chatId).catch((reason) => {
      console.log(reason);
    });
  }

  deleteUsersFromChat(obj: DeleteUsersFromChatRequest) {
    try {
      this.chatAPIInstance
        .deleteUsersFromChat(obj)
        .then(() => {
          this.getChats();
        })
        .catch((reason) => {
          console.log(reason);
        });
    } catch {
      console.log("Пользователь не был удалён");
      return false;
    }
    return true;
  }

  setCurrentChat(chat: Chat) {
    const oldChat = Store.getState("currentChat");
    if (oldChat?.id !== chat.id) {
      Store.setState({ currentChat: chat });
    }
    this.getNewMessages(chat.id);
  }

  getChat() {
    const token = Store.getState("token");
    const currentChatId = Store.getState("currentChat.id");
    const user = Store.getState("user");

    if (token && currentChatId && user) {
      try {
        this.ws = new WebSocketService({
          token,
          chatId: currentChatId,
          userId: user.id,
        });
      } catch {
        console.log("Ошибка подлючения к серверу чатов");
      }
    }
  }

  deleteChat(chatId: number) {
    try {
      const chat: DeleteChatRequest = {
        chatId,
      };
      this.chatAPIInstance
        .deleteChat(chat)
        .then(() => {
          Store.setState({
            currentChat: {
              id: null,
              messages: null,
            },
          });
          const messages = Store.getState("messages");
          messages[chatId] = [];
          Store.setState({
            messages,
          });

          this.getChats();
        })
        .catch((reason) => {
          console.log(reason);
        });
    } catch {
      console.log("Пользователь не был добавлен");
      return false;
    }
    return true;
  }

  getNewMsgCount(chatId: number) {
    return this.chatAPIInstance
      .getNewMessagesCount(chatId)
      .then((count) => {
        return (<any>count).unread_count;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  getNewMessages(chatId: number) {
    return this.getNewMsgCount(chatId).then((msgCount) => {
      let offset = 0;
      while (offset < msgCount) {
        this.getMessages(chatId, offset);
        offset += 20;
      }
    });
  }

  getMessages(chatId: number, offset: number) {
    const chat = this.findChatinArray(chatId);
    const ws = chat.ws;
    ws.getMessages(offset);
  }

  setMessage(chatId: number, messages: Message | Message[]) {
    const allMessages = Store.getState("messages");
    let chat = allMessages.find((chat: Chat) => chat.id === chatId);

    if (!chat) {
      const length: number = allMessages.push({
        id: chatId,
        messages: [],
      });
      chat = allMessages[length - 1];
    }
    let lastMessage = "old";
    if (Array.isArray(messages)) {
      messages.forEach((msg) => {
        chat.messages.unshift(msg);
        lastMessage = "new";
      });
    } else {
      chat.messages.push(messages);
    }
    Store.setState({
      messages: allMessages,
      lastMessage,
    });
  }

  newMessage(form: HTMLFormElement, message: string, chatId: number) {
    try {
      const validateData = checkAllForm(form!);
      if (!validateData) {
        throw new Error("ошибка валидации");
      }
      if (chatId && message) {
        const wsItem = this.wsArray.find((item) => item.id === chatId);
        wsItem.ws?.send(WS_ACTIONS.MESSAGES, message);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
}

export default new ChatController();
