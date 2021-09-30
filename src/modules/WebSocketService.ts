export enum WS_ACTIONS {
  SEND_TEXT = "SEND_TEXT",
  MESSAGES = "MESSAGES"
}

interface WsRequest {
  userId: number,
  chatId: number,
  token: string
}

const host = "wss://ya-praktikum.tech/ws/chats";

export class WebSocketService {
  private socket: WebSocket;
  private static __instance: WebSocketService;

  constructor (data: WsRequest) {
    if (WebSocketService.__instance) {
      return WebSocketService.__instance;
    }
    const { userId, chatId, token } = data;
    const path = `${host}/${userId}/${chatId}/${token}`;
    // const path = `${host}/${userId}/1/${token}`;
    console.log(path);
    this.socket = new WebSocket(path);
    this.addListeners();
    WebSocketService.__instance = this;
  }

  private addListeners () {
    this.socket.addEventListener("open", () => {
      console.log("Соединение установлено");
    });

    this.socket.addEventListener("close", event => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener("message", event => {
      console.log("Получены данные", event.data);
    });

    this.socket.addEventListener("error", event => {
      console.log("Ошибка", (<any>event).message);
    });
  }

  // send (action: WS_ACTIONS, payload: unknown) {

  // }
}

// const webSocketService = new WebSocketService('/ws');

// webSocketService.send('SEND_TEXT', { message: 'text' });
// webSocketService.subscribe('MESSAGES', function (payload) {
//   const state = payload.state;
//   chat.setProps(state);
// });
