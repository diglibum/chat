import { ChatApi } from "../api/chats/chatApi";
import { TokenApi } from "../api/chats/tokenApi";
import { AddUsersToChatRequest, BaseRequest, DeleteChatRequest, DeleteUsersFromChatRequest } from "../api/types";
import { UserSearch } from "../api/users/userSearch";
import { checkAllForm } from "../components/form/utils";
import Store from "../modules/store";
import { WebSocketService, WS_ACTIONS } from "../modules/webSocketService";
import { prepareDataToRequest } from "./utils/prepareDataToReques";

class ChatController {
  private tokenAPIinstance = new TokenApi();
  private chatAPIInstance = new ChatApi();
  private userSearchAPIInstance = new UserSearch();
  ws: WebSocketService | null = null;
  wsArray: any[] = [];

  public getToken (chatId: number) {
    return this.tokenAPIinstance.getToken(chatId)
      .then((data) => {
        return JSON.parse(data.response).token;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  createChat (form?: HTMLFormElement) {
    try {
      const validateData = checkAllForm(form!);
      if (!validateData) {
        throw new Error("ошибка валидации");
      }
      const data = prepareDataToRequest(new FormData(form)) as BaseRequest;
      this.chatAPIInstance.create(data)
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

  getChats () {
    try {
      this.chatAPIInstance.getChats()
        .then((data) => {
          const chats = JSON.parse(data.response);
          if (chats) {
            Store.setState({ chats });
          }
        })
        .then(() => {
          if (this.wsArray.length === 0) {
            this.openConnections(Store.getState("chats"));
          }
        })
        .then(() => {
          this.getAllNewMessages();
        })
        .catch((reason) => {
          console.log(reason);
        });
    } catch {
      console.log("ошибка получения чатов");
    }
  }

  private openConnections (chats: any[]) {
    chats.forEach(chat => {
      this.getToken(chat.id)
        .then(token => {
          this.wsArray.push({ id: chat.id, ws: this.openWs(token, chat.id, Store.getState("user")?.id), messages: null });
        });
    });
  }

  private openWs (token: string, chatId: number, userId: number) {
    return new WebSocketService({
      token,
      chatId: chatId,
      userId: userId
    });
  }

  getConnection (chatId: number) {
    return this.wsArray?.find(x => x.id === chatId)?.ws;
  }

  searchUsers (form: HTMLFormElement, userName: string) {
    const validateData = checkAllForm(form!);
    if (!validateData) {
      throw new Error("ошибка валидации");
    }
    return this.userSearchAPIInstance.findUser({ login: userName })
      .then((data) => {
        const users = JSON.parse(data.response);
        return users;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  addUsersToChat (obj: AddUsersToChatRequest) {
    try {
      this.chatAPIInstance.addUsersToChat(obj)
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

  getChatUsers (chatId: number) {
    return this.chatAPIInstance.getChatUsers(chatId)
      .then((data) => {
        const users = JSON.parse(data.response);
        return users;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  deleteUsersFromChat (obj: DeleteUsersFromChatRequest) {
    try {
      this.chatAPIInstance.deleteUsersFromChat(obj)
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

  setCurrentChat (chat: any) {
    const oldChat = Store.getState("currentChat");
    if (oldChat?.id !== chat.id) {
      Store.setState({ currentChat: chat });
    }
  }

  getChat () {
    const token = Store.getState("token");
    const currentChatId = Store.getState("currentChat.id");
    const user = Store.getState("user");

    if (token && currentChatId && user) {
      try {
        this.ws = new WebSocketService({
          token,
          chatId: currentChatId,
          userId: user.id
        });
      } catch {
        console.log("Ошибка подлючения к серверу чатов");
      }
    }
  }

  deleteChat (chatId: number) {
    try {
      const chat: DeleteChatRequest = {
        chatId
      };
      this.chatAPIInstance.deleteChat(chat)
        .then(() => {
          Store.setState({
            currentChat: {
              id: null,
              messages: null
            }
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

  getAllNewMessages (_chatId?: number, offset: number = 0) {
    this.wsArray.forEach(item => {
      item.ws.messages = item.ws.getNewMessages(offset);
    });
  }

  newMessage (form: HTMLFormElement, message: string, chatId: number) {
    try {
      const validateData = checkAllForm(form!);
      if (!validateData) {
        throw new Error("ошибка валидации");
      }
      if (chatId && message) {
        const wsItem = this.wsArray.find(item => item.id === chatId);
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
