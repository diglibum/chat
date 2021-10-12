import { HTTPTransport as HTTP } from "../HTTPtransport";
import { BaseAPI } from "../baseApi";
import {
  AddUsersToChatRequest,
  BaseRequest,
  DeleteChatRequest,
  DeleteUsersFromChatRequest,
} from "../types";

const APIinstance = new HTTP("https://ya-praktikum.tech/api/v2/chats");
export class ChatApi extends BaseAPI {
  public create(chatName: BaseRequest) {
    return APIinstance.post(APIinstance.url, {
      data: chatName,
    });
  }

  getChats() {
    return APIinstance.get(APIinstance.url);
  }

  addUsersToChat(data: AddUsersToChatRequest) {
    return APIinstance.put(APIinstance.url + "/users", {
      data,
    });
  }

  getChatUsers(chatId: number) {
    return APIinstance.get(APIinstance.url + "/" + chatId + "/users");
  }

  deleteUsersFromChat(data: DeleteUsersFromChatRequest) {
    return APIinstance.delete(APIinstance.url + "/users", {
      data,
    });
  }

  deleteChat(data: DeleteChatRequest) {
    return APIinstance.delete(APIinstance.url, {
      data,
    });
  }

  getNewMessagesCount(chatId: number) {
    return APIinstance.get(APIinstance.url + "/new/" + chatId);
  }
}
