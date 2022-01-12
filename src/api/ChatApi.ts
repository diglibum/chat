import { HTTP } from "./HTTP";
import {
  AddUsersToChatRequest,
  BaseRequest,
  DeleteChatRequest,
  DeleteUsersFromChatRequest,
} from "./types";

const API = new HTTP("/chats");

export class ChatApi {
  public create(chatName: BaseRequest) {
    return API.post(API.url, {
      data: chatName,
    });
  }

  public getChats() {
    return API.get(API.url);
  }

  public addUsersToChat(data: AddUsersToChatRequest) {
    return API.put(API.url + "/users", {
      data,
    });
  }

  public getChatUsers(chatId: number) {
    return API.get(API.url + "/" + chatId + "/users");
  }

  public deleteUsersFromChat(data: DeleteUsersFromChatRequest) {
    return API.delete(API.url + "/users", {
      data,
    });
  }

  public deleteChat(data: DeleteChatRequest) {
    return API.delete(API.url, {
      data,
    });
  }

  public getNewMessagesCount(chatId: number) {
    return API.get(API.url + "/new/" + chatId);
  }

  public getToken(chatId: number) {
    return API.post(API.url + `/token/${chatId}`);
  }
}
