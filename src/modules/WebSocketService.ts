import ChatController from "../controllers/ChatController";

export enum WS_ACTIONS {
  MESSAGES = "message",
  GET_OLD = "get old"
}

interface WsRequest {
  userId: number,
  chatId: number,
  token: string
}

const host = "wss://ya-praktikum.tech/ws/chats";

export class WebSocketService {
  socket: WebSocket;
  chatId: number;
  token: string;
  private pingId: any;

  constructor (data: WsRequest) {
    const { userId, chatId, token } = data;
    this.chatId = chatId;
    this.token = token;
    const path = `${host}/${userId}/${chatId}/${token}`;
    this.socket = new WebSocket(path);
    this.addListeners();
  }

  private pingPong () {
    this.pingId = setInterval(() => {
      this.socket.send(JSON.stringify({
        type: "ping"
      }));
    }, 10000);
  }

  send (action: WS_ACTIONS, payload: any) {
    const data = {
      content: payload,
      type: action
    };
    this.socket.send(JSON.stringify(data));
  }

  close () {
    this.socket.close();
  }

  getNewMessages () {
    // this.socket.send(JSON.stringify({
    //   content: "" + offset,
    //   type: WS_ACTIONS.GET_OLD
    // }));
    return null;
  }

  private addListeners () {
    this.socket.addEventListener("open", () => {
      console.log("Соединение установлено");
      this.pingPong();
    });

    this.socket.addEventListener("close", event => {
      clearInterval(this.pingId);
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener("message", event => {
      console.log("Получены данные", event.data);
      if (JSON.parse(event.data).type === WS_ACTIONS.MESSAGES) {
        ChatController.getChats();
      }
    });

    this.socket.addEventListener("error", event => {
      console.log("Ошибка", (<any>event).message);
    });
  }
}
